"use client"

import { Cloud, Brain, Lock, BarChart3, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

export function Solutions() {
  const { t } = useI18n()

  const solutions = [
    { icon: Cloud, ...t.solutions.items.cloud },
    { icon: Brain, ...t.solutions.items.ai },
    { icon: Lock, ...t.solutions.items.security },
    { icon: BarChart3, ...t.solutions.items.data },
  ]

  return (
    <section id="solutions" className="relative bg-secondary/50 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{t.solutions.label}</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {t.solutions.title}
            </h2>
          </div>
          <Link
            href="#contact"
            className="group flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            {t.solutions.viewAll}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <div
                key={solution.title}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 lg:p-10"
              >
                {/* Number */}
                <span className="absolute top-8 end-8 font-display text-5xl font-bold text-secondary lg:top-10 lg:end-10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-display text-2xl font-semibold text-foreground">{solution.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {solution.description}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {solution.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
