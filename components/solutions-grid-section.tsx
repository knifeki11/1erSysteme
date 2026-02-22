"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { SOLUTIONS_RING_ORDER, SOLUTION_LOGOS } from "@/components/solutions/solutions-ring-data"
import { cn } from "@/lib/utils"

type SolutionsPageItem = { name: string; description: string; tags?: string[] }

function solutionSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "")
}

export function SolutionsGridSection() {
  const { t } = useI18n()
  const items = (t.solutionsPage as { items: SolutionsPageItem[] }).items ?? []
  const title = t.productsPage.solutionsHeroTitle
  const subtitle = t.productsPage.solutionsHeroSubtitle
  const discoverLabel = t.productsPage.discover
  const solutionLabel = t.productsPage.tabs?.solutionBadge ?? "Solution"

  const solutions = SOLUTIONS_RING_ORDER.map((name) => {
    const fromT = items.find((i: SolutionsPageItem) => i.name === name)
    const description = fromT?.description ?? ""
    const shortDesc = description.length > 120 ? description.slice(0, 120).trim() + "…" : description
    return {
      name,
      slug: solutionSlug(name),
      logoSrc: SOLUTION_LOGOS[name] ?? "/images/final_logo/Logo%20(2).svg",
      description: shortDesc,
      tags: (fromT?.tags ?? []).slice(0, 3),
    }
  })

  return (
    <>
      {/* Hero: minimal, large typography, generous spacing */}
      <section className="relative py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#040404]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
          <h1 className="font-hero text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            {title}
          </h1>
          <p className="font-hero mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Solutions grid: 4 cols desktop, 2 tablet, 1 mobile */}
      <section className="relative pb-24 sm:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#040404]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_10%,rgba(0,0,0,0.04),transparent_60%)] dark:bg-[radial-gradient(80%_60%_at_70%_10%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((sol) => (
              <Link
                key={sol.slug}
                href={`/solutions/${sol.slug}`}
                className={cn(
                  "group flex flex-col rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:border-border",
                  "active:scale-[0.99] active:duration-75",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
                  "dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] dark:hover:border-white/20"
                )}
              >
                {/* Top: logo + optional label */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted/50 dark:bg-white/5">
                    <Image
                      src={sol.logoSrc}
                      alt=""
                      width={48}
                      height={48}
                      className="object-contain p-1.5"
                    />
                  </div>
                  <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:border-white/10 dark:bg-white/5">
                    {solutionLabel}
                  </span>
                </div>

                {/* Middle: name + description */}
                <h2 className="font-hero mt-4 text-lg font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-xl">
                  {sol.name}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {sol.description}
                </p>

                {/* Bottom: tags + discover */}
                <div className="mt-auto pt-5">
                  {sol.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {sol.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/50 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground dark:border-white/10 dark:bg-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-3 flex items-center gap-1 text-xs font-medium text-foreground/80 group-hover:text-accent">
                    {discoverLabel}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
