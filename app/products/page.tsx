"use client"

import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { PageShell } from "@/components/page-shell"
import { HeroBackground } from "@/components/hero-background"
import { ProductsTabsSection } from "@/components/products-tabs-section"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"

export default function ProductsPage() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  useHeroScrollLock(PAGE_HERO_ID)

  return (
    <PageShell>
      <section id={PAGE_HERO_ID} className="relative flex h-screen min-h-0 items-center overflow-hidden" data-header-theme={isDark ? "inverted" : undefined}>
        <HeroBackground />
        {isDark && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[65%]"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
            aria-hidden
          />
        )}
        <div className="relative z-10 w-full px-10 sm:px-16 md:px-20 lg:px-24 pointer-events-none">
          <div className="mx-auto max-w-6xl">
          <h1
            className={`font-hero max-w-4xl text-[clamp(3.3rem,6vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {t.productsPage.heroHeadlineLine1}
            <br />
            {t.productsPage.heroHeadlineLine2}
          </h1>
          </div>
        </div>
      </section>
      <ProductsTabsSection />
    </PageShell>
  )
}
