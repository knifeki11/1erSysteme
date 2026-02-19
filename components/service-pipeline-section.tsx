"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

type PipelineItem = {
  number: string
  title: string
  description: string
  bullets: ReadonlyArray<string>
}

type ServicesPipelineContent = {
  label: string
  subtitle: string
  cta: string
  items: ReadonlyArray<PipelineItem>
}

export function ServicePipelineSection() {
  const { t } = useI18n()
  const content = t.servicesPipeline as unknown as ServicesPipelineContent
  const items = content.items
  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]

  return (
    <section id="services-pipeline" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#040404]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_10%,rgba(0,0,0,0.04),transparent_60%)] dark:bg-[radial-gradient(80%_60%_at_70%_10%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr,minmax(0,480px)] lg:gap-16">
          {/* Left — vertical service stack */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {content.label}
            </p>
            <p className="font-hero mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-2">
              {items.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group relative flex w-full items-center gap-4 rounded-xl border border-border/50 bg-card/40 py-4 pl-4 pr-5 text-left backdrop-blur-sm transition-all duration-200 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(0,122,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-accent/30"
                    aria-pressed={isActive}
                    aria-label={`${item.title}, ${index + 1} of ${items.length}`}
                  >
                    {/* Animated active line */}
                    <span
                      className="absolute inset-y-0 left-0 rounded-l-xl bg-accent/20 transition-[width] duration-300 ease-out"
                      style={{ width: isActive ? "100%" : "0%" }}
                    />
                    <span className="relative text-xs font-bold tabular-nums text-muted-foreground">
                      [ {item.number} ]
                    </span>
                    <span
                      className={`relative flex-1 font-hero text-sm font-medium transition-colors sm:text-base ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.title}
                    </span>
                    <ChevronRight className="relative h-5 w-5 shrink-0 text-muted-foreground group-hover:text-accent" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right — dynamic detail panel */}
          <div className="relative min-h-[320px] lg:min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.number ?? 0}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8"
              >
                {active && (
                  <>
                    <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                      {active.number} — {active.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {active.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                      {active.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/#contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                    >
                      {content.cta}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
