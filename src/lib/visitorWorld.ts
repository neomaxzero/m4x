export type DayAnswer = 'yes' | 'no'
export type EnergyAnswer = 'low' | 'steady' | 'high'
export type IntentionAnswer = 'focus' | 'comfort' | 'play'
export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night'
export type WeatherKind = 'clear' | 'clouds' | 'rain' | 'storm' | 'snow' | 'mist' | 'unknown'
export type InteractionTempo = 'gentle' | 'curious' | 'swift'
export type TemperatureBand = 'cold' | 'mild' | 'warm'
export type BackgroundPhase = 'atmosphere' | 'depth' | 'presence' | 'personal'

export interface RitualAnswers {
  day: DayAnswer
  energy: EnergyAnswer
  intention: IntentionAnswer
}

export interface AmbientContext {
  timeOfDay: TimeOfDay
  language: string
  timezone: string
  locationLabel: string
  weather: WeatherKind
  weatherLabel: string
  temperatureBand: TemperatureBand
  reducedMotion: boolean
  interactionTempo: InteractionTempo
}

export interface VisitorWorldSeed {
  answers: RitualAnswers
  ambient: AmbientContext
}

interface Palette {
  skyTop: string
  skyBottom: string
  fog: string
  ground: string
  groundDark: string
  accent: string
  accentSoft: string
  spriteSkin: string
  spriteCoat: string
  spriteTrim: string
}

export interface VisitorWorld {
  answers: RitualAnswers
  ambient: AmbientContext
  palette: Palette
  archetype: string
  mood: string
  worldTitle: string
  narrative: string
  cues: string[]
  seedValue: number
  shareToken: string
}

export interface BackgroundPresentation {
  phase: BackgroundPhase
  chapter: number
  progress: number
  intensity: number
  depth: number
  avatarVisibility: number
  personalVisibility: number
}

export const ritualSteps = [
  {
    key: 'day',
    title: 'Today, is it a nice day for you?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    key: 'energy',
    title: 'How is your energy moving?',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'steady', label: 'Steady' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    key: 'intention',
    title: 'What do you need more of right now?',
    options: [
      { value: 'focus', label: 'Focus' },
      { value: 'comfort', label: 'Comfort' },
      { value: 'play', label: 'Play' },
    ],
  },
] as const

export const defaultAmbientContext: AmbientContext = {
  timeOfDay: 'dawn',
  language: 'en',
  timezone: 'UTC',
  locationLabel: 'somewhere nearby',
  weather: 'unknown',
  weatherLabel: 'unknown weather',
  temperatureBand: 'mild',
  reducedMotion: false,
  interactionTempo: 'gentle',
}

export function isCompleteAnswers(answers: Partial<RitualAnswers>): answers is RitualAnswers {
  return Boolean(answers.day && answers.energy && answers.intention)
}

export function fillPreviewAnswers(answers: Partial<RitualAnswers>): RitualAnswers {
  return {
    day: answers.day ?? 'yes',
    energy: answers.energy ?? 'steady',
    intention: answers.intention ?? 'focus',
  }
}

export function deriveInteractionTempo(answerMoments: number[]) {
  if (answerMoments.length < 2) {
    return 'gentle' as const
  }

  const deltas = answerMoments.slice(1).map((moment, index) => moment - answerMoments[index]!)
  const average = deltas.reduce((total, delta) => total + delta, 0) / deltas.length

  if (average < 1300) {
    return 'swift' as const
  }

  if (average < 3000) {
    return 'curious' as const
  }

  return 'gentle' as const
}

export function deriveVisitorWorld(seed: VisitorWorldSeed): VisitorWorld {
  const seedKey = [
    seed.answers.day,
    seed.answers.energy,
    seed.answers.intention,
    seed.ambient.timeOfDay,
    seed.ambient.weather,
    seed.ambient.temperatureBand,
    seed.ambient.language,
    seed.ambient.locationLabel,
    seed.ambient.interactionTempo,
  ].join('|')

  const seedValue = hashString(seedKey)
  const palette = derivePalette(seed)
  const archetype = deriveArchetype(seed.answers)
  const mood = deriveMood(seed)
  const worldTitle = deriveWorldTitle(seed)
  const narrative = deriveNarrative(seed, archetype)
  const cues = deriveCues(seed)
  const shareToken = encodeWorldToken(seed)

  return {
    answers: seed.answers,
    ambient: seed.ambient,
    palette,
    archetype,
    mood,
    worldTitle,
    narrative,
    cues,
    seedValue,
    shareToken,
  }
}

export function encodeWorldToken(seed: VisitorWorldSeed) {
  const payload = JSON.stringify(seed)
  const encoded = encodeBase64(payload)
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function decodeWorldToken(token: string) {
  try {
    const normalized = token.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
    const decoded = decodeBase64(padded)
    const parsed = JSON.parse(decoded) as VisitorWorldSeed

    if (!isCompleteAnswers(parsed.answers)) {
      return null
    }

    return {
      answers: parsed.answers,
      ambient: {
        ...defaultAmbientContext,
        ...parsed.ambient,
      },
    } satisfies VisitorWorldSeed
  } catch {
    return null
  }
}

export function weatherCodeToKind(code?: number): WeatherKind {
  if (code == null) {
    return 'unknown'
  }

  if (code === 0 || code === 1) {
    return 'clear'
  }

  if (code === 2 || code === 3) {
    return 'clouds'
  }

  if ([45, 48].includes(code)) {
    return 'mist'
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return 'snow'
  }

  if ([95, 96, 99].includes(code)) {
    return 'storm'
  }

  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    return 'rain'
  }

  return 'clouds'
}

export function weatherLabel(kind: WeatherKind) {
  switch (kind) {
    case 'clear':
      return 'clear sky'
    case 'clouds':
      return 'soft cloud cover'
    case 'rain':
      return 'light rain nearby'
    case 'storm':
      return 'charged weather'
    case 'snow':
      return 'snow in the air'
    case 'mist':
      return 'mist and low contrast'
    default:
      return 'an unreadable sky'
  }
}

export function temperatureBandFromCelsius(value?: number): TemperatureBand {
  if (value == null) {
    return 'mild'
  }

  if (value < 8) {
    return 'cold'
  }

  if (value > 22) {
    return 'warm'
  }

  return 'mild'
}

export function inferTimeOfDay(date = new Date()): TimeOfDay {
  const hour = date.getHours()

  if (hour >= 5 && hour < 9) {
    return 'dawn'
  }

  if (hour >= 9 && hour < 17) {
    return 'day'
  }

  if (hour >= 17 && hour < 21) {
    return 'dusk'
  }

  return 'night'
}

function derivePalette(seed: VisitorWorldSeed): Palette {
  const tone = seed.answers.day === 'yes'
    ? {
        skyTop: '#0f4767',
        skyBottom: '#f3c16d',
        fog: '#f0b87e',
        ground: '#557a48',
        groundDark: '#283f2f',
        accent: '#f6d173',
        accentSoft: '#f29d52',
      }
    : {
        skyTop: '#0f1d3d',
        skyBottom: '#785b95',
        fog: '#8a7cb4',
        ground: '#436055',
        groundDark: '#1b2630',
        accent: '#8ed7ff',
        accentSoft: '#d48cff',
      }

  const intentionShift = seed.answers.intention === 'play'
    ? { accent: '#ffb36b', accentSoft: '#ffd86f', spriteTrim: '#fdf4cf' }
    : seed.answers.intention === 'comfort'
      ? { accent: '#a9f2d4', accentSoft: '#67c7b0', spriteTrim: '#e7ffef' }
      : { accent: '#85d7ff', accentSoft: '#6ab3ff', spriteTrim: '#f0fcff' }

  const weatherShift = seed.ambient.weather === 'rain' || seed.ambient.weather === 'storm'
    ? { skyTop: '#0b1532', skyBottom: '#4f5d8a', fog: '#5d6e97' }
    : seed.ambient.weather === 'snow'
      ? { skyTop: '#6c8bb0', skyBottom: '#dce6f4', fog: '#d9ecf7' }
      : seed.ambient.weather === 'mist'
        ? { skyTop: '#5b6d82', skyBottom: '#b1b8c9', fog: '#b0c4d6' }
        : null

  const timeShift = seed.ambient.timeOfDay === 'night'
    ? { skyTop: '#091224', skyBottom: '#302f5f', fog: '#544d8e' }
    : seed.ambient.timeOfDay === 'dawn'
      ? { skyTop: '#35547f', skyBottom: '#f3a86f', fog: '#f7c690' }
      : seed.ambient.timeOfDay === 'dusk'
        ? { skyTop: '#162b47', skyBottom: '#cb7d65', fog: '#d18f76' }
        : null

  const temperatureShift = seed.ambient.temperatureBand === 'cold'
    ? { ground: '#4d6667', groundDark: '#213437' }
    : seed.ambient.temperatureBand === 'warm'
      ? { ground: '#62794a', groundDark: '#33411f' }
      : null

  const spriteSkin = seed.answers.day === 'yes' ? '#f7c69b' : '#d1a17d'
  const spriteCoat = seed.answers.energy === 'high' ? '#d75b4d' : seed.answers.energy === 'steady' ? '#4f6ed6' : '#58796a'

  return {
    ...tone,
    ...weatherShift,
    ...timeShift,
    ...temperatureShift,
    accent: intentionShift.accent,
    accentSoft: intentionShift.accentSoft,
    spriteTrim: intentionShift.spriteTrim,
    spriteSkin,
    spriteCoat,
  }
}

function deriveArchetype(answers: RitualAnswers) {
  if (answers.day === 'yes' && answers.intention === 'play') {
    return 'Lantern Hopper'
  }

  if (answers.day === 'yes' && answers.intention === 'comfort') {
    return 'Garden Keeper'
  }

  if (answers.day === 'yes') {
    return 'Trail Cartographer'
  }

  if (answers.intention === 'comfort') {
    return 'Moss Listener'
  }

  if (answers.intention === 'play') {
    return 'Midnight Sprite'
  }

  return 'Rain Archivist'
}

function deriveWorldTitle(seed: VisitorWorldSeed) {
  const weatherWord = seed.ambient.weather === 'clear'
    ? 'Sun'
    : seed.ambient.weather === 'clouds'
      ? 'Cloud'
      : seed.ambient.weather === 'rain'
        ? 'Rain'
        : seed.ambient.weather === 'storm'
          ? 'Thunder'
          : seed.ambient.weather === 'snow'
            ? 'Snow'
            : 'Mist'

  const intentionWord = seed.answers.intention === 'focus'
    ? 'Workshop'
    : seed.answers.intention === 'comfort'
      ? 'Garden'
      : 'Playfield'

  return `${weatherWord} ${intentionWord}`
}

function deriveMood(seed: VisitorWorldSeed) {
  const energyTone = seed.answers.energy === 'high'
    ? 'charged'
    : seed.answers.energy === 'steady'
      ? 'steady'
      : 'soft'

  return `${energyTone} ${seed.answers.intention}`
}

function deriveNarrative(seed: VisitorWorldSeed, archetype: string) {
  const dayLine = seed.answers.day === 'yes'
    ? 'You answered with light first, so the world opened instead of retreating.'
    : 'You answered with honesty first, so the world made room instead of pretending.'

  const weatherLine = seed.ambient.weather === 'clear'
    ? `The air near ${seed.ambient.locationLabel} is clear, so the horizon stays open.`
    : `The air near ${seed.ambient.locationLabel} carries ${seed.ambient.weatherLabel}, so the edges soften.`

  const motionLine = seed.ambient.interactionTempo === 'swift'
    ? 'Your clicks moved quickly, so the character keeps a brighter pulse.'
    : seed.ambient.interactionTempo === 'curious'
      ? 'Your pace felt exploratory, so the scene keeps more side paths alive.'
      : 'Your pace felt gentle, so the scene settles into a quieter rhythm.'

  return `${archetype} lives here now. ${dayLine} ${weatherLine} ${motionLine}`
}

function deriveCues(seed: VisitorWorldSeed) {
  return [
    seed.ambient.weatherLabel,
    `${seed.ambient.timeOfDay} light`,
    `${seed.ambient.language.toUpperCase()} browser voice`,
    `${seed.ambient.interactionTempo} interaction tempo`,
  ]
}

function hashString(value: string) {
  let hash = 2166136261

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return Math.abs(hash >>> 0)
}

function encodeBase64(value: string) {
  if (typeof window !== 'undefined' && 'btoa' in window) {
    const bytes = new TextEncoder().encode(value)
    let binary = ''

    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte)
    })

    return window.btoa(binary)
  }

  return Buffer.from(value, 'utf8').toString('base64')
}

function decodeBase64(value: string) {
  if (typeof window !== 'undefined' && 'atob' in window) {
    const binary = window.atob(value)
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  }

  return Buffer.from(value, 'base64').toString('utf8')
}
