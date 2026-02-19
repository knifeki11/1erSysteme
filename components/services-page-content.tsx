"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { HeroBackground } from "@/components/hero-background"
import {
  Code2,
  Network,
  Shield,
  Phone,
  Cpu,
  Wrench,
  ChevronRight,
  CheckCircle2,
  Building2,
  Heart,
  Factory,
  ShoppingBag,
  GraduationCap,
  Landmark,
  ClipboardCheck,
  Layout,
  Truck,
  BookOpen,
  HeadphonesIcon,
} from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"

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

type BenefitItem = { title: string; description: string }
type ProcessStep = { step: string; title: string }

type ServicesPageContent = {
  heroTitle?: string
  heroSubtitle?: string
  heroCtaPrimary?: string
  heroCtaSecondary?: string
  sectionWhatWeDeliver?: string
  benefits?: ReadonlyArray<BenefitItem>
  sectionIndustries?: string
  industries?: ReadonlyArray<string>
  sectionProcess?: string
  processSteps?: ReadonlyArray<ProcessStep>
  ctaTitle?: string
  ctaPrimary?: string
  ctaSecondary?: string
}

const SERVICE_ICONS = [Code2, Network, Shield, Phone, Cpu, Wrench] as const
const BENEFIT_ICONS = [Shield, Truck, HeadphonesIcon, Layout, CheckCircle2, ClipboardCheck] as const
const PROCESS_ICONS = [ClipboardCheck, Layout, Truck, BookOpen, HeadphonesIcon] as const

/** Abstract tech visuals for each service (enterprise IT / systems / networks / security). */
const SERVICE_VISUAL_URLS = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
]

const INDUSTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Administrations publiques": Building2,
  "Public administration": Building2,
  "Santé & hôpitaux": Heart,
  "Healthcare & hospitals": Heart,
  "Industrie & production": Factory,
  "Industry & manufacturing": Factory,
  "Distribution & retail": ShoppingBag,
  "Éducation": GraduationCap,
  "Education": GraduationCap,
  "Institutions financières": Landmark,
  "Financial institutions": Landmark,
  // Arabic
  "الإدارات العامة": Building2,
  "الصحة والمستشفيات": Heart,
  "الصناعة والإنتاج": Factory,
  "التوزيع والتجزئة": ShoppingBag,
  "التعليم": GraduationCap,
  "المؤسسات المالية": Landmark,
}

export function ServicesPageContent() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  useHeroScrollLock(PAGE_HERO_ID)

  const pipeline = t.servicesPipeline as unknown as ServicesPipelineContent
  const page = t.servicesPage as unknown as ServicesPageContent
  const items = pipeline?.items ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]

  const heroTitle = page?.heroTitle ?? "Services qui transforment vos opérations"
  const heroSubtitle =
    page?.heroSubtitle ??
    "De la stratégie à l'exploitation — nous concevons, déployons et maintenons des systèmes critiques pour les organisations."
  const heroCtaPrimary = page?.heroCtaPrimary ?? "Planifier une démonstration"
  const heroCtaSecondary = page?.heroCtaSecondary ?? "Voir nos solutions"
  const benefits = page?.benefits ?? []
  const industries = page?.industries ?? []
  const processSteps = page?.processSteps ?? []
  const ctaTitle = page?.ctaTitle ?? "Prêt à moderniser vos systèmes ?"
  const ctaPrimary = page?.ctaPrimary ?? "Demander une démonstration"
  const ctaSecondary = page?.ctaSecondary ?? "Nous contacter"

  return (
    <>
      {/* 1) HERO — same background as Solutions / MYT / other pages */}
      <section
        id={PAGE_HERO_ID}
        className="relative flex h-screen min-h-0 items-center overflow-hidden"
        data-header-theme={isDark ? "inverted" : undefined}
      >
        <HeroBackground />
        {isDark && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[65%]"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
            aria-hidden
          />
        )}
        <div className="relative z-10 w-full px-10 sm:px-16 md:px-20 lg:px-24 pointer-events-none">
          <div className="mx-auto max-w-6xl">
            <h1
              className={cn(
                "font-hero max-w-4xl text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.02em]",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              {heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* 2) INTERACTIVE SERVICE BLOCKS */}
      <section className="relative py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: isDark ? "#0a0a0f" : "#fbfbfb",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.02),transparent_50%)]" aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {pipeline?.label}
          </p>
          <p className="font-hero mt-2 max-w-xl text-base text-muted-foreground sm:text-lg">
            {pipeline?.subtitle}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,minmax(0,480px)] lg:gap-16">
            {/* Left: service cards */}
            <div className="flex flex-col gap-3">
              {items.map((item, index) => {
                const isActive = index === activeIndex
                const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length]
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                      isActive
                        ? "border-accent/40 bg-accent/5 shadow-[0_8px_32px_-8px_hsl(var(--accent)_/_0.15)] dark:border-accent/30 dark:bg-accent/10"
                        : "border-border/50 bg-card/50 hover:border-border/80 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
                    )}
                    aria-pressed={isActive}
                  >
                    <span className="font-hero text-2xl font-bold tabular-nums text-muted-foreground group-hover:text-accent">
                      {item.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                          )}
                        />
                        <span
                          className={cn(
                            "font-hero text-base font-semibold sm:text-lg",
                            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {item.title}
                        </span>
                      </span>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform",
                        isActive ? "text-accent" : "text-muted-foreground group-hover:translate-x-0.5"
                      )}
                    />
                  </button>
                )
              })}
            </div>

            {/* Right: detail + visual (desktop only; mobile uses expand below) */}
            <div className="relative hidden min-h-[360px] lg:block lg:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.number ?? 0}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex h-full flex-col gap-6"
                >
                  {active && (
                    <>
                      {/* Visual */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/30 dark:border-white/10 dark:bg-white/5">
                        <img
                          src={SERVICE_VISUAL_URLS[items.indexOf(active) % SERVICE_VISUAL_URLS.length]}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
                        <h3 className="font-hero text-lg font-semibold text-foreground sm:text-xl">
                          {active.number} — {active.title}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
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
                          href="/contact"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                        >
                          {pipeline?.cta}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: expand detail below selected card */}
          <div className="mt-6 lg:hidden">
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src={SERVICE_VISUAL_URLS[items.indexOf(active) % SERVICE_VISUAL_URLS.length]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-hero text-lg font-semibold text-foreground">
                    {active.number} — {active.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{active.description}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {active.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                  >
                    {pipeline?.cta}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3) WHAT WE DELIVER */}
      {benefits.length > 0 && (
        <section className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[#fbfbfb] dark:bg-[#040404]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_100%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {page?.sectionWhatWeDeliver}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length]
                return (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-border/50 bg-card/40 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-hero text-base font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4) INDUSTRIES */}
      {industries.length > 0 && (
        <section className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[#fbfbfb] dark:bg-[#040404]" aria-hidden />
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {page?.sectionIndustries}
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {industries.map((name) => {
                const Icon = INDUSTRY_ICONS[name] ?? Building2
                return (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded-2xl border border-border/50 bg-card/40 px-5 py-3 shadow-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-foreground">{name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5) PROCESS / METHODOLOGY */}
      {processSteps.length > 0 && (
        <section className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[#fbfbfb] dark:bg-[#040404]" aria-hidden />
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {page?.sectionProcess}
            </h2>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6">
              {processSteps.map((s, i) => {
                const Icon = PROCESS_ICONS[i % PROCESS_ICONS.length]
                return (
                  <div
                    key={s.step}
                    className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/40 px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:min-w-[180px] sm:flex-1"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {s.step}
                      </span>
                      <p className="font-hero text-sm font-semibold text-foreground">{s.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6) CTA SECTION */}
      <section className="relative py-20 sm:py-28">
        <div
          className="absolute inset-0 -z-10 rounded-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--accent) / 0.12), transparent 60%), linear-gradient(180deg, #0e0e14 0%, #0a0a0f 100%)"
              : "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--accent) / 0.08), transparent 60%), linear-gradient(180deg, #f1f5f9 0%, #eef2f7 100%)",
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl md:text-4xl">
            {ctaTitle}
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              {ctaPrimary}
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border-2 border-foreground/20 bg-transparent px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
