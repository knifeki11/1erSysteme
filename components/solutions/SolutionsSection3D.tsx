"use client"

import React, { useState, useEffect, useCallback, useMemo, useRef, Component } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { SOLUTIONS_RING_ORDER, SOLUTION_LOGOS } from "./solutions-ring-data"
import type { SolutionRingItem } from "./solutions-ring-data"

type ErrorBoundaryState = { hasError: boolean }
type ErrorBoundaryProps = {
  children: React.ReactNode
  fallbackBg: string
  remountKey: number
  onRetry: () => void
}

class SolutionsRingErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error("[Solutions Ring] Error:", error)
  }

  retry = () => {
    this.setState({ hasError: false })
    this.props.onRetry()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-screen w-full flex-col items-center justify-center gap-4"
          style={{ background: this.props.fallbackBg }}
        >
          <p className="text-center text-sm text-white/80">
            Something went wrong loading the 3D view.
          </p>
          <button
            type="button"
            onClick={this.retry}
            className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white hover:bg-white/30"
          >
            Retry
          </button>
        </div>
      )
    }
    const child = React.Children.only(this.props.children)
    return React.isValidElement(child)
      ? React.cloneElement(child, { key: this.props.remountKey } as { key: number })
      : child
  }
}

function RingLoadingFallback() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      style={{
        background: isDark
          ? "radial-gradient(ellipse 80% 80% at 50% 50%, #1e1e2e, #16162a)"
          : "radial-gradient(ellipse 80% 80% at 50% 50%, #f0f0f8, #e8e8f2)",
      }}
    >
      <span
        className="animate-pulse text-sm"
        style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}
      >
        Loading…
      </span>
    </div>
  )
}

const SolutionsRing3D = dynamic(
  () => import("./SolutionsRing3D").then((m) => m.SolutionsRing3D),
  { ssr: false, loading: () => <RingLoadingFallback /> }
)

type SolutionsPageContent = {
  label: string
  title: string
  overviewLabel?: string
  exploreCta: string
  viewAll: string
  items: Array<{ name: string; description: string; tags: string[] }>
}

type SolutionsSection3DProps = {
  /** Smaller height for embedding on home page */
  compact?: boolean
  /** When true, render only the 3D block (no section wrapper) for embedding inside another section */
  embeddable?: boolean
}

export function SolutionsSection3D({ compact, embeddable }: SolutionsSection3DProps = {}) {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeIndex, setActiveIndex] = useState(0)
  const [userHasClicked, setUserHasClicked] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [remountKey, setRemountKey] = useState(0)
  const [contextLost, setContextLost] = useState(false)
  const contextLostTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const content = t.solutionsPage as unknown as SolutionsPageContent
  const itemsFromT = content?.items ?? []

  const ringItems: SolutionRingItem[] = useMemo(() => {
    return SOLUTIONS_RING_ORDER.map((name) => {
      const fromT = itemsFromT.find((i: { name: string }) => i.name === name)
      const desc = fromT?.description ?? ""
      return {
        id: name,
        name,
        description: desc,
        shortDescription: desc.length > 140 ? desc.slice(0, 140) + "…" : desc,
        logoSrc: SOLUTION_LOGOS[name] ?? "/images/final_logo/Logo%20(2).svg",
        tags: fromT?.tags ?? [],
      }
    })
  }, [itemsFromT])

  const activeItem = ringItems[activeIndex]

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    return () => {
      if (contextLostTimerRef.current) {
        clearTimeout(contextLostTimerRef.current)
        contextLostTimerRef.current = null
      }
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % ringItems.length)
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + ringItems.length) % ringItems.length)
      }
    },
    [ringItems.length]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // When user hasn't clicked, advance to next solution every 5s so card and ring stay in sync
  useEffect(() => {
    if (userHasClicked || ringItems.length <= 1) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ringItems.length)
    }, 5000)
    return () => clearInterval(id)
  }, [userHasClicked, ringItems.length])

  /* Match the 3D ring cube colors: light #f0f0f8, dark #1e1e2e */
  const fallbackBg =
    theme === "dark"
      ? "radial-gradient(ellipse 80% 80% at 50% 50%, #1e1e2e, #16162a)"
      : "radial-gradient(ellipse 80% 80% at 50% 50%, #f0f0f8, #e8e8f2)"

  const handleRetry = useCallback(() => {
    if (contextLostTimerRef.current) {
      clearTimeout(contextLostTimerRef.current)
      contextLostTimerRef.current = null
    }
    setContextLost(false)
    setRemountKey((k) => k + 1)
  }, [])

  const handleContextLost = useCallback(() => {
    if (contextLostTimerRef.current) return
    contextLostTimerRef.current = setTimeout(() => {
      contextLostTimerRef.current = null
      setContextLost(true)
    }, 900)
  }, [])

  const handleContextRestored = useCallback(() => {
    if (contextLostTimerRef.current) {
      clearTimeout(contextLostTimerRef.current)
      contextLostTimerRef.current = null
    }
  }, [])

  const sectionClassName = compact
    ? "relative w-full"
    : "relative min-h-screen w-full"
  const innerHeightClass = compact ? "h-[72vh] min-h-[420px]" : "h-screen"
  const Wrapper = embeddable ? React.Fragment : "section"
  const wrapperProps = embeddable ? {} : { id: "solutions-wheel", className: sectionClassName }

  if (contextLost) {
    return (
      <Wrapper {...wrapperProps}>
        <div
          className={`flex w-full flex-col items-center justify-center gap-4 ${compact ? "h-[72vh] min-h-[420px]" : "h-screen"}`}
          style={{ background: fallbackBg }}
        >
          <p
            className="text-center text-sm"
            style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)" }}
          >
            The 3D view was reset.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
              color: isDark ? "#fff" : "#1a1a2e",
            }}
          >
            Retry
          </button>
        </div>
      </Wrapper>
    )
  }

  const seeSolutionLabel = t.aboutSolutions?.seeSolution
  const solutionSlug = activeItem?.name?.toLowerCase().replace(/\s+/g, "") ?? ""
  const solutionHref = solutionSlug ? `/solutions/${solutionSlug}` : ""
  const router = useRouter()
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)

  const handleSeeSolutionClick = useCallback(
    (e: React.MouseEvent) => {
      if (!solutionHref) return
      e.preventDefault()
      setNavigatingTo(solutionSlug)
      router.push(solutionHref)
    },
    [solutionHref, solutionSlug, router]
  )

  const handleSeeSolutionMouseEnter = useCallback(() => {
    if (solutionHref) router.prefetch(solutionHref)
  }, [solutionHref, router])

  return (
    <Wrapper {...wrapperProps}>
      {/* 3D Solutions Ring — full viewport or compact for embed */}
      <div
        className={`flex flex-col w-full ${innerHeightClass}`}
      >
        <div
          className={`relative w-full flex-1 min-h-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40`}
          tabIndex={0}
          role="group"
          aria-label="Solutions ring"
        >
          <SolutionsRingErrorBoundary
            fallbackBg={fallbackBg}
            remountKey={remountKey}
            onRetry={handleRetry}
          >
            <SolutionsRing3D
              items={ringItems}
              activeIndex={activeIndex}
              onSelectIndex={(index) => {
                setUserHasClicked(true)
                setActiveIndex(index)
              }}
              isDark={isDark}
              reducedMotion={reducedMotion}
              overviewLabel={content?.overviewLabel}
              onContextLost={handleContextLost}
              onContextRestored={handleContextRestored}
              compact={compact}
              embeddable={embeddable}
              seeSolutionLabel={seeSolutionLabel}
            />
          </SolutionsRingErrorBoundary>
        </div>

        {/* When embeddable: show selected solution name and See solution button below the ring */}
        {embeddable && activeItem && seeSolutionLabel && (
          <div
            className="relative z-10 flex flex-col items-center justify-center gap-2 pb-6 pt-4 shrink-0"
            style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)" }}
          >
            <span className="text-lg font-semibold">{activeItem.name}</span>
            <Link
              href={solutionHref}
              onMouseEnter={handleSeeSolutionMouseEnter}
              onClick={handleSeeSolutionClick}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-current bg-transparent px-4 py-2 text-sm font-medium text-foreground no-underline opacity-90 transition-opacity hover:opacity-100 disabled:pointer-events-none"
              aria-busy={navigatingTo === solutionSlug}
            >
              {navigatingTo === solutionSlug ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
              ) : null}
              <span>{seeSolutionLabel}</span>
            </Link>
          </div>
        )}
      </div>

      {/* LEGACY: Left description panel is commented out — descriptions live on the 3D cards.
          To restore: add a left column with content?.label, activeItem?.name, activeItem?.shortDescription,
          tags, and Link for exploreCta + viewAll; use a two-column layout (e.g. lg:flex-row) and
          give the 3D column max-w again instead of full viewport. */}
    </Wrapper>
  )
}
