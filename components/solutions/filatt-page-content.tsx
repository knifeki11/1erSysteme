"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { ArrowRight, Check } from "lucide-react"
import { FilattImpactChart } from "@/components/solutions/filatt-charts"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type FilattPageT = {
  sectionProblem: string
  sectionProblemBullets: readonly string[]
  sectionProblemCallout: string
  sectionSolution: string
  sectionSolutionIntro: string
  sectionSolutionBullets: readonly string[]
  sectionSolutionClosing: string
  sectionHow: string
  sectionHowStep1: string
  sectionHowStep1Desc: string
  sectionHowStep2: string
  sectionHowStep2Desc: string
  sectionHowStep3: string
  sectionHowStep3Desc: string
  sectionHowStep4: string
  sectionHowStep4Desc: string
  sectionHowPhrase: string
  sectionModules: string
  moduleCore: string
  moduleCoreDesc: string
  moduleDigital: string
  moduleDigitalDesc: string
  moduleRdv: string
  moduleRdvDesc: string
  moduleAnalytics: string
  moduleAnalyticsDesc: string
  moduleMultiSite: string
  moduleMultiSiteDesc: string
  sectionRoi: string
  sectionRoiBullets: readonly string[]
  sectionCible: string
  sectionCibleIntro: string
  sectionCibleBullets: readonly string[]
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactTeam: string
  imageAltFilat?: string
  imageAltFilat2?: string
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

export function FilattPageContent() {
  const { t } = useI18n()
  const s = (t.filattPage ?? t) as FilattPageT

  return (
    <>
      {/* 1) Section Problème */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionProblem}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="space-y-4">
              <ul className="list-none space-y-2 pl-0 text-muted-foreground">
                {(s.sectionProblemBullets ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:border-primary/30 dark:bg-primary/10">
              <p className="text-base font-medium leading-relaxed text-foreground">
                {s.sectionProblemCallout}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Section Solution */}
      <TwoColSection
        title={s.sectionSolution}
        imageSrc="/images/filat.jpg"
        imageAlt={s.imageAltFilat ?? "FilAtt — gestion des files d'attente"}
        imageRight={true}
      >
        <p>{s.sectionSolutionIntro}</p>
        <ul className="list-none space-y-2 pl-0">
          {(s.sectionSolutionBullets ?? []).map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="pt-2 font-medium text-foreground">{s.sectionSolutionClosing}</p>
      </TwoColSection>

      {/* 3) Section Comment ça marche */}
      <TwoColSection
        title={s.sectionHow}
        imageSrc="/images/filat2.jpg"
        imageAlt={s.imageAltFilat2 ?? "FilAtt — flux et affichage"}
        imageRight={false}
      >
        <div className="space-y-6">
          <div>
            <p className="font-medium text-foreground">{s.sectionHowStep1}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{s.sectionHowStep1Desc}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{s.sectionHowStep2}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{s.sectionHowStep2Desc}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{s.sectionHowStep3}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{s.sectionHowStep3Desc}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{s.sectionHowStep4}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{s.sectionHowStep4Desc}</p>
          </div>
        </div>
        <p className="mt-6 border-l-2 border-primary pl-4 font-medium italic text-foreground">
          {s.sectionHowPhrase}
        </p>
      </TwoColSection>

      {/* 4) Section Modules */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionModules}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-card/50 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-semibold text-foreground">{s.moduleCore}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.moduleCoreDesc}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-semibold text-foreground">{s.moduleDigital}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.moduleDigitalDesc}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-semibold text-foreground">{s.moduleRdv}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.moduleRdvDesc}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-semibold text-foreground">{s.moduleAnalytics}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.moduleAnalyticsDesc}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04] sm:col-span-2 lg:col-span-1">
              <h3 className="font-semibold text-foreground">{s.moduleMultiSite}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.moduleMultiSiteDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5) Section ROI + Impact chart */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionRoi}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <ul className="list-none space-y-3 pl-0 text-muted-foreground">
              {(s.sectionRoiBullets ?? []).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full">
              <FilattImpactChart />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Section Cible */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionCible}
          </h2>
          {s.sectionCibleIntro && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.sectionCibleIntro}</p>}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(s.sectionCibleBullets ?? []).map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border/60 bg-card/50 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04]"
              >
                <p className="font-medium text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CTA */}
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
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
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
