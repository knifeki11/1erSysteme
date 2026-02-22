"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { DistrexImpactChart } from "@/components/solutions/distrex-charts"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type DistrexPageT = {
  sectionComplete: string
  sectionCompleteIntro: string
  sectionCompleteBullets: readonly string[]
  sectionMobile: string
  sectionMobileIntro: string
  sectionMobileBullets: readonly string[]
  sectionStock: string
  sectionStockIntro: string
  sectionStockBullets: readonly string[]
  sectionAdapted: string
  sectionAdaptedIntro: string
  sectionAdaptedBullets: readonly string[]
  sectionWhy: string
  sectionWhyIntro: string
  sectionWhyBullets: readonly string[]
  ctaHeadline: string
  ctaSubtext: string
  ctaPhone: string
  ctaTagline: string
  requestDemo: string
  contactSales: string
  imageAltDistr?: string
  imageAltDist1?: string
  imageAltDist2?: string
}

function TwoColSection({
  title,
  intro,
  bullets,
  imageSrc,
  imageAlt,
  imageRight = true,
}: {
  title: string
  intro?: string
  bullets: readonly string[]
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
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {intro && <p>{intro}</p>}
                <ul className="list-none space-y-2 pl-0">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {imageBlock && <div className="min-h-0 w-full">{imageBlock}</div>}
            </>
          ) : (
            <>
              {imageBlock && <div className="min-h-0 w-full">{imageBlock}</div>}
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {intro && <p>{intro}</p>}
                <ul className="list-none space-y-2 pl-0">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function TextSection({
  title,
  intro,
  bullets,
  grid = false,
}: {
  title: string
  intro?: string
  bullets: readonly string[]
  grid?: boolean
}) {
  return (
    <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
      <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{intro}</p>}
        {grid ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bullets.map((item) => (
              <div
                key={item}
                className={cn(
                  "rounded-xl border border-border/60 bg-card/50 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/[0.04]"
                )}
              >
                <p className="text-sm font-medium leading-snug text-foreground">{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <ul className="mt-6 list-none space-y-2 pl-0 text-muted-foreground">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export function DistrexPageContent() {
  const { t } = useI18n()
  const s = (t.distrexPage ?? t) as DistrexPageT

  return (
    <>
      {/* 1) Une solution complète pour les distributeurs et grossistes */}
      <TwoColSection
        title={s.sectionComplete}
        intro={s.sectionCompleteIntro}
        bullets={s.sectionCompleteBullets ?? []}
        imageSrc="/images/distr.jpg"
        imageAlt={s.imageAltDistr ?? "Distrex — solution de gestion de distribution"}
        imageRight={true}
      />

      {/* 2) Application mobile pour commerciaux terrain */}
      <TwoColSection
        title={s.sectionMobile}
        intro={s.sectionMobileIntro}
        bullets={s.sectionMobileBullets ?? []}
        imageSrc="/images/dist1.jpg"
        imageAlt={s.imageAltDist1 ?? "Application mobile Distrex pour commerciaux"}
        imageRight={false}
      />

      {/* 3) Gestion de stock et suivi des livraisons */}
      <TwoColSection
        title={s.sectionStock}
        intro={s.sectionStockIntro}
        bullets={s.sectionStockBullets ?? []}
        imageSrc="/images/dist2.jpg"
        imageAlt={s.imageAltDist2 ?? "Gestion de stock et livraisons Distrex"}
        imageRight={true}
      />

      {/* 4) Logiciel adapté aux distributeurs marocains et africains */}
      <TextSection
        title={s.sectionAdapted}
        intro={s.sectionAdaptedIntro}
        bullets={s.sectionAdaptedBullets ?? []}
        grid={true}
      />

      {/* 5) Pourquoi choisir DISTREX ? + Business impact chart */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionWhy}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="space-y-4">
              {s.sectionWhyIntro && (
                <p className="text-base leading-relaxed text-muted-foreground">{s.sectionWhyIntro}</p>
              )}
              <ul className="list-none space-y-2 pl-0 text-muted-foreground">
                {(s.sectionWhyBullets ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <DistrexImpactChart />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Demandez une démonstration */}
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
          {s.ctaPhone && (
            <p className="mt-4 font-medium text-foreground">
              <a href={`tel:${s.ctaPhone.replace(/\s/g, "")}`} className="hover:underline">
                {s.ctaPhone}
              </a>
            </p>
          )}
          {s.ctaTagline && (
            <p className="mt-1 text-sm text-muted-foreground">{s.ctaTagline}</p>
          )}
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
              {s.contactSales}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
