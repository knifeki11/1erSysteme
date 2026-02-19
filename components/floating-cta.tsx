"use client"

import { useState } from "react"
import { CalendarDays, FileText, X, MessageCircle, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

export function FloatingCTA() {
  const [ctaOpen, setCtaOpen] = useState(true)
  const [socialOpen, setSocialOpen] = useState(false)
  const { t } = useI18n()

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3">
      {/* Social bubble / expanded */}
      {socialOpen ? (
        <div className="glass-card flex items-center gap-3 rounded-2xl p-3 shadow-xl">
          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setSocialOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close social links"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSocialOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground shadow-lg transition-all hover:shadow-xl hover:bg-accent/10 hover:text-accent"
          aria-label="Open social links"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}

      {/* CTA card / bubble */}
      {ctaOpen ? (
        <div className="relative w-72 rounded-2xl p-6 shadow-xl">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-2xl dark:bg-black/80" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-black/10 dark:border-white/10" />
          <button
            type="button"
            onClick={() => setCtaOpen(false)}
            className="absolute top-3 end-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close CTA"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative z-10">
            <p className="font-display text-sm font-semibold text-foreground">{t.floatingCta.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t.floatingCta.description}</p>
            <div className="mt-4 flex flex-col gap-2">
            <Link
              href="#contact"
              className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-all hover:opacity-90"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              {t.floatingCta.scheduleDemo}
            </Link>
            <Link
              href="#contact"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-medium text-foreground transition-all hover:bg-secondary"
            >
              <FileText className="h-3.5 w-3.5" />
              {t.floatingCta.requestQuote}
            </Link>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setCtaOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          aria-label="Open CTA"
        >
          <CalendarDays className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
