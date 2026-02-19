"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"

const SolutionsSection3D = dynamic(
  () =>
    import("@/components/solutions/SolutionsSection3D").then((m) => m.SolutionsSection3D),
  {
    ssr: false,
  loading: () => (
        <div className="flex h-[72vh] min-h-[420px] w-full items-center justify-center bg-transparent">
          <span className="text-sm text-muted-foreground">Loading…</span>
        </div>
      ),
  }
)

export function OurSolutions() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  /* Match the 3D ring cube colors: light #f0f0f8, dark #1e1e2e */
  const sectionBg = isDark
    ? "radial-gradient(ellipse 80% 80% at 50% 50%, #1e1e2e, #16162a)"
    : "radial-gradient(ellipse 80% 80% at 50% 50%, #f0f0f8, #e8e8f2)"

  return (
    <section id="our-solutions" className="relative pt-12 sm:pt-16 pb-24 sm:pb-32">
      {/* Same background as the 3D ring — covers entire section */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: sectionBg }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-border/60 pt-6">
          <div className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {t.aboutSolutions.label}
            </p>
            <div className="mt-3 flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-4xl">
                <h2 className="font-hero text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                  {t.aboutSolutions.title}
                </h2>
                <p className="font-hero mt-3 text-sm text-muted-foreground sm:text-base">
                  {t.aboutSolutions.subtitle}
                </p>
              </div>
              <Link
                href="/solutions"
                className="font-hero inline-flex w-fit items-center justify-center rounded-full border border-border/50 bg-transparent px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:border-border/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:self-start"
              >
                {t.aboutSolutions.viewAll}
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Solutions Ring — compact to fit in section; no panel so background is continuous */}
        <div className="mt-12 w-full overflow-hidden">
          <SolutionsSection3D compact embeddable />
        </div>
      </div>
    </section>
  )
}
