/**
 * Static data for the 8 solutions used in the 3D ring.
 * Descriptions and tags are merged from i18n (t.solutionsPage.items) on the page.
 *
 * To add/remove solutions: update this array and ensure t.solutionsPage.items
 * in en/fr/ar has matching entries by name. Ring radius and card count will
 * adapt if you change the length (see SolutionsRing3D.tsx).
 */
export const SOLUTIONS_RING_ORDER = [
  "RezerTo",
  "SmartClub",
  "TagFlow",
  "CantiPOS",
  "Distrex",
  "Filatt",
  "OneTouch",
  "QuickPass",
] as const

export const SOLUTION_LOGOS: Record<string, string> = {
  CantiPOS: "/images/CantiPos.png",
  Distrex: "/images/Distrex.png",
  Filatt: "/images/Filatt.png",
  OneTouch: "/images/OneTouch.png",
  QuickPass: "/images/QuickPass.png",
  RezerTo: "/images/RezerTo.png",
  SmartClub: "/images/SmartClub.png",
  TagFlow: "/images/TagFlow.png",
}

/** Hero background image for each solution page (public/images). Use exact filename if casing differs (e.g. Quickpass_BG.png). */
export const SOLUTION_HERO_BGS: Record<string, string> = {
  CantiPOS: "/images/CantiPOS_BG.png",
  Distrex: "/images/Distrex_BG.png",
  Filatt: "/images/Filatt_BG.png",
  OneTouch: "/images/OneTouch_BG.png",
  QuickPass: "/images/QuickPass_BG.png",
  RezerTo: "/images/RezerTo_BG.png",
  SmartClub: "/images/SmartClub_BG.png",
  TagFlow: "/images/TagFlow_BG.png",
}

export type SolutionRingItem = {
  id: string
  name: string
  /** Full description for the detail card (no truncation). */
  description: string
  shortDescription: string
  logoSrc: string
  tags: string[]
}
