import { useEffect, useState } from 'react'
import {
  defaultAmbientContext,
  inferTimeOfDay,
  temperatureBandFromCelsius,
  weatherCodeToKind,
  weatherLabel,
  type AmbientContext,
} from '../lib/visitorWorld'

interface IpWhoResult {
  city?: string
  country?: string
  latitude?: number
  longitude?: number
  timezone?: {
    id?: string
  }
}

interface OpenMeteoResult {
  current?: {
    weather_code?: number
    temperature_2m?: number
  }
}

export function useAmbientContext() {
  const [ambient, setAmbient] = useState<AmbientContext>(defaultAmbientContext)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || defaultAmbientContext.timezone
    const language = navigator.language?.split('-')[0] || defaultAmbientContext.language
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateStaticAmbient = () => {
      setAmbient((current) => ({
        ...current,
        timezone,
        language,
        reducedMotion: query.matches,
        timeOfDay: inferTimeOfDay(new Date()),
      }))
    }

    updateStaticAmbient()
    if ('addEventListener' in query) {
      query.addEventListener('change', updateStaticAmbient)
    } else {
      query.addListener(updateStaticAmbient)
    }

    return () => {
      if ('removeEventListener' in query) {
        query.removeEventListener('change', updateStaticAmbient)
      } else {
        query.removeListener(updateStaticAmbient)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const controller = new AbortController()

    const loadWeather = async () => {
      try {
        const ipResponse = await fetch('https://ipwho.is/', { signal: controller.signal })

        if (!ipResponse.ok) {
          return
        }

        const ipPayload = (await ipResponse.json()) as IpWhoResult
        const locationLabel = [ipPayload.city, ipPayload.country].filter(Boolean).join(', ') || 'somewhere nearby'
        const timezone = ipPayload.timezone?.id

        setAmbient((current) => ({
          ...current,
          locationLabel,
          timezone: timezone || current.timezone,
        }))

        if (ipPayload.latitude == null || ipPayload.longitude == null) {
          return
        }

        const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast')
        weatherUrl.searchParams.set('latitude', String(ipPayload.latitude))
        weatherUrl.searchParams.set('longitude', String(ipPayload.longitude))
        weatherUrl.searchParams.set('current', 'temperature_2m,weather_code')
        weatherUrl.searchParams.set('timezone', timezone || 'auto')

        const weatherResponse = await fetch(weatherUrl, { signal: controller.signal })

        if (!weatherResponse.ok) {
          return
        }

        const weatherPayload = (await weatherResponse.json()) as OpenMeteoResult
        const weatherKind = weatherCodeToKind(weatherPayload.current?.weather_code)

        setAmbient((current) => ({
          ...current,
          weather: weatherKind,
          weatherLabel: weatherLabel(weatherKind),
          temperatureBand: temperatureBandFromCelsius(weatherPayload.current?.temperature_2m),
        }))
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setAmbient((current) => current)
        }
      }
    }

    loadWeather()

    return () => {
      controller.abort()
    }
  }, [])

  return ambient
}
