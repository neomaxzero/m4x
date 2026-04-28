import { useEffect, useEffectEvent, useRef, useState } from 'react'

interface ChapterProgressState {
  activeChapter: number
  chapterProgress: number[]
  overallProgress: number
}

const emptyState = (count: number): ChapterProgressState => ({
  activeChapter: 0,
  chapterProgress: Array.from({ length: count }, () => 0),
  overallProgress: 0,
})

export function useChapterProgress(count: number) {
  const elementsRef = useRef<Array<HTMLElement | null>>(Array.from({ length: count }, () => null))
  const frameRef = useRef<number | null>(null)
  const stateKeyRef = useRef('')
  const [state, setState] = useState<ChapterProgressState>(() => emptyState(count))

  const measure = useEffectEvent(() => {
    if (typeof window === 'undefined') {
      return
    }

    const viewportHeight = window.innerHeight
    const chapterProgress = Array.from({ length: count }, () => 0)
    let activeChapter = 0
    let activeLocked = false
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    elementsRef.current.forEach((element, index) => {
      if (!element) {
        return
      }

      const rect = element.getBoundingClientRect()
      const track = Math.max(rect.height - viewportHeight, 1)
      const progress = clamp(-rect.top / track, 0, 1)
      chapterProgress[index] = round(progress)

      const centerDistance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2)

      if (centerDistance < nearestDistance) {
        nearestDistance = centerDistance
        nearestIndex = index
      }

      if (!activeLocked && rect.top <= viewportHeight * 0.12 && rect.bottom >= viewportHeight * 0.62) {
        activeChapter = index
        activeLocked = true
      }
    })

    if (!activeLocked) {
      activeChapter = nearestIndex
    }

    const denominator = Math.max(count - 1, 1)
    const overallProgress = round((activeChapter + chapterProgress[activeChapter]!) / denominator)
    const nextState = {
      activeChapter,
      chapterProgress,
      overallProgress,
    }
    const key = `${activeChapter}:${overallProgress}:${chapterProgress.join('|')}`

    if (key !== stateKeyRef.current) {
      stateKeyRef.current = key
      setState(nextState)
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const scheduleMeasure = () => {
      if (frameRef.current != null) {
        return
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null
        measure()
      })
    }

    scheduleMeasure()
    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('resize', scheduleMeasure)

    return () => {
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current)
      }

      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
    }
  }, [measure])

  const registerChapter = (index: number) => (element: HTMLElement | null) => {
    elementsRef.current[index] = element

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        measure()
      })
    }
  }

  return {
    ...state,
    registerChapter,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function round(value: number) {
  return Math.round(value * 1000) / 1000
}
