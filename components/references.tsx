"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n-context"

type ReferencesSection = {
  label: string
  title: string
  subtitle: string
  supportLine: string
  testimonials: {
    t1: { quote: string; author: string; role: string }
    t2: { quote: string; author: string; role: string }
    t3: { quote: string; author: string; role: string }
  }
}

const logos = [
  { src: "/images/Paul.png", alt: "Paul" },
  { src: "/images/Consumar.png", alt: "Consumar" },
  { src: "/images/OCP.png", alt: "OCP" },
  { src: "/images/WA.png", alt: "WA" },
  { src: "/images/WNT.png", alt: "WNT" },
]

export function References() {
  const { t } = useI18n()
  const references = t.references as unknown as ReferencesSection

  return (
    <section id="references" className="relative py-24 sm:py-28">
      {/* Subtle background separation */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#f7f7f7]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(0,0,0,0.04),transparent_60%)]" />
        <div className="absolute inset-0 hidden dark:block bg-[#050505]" />
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {references.label}
          </p>
          <h2 className="font-hero mt-3 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            {references.title}
          </h2>
          <p className="font-hero mt-3 text-sm text-muted-foreground sm:text-base">
            {references.subtitle}
          </p>
        </div>

        {/* Logo band */}
        <div className="mt-8 border-y border-border/50 py-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {logos.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center">
                <div
                  tabIndex={0}
                  role="img"
                  aria-label={logo.alt}
                  className="group flex h-16 w-full items-center justify-center rounded-md border border-transparent px-4 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={240}
                    height={80}
                    className={`object-contain opacity-100 transition-all duration-200 group-hover:-translate-y-0.5 group-focus-visible:opacity-100 motion-reduce:transition-none ${
                      logo.alt === "WA" || logo.alt === "WNT"
                        ? "h-24 w-auto max-w-[340px]"
                        : "h-14 w-auto max-w-[220px]"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {references.supportLine}
        </p>

      </div>
    </section>
  )
}
