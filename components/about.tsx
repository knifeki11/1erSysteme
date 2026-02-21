"use client"

import { useEffect, useMemo, useState } from "react"
import { Server, Network, Wrench } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function About() {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)

  const rotatingPhrases = t.aboutIntro.rotating
  const maxPhraseLength = useMemo(
    () => rotatingPhrases.reduce((max, phrase) => Math.max(max, phrase.length), 0),
    [rotatingPhrases],
  )

  useEffect(() => {
    if (rotatingPhrases.length <= 1) return
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotatingPhrases.length)
    }, 2600)
    return () => window.clearInterval(intervalId)
  }, [rotatingPhrases.length])

  const pillars = [
    {
      icon: Server,
      title: t.about.pillars.security.title,
      description: t.about.pillars.security.description,
    },
    {
      icon: Network,
      title: t.about.pillars.performance.title,
      description: t.about.pillars.performance.description,
    },
    {
      icon: Wrench,
      title: t.about.pillars.client.title,
      description: t.about.pillars.client.description,
    },
  ]


  return (
    <section id="about" className="section-ornament section-ornament--right relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* About intro */}
        <div className="max-w-4xl min-w-0">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {t.about.label}
          </p>
          <h2 className="font-hero mt-4 break-words text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-foreground">
            {t.aboutIntro.staticText}{" "}
            <span
              className="relative inline-block h-[1.1em] max-w-full min-w-0 align-baseline md:min-w-[var(--phrase-min-width)]"
              style={{ ["--phrase-min-width" as string]: `${maxPhraseLength}ch` } as React.CSSProperties}
              aria-live="polite"
              aria-atomic="true"
            >
              {rotatingPhrases.map((phrase, index) => (
                <span
                  key={phrase}
                  className={`absolute left-0 top-0 max-w-full break-words transition-all duration-500 ease-out ${
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  {phrase}
                </span>
              ))}
            </span>
          </h2>
          <p className="font-hero mt-6 max-w-2xl min-w-0 break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t.about.description}
          </p>
        </div>

        {/* Divider */}
        <div className="my-16 h-px w-24 bg-border" />

        {/* Pillars */}
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="group relative rounded-xl border border-border bg-card p-10 shadow-lg shadow-black/10 transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-black/20 dark:shadow-black/35"
              >
                {/* Thin top accent line */}
                <div className="absolute left-6 right-6 top-0 h-px bg-accent/40" />

                {/* Subtle vertical divider line */}
                {index < pillars.length - 1 && (
                  <div className="absolute -right-4 top-10 hidden h-[70%] w-px bg-border/60 md:block" />
                )}

                <div className="mb-8 flex items-center text-foreground transition-colors group-hover:text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {pillar.title}
                </h3>
                <p className="font-hero mt-4 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
