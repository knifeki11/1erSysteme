"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

type ServicesPhase = {
  title: string
  subtitle: string
  bullets: ReadonlyArray<string>
}

type ServicesMethodContent = {
  label: string
  title: string
  description?: string
  subtitle?: string
  supportingText?: string
  ctaPrimary: string
  ctaSecondary: string
  learnMore: string
  credibility?: ReadonlyArray<string>
  phases: ReadonlyArray<ServicesPhase>
}

/** SVG icons per step: Audit, Conception, Deploy, Support */
function StepIconAudit({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M14 8h20v6H14V8zm0 8h12v2H14v-2zm0 6h16v2H14v-2zm-2 6v4h20v-4H12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M35 20l-2.5-2.5M35 20l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function StepIconConception({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 20h32M8 26h24M8 32h20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M14 8v4M24 8v4M34 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function StepIconDeploy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="10" y="14" width="28" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M24 10v4M24 36v4M14 24h-4M38 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 24l6-6 6 6M18 28l6 6 6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepIconSupport({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M24 8c-6 0-11 4.5-11 10 0 4 3 7.5 7 9v6h8v-6c4-1.5 7-5 7-9 0-5.5-5-10-11-10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="28" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

const STEP_ICONS = [StepIconAudit, StepIconConception, StepIconDeploy, StepIconSupport]

export function ServicesMethodSection() {
  const { t } = useI18n()
  const content = t.servicesMethod as unknown as ServicesMethodContent
  const phases = content?.phases ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhase = phases[activeIndex]
  const StepIcon = STEP_ICONS[activeIndex]

  const headlineSubtitle = content?.subtitle ?? content?.description ?? ""
  const supportingText = content?.supportingText ?? ""
  const credibility = content?.credibility ?? []

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight" && index < phases.length - 1) setActiveIndex(index + 1)
      if (e.key === "ArrowLeft" && index > 0) setActiveIndex(index - 1)
    },
    [phases.length]
  )

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28"
      aria-labelledby="methodology-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#040404]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_10%,rgba(0,0,0,0.03),transparent_60%)] dark:bg-[radial-gradient(80%_60%_at_70%_10%,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,420px),1fr] lg:gap-16">
          {/* LEFT: Title, subtitle, supporting text, CTAs, credibility */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {content?.label}
            </p>
            <h2
              id="methodology-heading"
              className="font-hero mt-4 text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-foreground"
            >
              {content?.title}
            </h2>
            {headlineSubtitle && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {headlineSubtitle}
              </p>
            )}
            {supportingText && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
                {supportingText}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_hsl(var(--accent)_/_0.35)] transition-shadow hover:shadow-[0_6px_24px_hsl(var(--accent)_/_0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                {content?.ctaPrimary}
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 text-sm font-semibold text-foreground/85 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:border-white/15 dark:bg-white/5 dark:hover:border-white/25"
              >
                {content?.ctaSecondary}
              </Link>
            </div>
            {credibility.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-border/50 pt-6 dark:border-white/10">
                {credibility.map((line) => (
                  <span
                    key={line}
                    className="rounded-lg bg-foreground/[0.04] px-3 py-1.5 text-xs font-medium text-muted-foreground dark:bg-white/10 dark:text-white/80"
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Timeline + content panel */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(70%_60%_at_70%_30%,hsl(var(--accent)_/_0.06),transparent_55%)] dark:bg-[radial-gradient(70%_60%_at_70%_30%,hsl(var(--accent)_/_0.08),transparent_55%)]" aria-hidden />

            {/* Timeline: horizontal on sm+, vertical stepper on mobile */}
            <div
              role="tablist"
              aria-label="Methodology steps"
              className={cn(
                "pb-8",
                "flex flex-col gap-2 sm:grid sm:grid-cols-4 sm:items-stretch sm:gap-3"
              )}
            >
              {phases.map((phase, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={phase.title}
                    id={`method-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`method-panel-${index}`}
                    aria-label={`${index + 1}. ${phase.title}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={cn(
                      "flex min-h-[56px] min-w-0 flex-shrink-0 items-center gap-4 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfbfb] dark:focus-visible:ring-offset-[#040404]",
                      "sm:min-h-0 sm:flex-col sm:gap-2 sm:px-2 sm:py-4 sm:text-center",
                      isActive
                        ? "border-accent/50 bg-accent/10 shadow-[0_0_0_2px_hsl(var(--accent)_/_0.2)] dark:bg-accent/15 dark:shadow-[0_0_20px_hsl(var(--accent)_/_0.25)]"
                        : "border-border/60 bg-background dark:border-white/15 dark:bg-white/5"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all duration-200",
                        isActive
                          ? "border-accent/50 bg-accent/10 text-accent dark:bg-accent/15"
                          : "border-border/60 bg-background text-muted-foreground dark:border-white/15 dark:bg-white/5"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-sm font-semibold sm:flex-none sm:text-center sm:text-xs sm:leading-tight",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {phase.title}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Content panel */}
            <div
              role="tabpanel"
              id={`method-panel-${activeIndex}`}
              aria-labelledby={`method-tab-${activeIndex}`}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)]"
            >
              <AnimatePresence mode="wait">
                {activePhase && (() => {
                  const StepIcon = STEP_ICONS[activeIndex]
                  return (
                  <motion.div
                    key={activePhase.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex flex-col gap-6 p-6 sm:p-8"
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"
                        aria-hidden
                      >
                        {StepIcon && <StepIcon className="h-7 w-7" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                          {activePhase.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {activePhase.subtitle}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-sm text-foreground/90">
                      {activePhase.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/services"
                      className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 rounded"
                    >
                      {content?.learnMore}
                    </Link>
                  </motion.div>
                  )
                })()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
