"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { ArrowRight, Check } from "lucide-react"
import { OneTouchImpactChart } from "@/components/solutions/onetouch-charts"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type OnetouchPageT = {
  sectionProblem: string
  sectionProblemIntro: string
  sectionProblemTools: readonly string[]
  sectionProblemResultLabel: string
  sectionProblemResults: readonly string[]
  sectionSolution: string
  sectionSolutionIntro: string
  sectionSolutionBullets: readonly string[]
  sectionSolutionClosing: string
  sectionSector: string
  sectorRestauration: string
  sectorRestaurationDesc: string
  sectorRetail: string
  sectorRetailDesc: string
  sectorSupermarket: string
  sectorSupermarketDesc: string
  sectionMultiSite: string
  sectionMultiSiteIntro: string
  sectionMultiSiteBullets: readonly string[]
  sectionMultiSiteClosing: string
  sectionEcosystem: string
  sectionEcosystemIntro: string
  sectionEcosystemInterop: string
  sectionEcosystemBullets: readonly string[]
  sectionEcosystemClosing: string
  sectionBenefits?: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactTeam: string
  imageAltOneT?: string
  imageAltOneT1?: string
  imageAltOneT2?: string
}

function TwoColSection({
  title,
  children,
  imageSrc,
  imageAlt,
  imageRight = true,
}: {
  title: string
  children: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  imageRight?: boolean
}) {
  const imageBlock = imageSrc && imageAlt ? (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  ) : null

  return (
    <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
      <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
          {title}
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {imageRight ? (
            <>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
              {imageBlock && <div className="min-h-0 w-full">{imageBlock}</div>}
            </>
          ) : (
            <>
              {imageBlock && <div className="min-h-0 w-full">{imageBlock}</div>}
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export function OneTouchPageContent() {
  const { t } = useI18n()
  const s = (t.onetouchPage ?? t) as OnetouchPageT

  return (
    <>
      {/* 1) Section Problème */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionProblem}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>{s.sectionProblemIntro}</p>
              <ul className="list-none space-y-2 pl-0">
                {(s.sectionProblemTools ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-medium text-foreground">{s.sectionProblemResultLabel}</p>
              <ul className="list-none space-y-2 pl-0">
                {(s.sectionProblemResults ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-destructive" aria-hidden>❌</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] min-h-0 w-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <img src="/images/oneT1.jpg" alt={s.imageAltOneT1 ?? "OneTouch — inventory and operations"} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 2) Section Solution */}
      <TwoColSection
        title={s.sectionSolution}
        imageSrc="/images/oneT.jpg"
        imageAlt={s.imageAltOneT ?? "OneTouch — plateforme commerciale"}
        imageRight={true}
      >
        <p>{s.sectionSolutionIntro}</p>
        <ul className="list-none space-y-2 pl-0">
          {(s.sectionSolutionBullets ?? []).map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="pt-2 font-medium text-foreground">{s.sectionSolutionClosing}</p>
      </TwoColSection>

      {/* 3) Section Par secteur */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionSector}
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-semibold text-foreground">{s.sectorRestauration}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.sectorRestaurationDesc}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-semibold text-foreground">{s.sectorRetail}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.sectorRetailDesc}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-semibold text-foreground">{s.sectorSupermarket}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.sectorSupermarketDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Section Multi-Site */}
      <TwoColSection
        title={s.sectionMultiSite}
        imageSrc="/images/OneT2.jpg"
        imageAlt={s.imageAltOneT2 ?? "OneTouch — multi-site and traceability"}
        imageRight={true}
      >
        <p>{s.sectionMultiSiteIntro}</p>
        <ul className="list-none space-y-2 pl-0">
          {(s.sectionMultiSiteBullets ?? []).map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="pt-2 font-medium text-foreground">{s.sectionMultiSiteClosing}</p>
      </TwoColSection>

      {/* 5) Section Écosystème */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionEcosystem}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.sectionEcosystemIntro}</p>
          <p className="mt-4 font-medium text-foreground">{s.sectionEcosystemInterop}</p>
          <ul className="mt-4 list-none space-y-2 pl-0 text-muted-foreground">
            {(s.sectionEcosystemBullets ?? []).map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-medium text-foreground">{s.sectionEcosystemClosing}</p>
          <div className="mt-12 w-full">
            <OneTouchImpactChart />
          </div>
        </div>
      </section>

      {/* 6) CTA Final */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(135deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--muted)) 50%, hsl(var(--background)) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,0.04),transparent)] dark:bg-[radial-gradient(80%_50%_at_50%_100%,rgba(255,255,255,0.06),transparent)]" aria-hidden />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl lg:text-4xl">
            {s.ctaHeadline}
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-foreground">
            {s.ctaSubtext}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.1)]",
                "transition-all hover:opacity-95 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {s.requestDemo}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-transparent px-6 py-3.5 font-medium text-foreground",
                "transition-all hover:bg-muted/60 hover:border-border dark:border-white/20 dark:hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {s.contactTeam}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
