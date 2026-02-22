"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { PageShell } from "@/components/page-shell"
import { SOLUTIONS_RING_ORDER, SOLUTION_LOGOS, SOLUTION_HERO_BGS } from "@/components/solutions/solutions-ring-data"
import { RezerToPageContent } from "@/components/solutions/rezerto-page-content"
import { SmartClubPageContent } from "@/components/solutions/smartclub-page-content"
import { TagFlowPageContent } from "@/components/solutions/tagflow-page-content"
import { CantiPosPageContent } from "@/components/solutions/cantipos-page-content"
import { DistrexPageContent } from "@/components/solutions/distrex-page-content"
import { FilattPageContent } from "@/components/solutions/filatt-page-content"
import { OneTouchPageContent } from "@/components/solutions/onetouch-page-content"
import { QuickPassPageContent } from "@/components/solutions/quickpass-page-content"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"
import { cn } from "@/lib/utils"

type SolutionsPageItem = { name: string; description: string; tags?: string[] }

const SLUG_TO_NAME: Record<string, string> = Object.fromEntries(
  SOLUTIONS_RING_ORDER.map((name) => [name.toLowerCase().replace(/\s+/g, ""), name])
)

export default function SolutionSlugPage() {
  const params = useParams()
  const slug = typeof params?.slug === "string" ? params.slug : ""
  const name = SLUG_TO_NAME[slug]
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  useHeroScrollLock(PAGE_HERO_ID)

  const items = (t.solutionsPage as unknown as { items: SolutionsPageItem[] }).items ?? []
  const item = name ? items.find((i) => i.name === name) : null
  const backLabel = t.solutionsPage?.viewAll ?? "View all solutions"
  const logoSrc = name ? (SOLUTION_LOGOS[name] ?? "/images/final_logo/Logo%20(2).svg") : ""

  if (!name || !item) {
    return (
      <PageShell>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
          <p className="font-hero text-lg text-muted-foreground">{(t.solutionsPage as { notFound?: string })?.notFound ?? "Solution not found."}</p>
          <Link
            href="/solutions"
            className="font-hero mt-4 text-sm font-medium text-foreground underline hover:no-underline"
          >
            {backLabel}
          </Link>
        </div>
      </PageShell>
    )
  }

  const heroBgSrc = SOLUTION_HERO_BGS[name] ?? `/images/${name}_BG.png`
  const isRezerTo = name === "RezerTo"
  const isSmartClub = name === "SmartClub"
  const isTagFlow = name === "TagFlow"
  const isCantiPOS = name === "CantiPOS"
  const isDistrex = name === "Distrex"
  const isFilatt = name === "Filatt"
  const isOneTouch = name === "OneTouch"
  const isQuickPass = name === "QuickPass"

  return (
    <PageShell>
      {/* Hero: full height, solution-specific background image — do not modify */}
      <section
        id={PAGE_HERO_ID}
        className="relative flex h-screen min-h-0 items-center overflow-hidden"
        data-header-theme={isDark ? "inverted" : undefined}
      >
        <div className="absolute inset-0">
          <Image
            src={heroBgSrc}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/65" aria-hidden />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[65%]"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
          aria-hidden
        />
        <div className="relative z-10 w-full px-10 sm:px-16 md:px-20 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/solutions"
              className="pointer-events-auto inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
            <h1 className="font-hero mt-6 max-w-4xl text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white">
              {isDistrex && (t.distrexPage as { heroTitle?: string })?.heroTitle
                ? (t.distrexPage as { heroTitle: string }).heroTitle
                : item.name}
            </h1>
          </div>
        </div>
      </section>

      {isRezerTo ? (
        <RezerToPageContent />
      ) : isSmartClub ? (
        <SmartClubPageContent />
      ) : isTagFlow ? (
        <TagFlowPageContent />
      ) : isCantiPOS ? (
        <CantiPosPageContent />
      ) : isDistrex ? (
        <DistrexPageContent />
      ) : isFilatt ? (
        <FilattPageContent />
      ) : isOneTouch ? (
        <OneTouchPageContent />
      ) : isQuickPass ? (
        <QuickPassPageContent />
      ) : (
        /* Default content below hero for other solutions */
        <section className="relative py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#040404]" />
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]" />
          </div>
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-8">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-3 dark:border-white/10 dark:bg-white/5">
                <Image src={logoSrc} alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs text-muted-foreground",
                          "dark:border-white/10 dark:bg-white/5"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </PageShell>
  )
}
