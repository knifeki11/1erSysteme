"use client"

import { useEffect } from "react"

/**
 * Prevents wheel/scroll from propagating when the user is in the hero zone
 * (first viewport) and the event target is inside the hero element.
 * Use this on pages that have a full-height hero with HeroBackground so
 * the 3D canvas doesn't capture scroll and block page scroll.
 */
export function useHeroScrollLock(heroId: string) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const hero = document.getElementById(heroId)
      if (!hero) return
      const inHeroZone = window.scrollY < window.innerHeight - 10
      if (!inHeroZone) return
      const target = e.target as Node
      if (!hero.contains(target)) return
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    document.addEventListener("wheel", handleWheel, { passive: true, capture: true })
    return () => document.removeEventListener("wheel", handleWheel, { capture: true })
  }, [heroId])
}

export const PAGE_HERO_ID = "page-hero"
