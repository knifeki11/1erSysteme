"use client"

import { Suspense } from "react"
import { useTheme } from "@/lib/theme-context"
import { PageShell } from "@/components/page-shell"
import { HeroBackground } from "@/components/hero-background"
import { Contact } from "@/components/contact"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"

export default function ContactPage() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const contactPage = t.contactPage as { heroHeadlineLine1?: string; heroHeadlineLine2?: string } | undefined
  useHeroScrollLock(PAGE_HERO_ID)

  return (
    <PageShell>
      <section
        id={PAGE_HERO_ID}
        className="relative flex h-screen min-h-0 items-center overflow-hidden"
        data-header-theme={isDark ? "inverted" : undefined}
      >
        <HeroBackground />
        {isDark && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[65%]"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
            aria-hidden
          />
        )}
        <div className="relative z-10 w-full px-10 sm:px-16 md:px-20 lg:px-24">
          <div className="mx-auto max-w-6xl">
          <h1
            className={cn(
              "font-hero max-w-4xl text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            {contactPage?.heroHeadlineLine1 ?? "Get in touch."}
            <br />
            {contactPage?.heroHeadlineLine2 ?? "We're here to help."}
          </h1>
          </div>
        </div>
      </section>

      <Suspense fallback={<section id="contact" className="min-h-[520px] animate-pulse bg-muted/30" />}>
        <Contact />
      </Suspense>
    </PageShell>
  )
}
