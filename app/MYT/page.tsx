"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"
import { PageShell } from "@/components/page-shell"
import { HeroBackground } from "@/components/hero-background"
import { TEAM_MEMBERS } from "@/lib/team-data"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"

function TeamCard({
  initials,
  name,
  role,
  imageSrc,
}: {
  initials: string
  name: string
  role: string
  imageSrc?: string | null
}) {
  return (
    <Link
      href={`/MYT/${initials}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-[hsl(var(--accent)_/_0.3)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:hover:border-[hsl(var(--accent)_/_0.4)]"
    >
      <div className="relative aspect-square w-full bg-muted/50 dark:bg-white/5">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-4xl font-bold text-muted-foreground dark:text-white/40"
            aria-hidden
          >
            {initials}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{role}</span>
      </div>
    </Link>
  )
}

export default function MeetYourTeamPage() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const mytPage = t.mytPage as { heroHeadlineLine1?: string; heroHeadlineLine2?: string } | undefined
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
        <div className="relative z-10 w-full px-10 sm:px-16 md:px-20 lg:px-24 pointer-events-none">
          <div className="mx-auto max-w-6xl">
          <h1
            className={cn(
              "font-hero max-w-4xl text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            {mytPage?.heroHeadlineLine1 ?? "Meet your team"}
            <br />
            {mytPage?.heroHeadlineLine2 ?? "The people behind 1er Système."}
          </h1>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <TeamCard
                key={member.initials}
                initials={member.initials}
                name={member.name}
                role={(t as { roles?: Record<string, string> }).roles?.[member.roleKey] ?? member.roleKey}
                imageSrc={member.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
