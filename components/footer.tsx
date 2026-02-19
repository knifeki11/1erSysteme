"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function Footer() {
  const { t } = useI18n()

  const footerSections = [
    {
      title: t.footer.solutionsTitle,
      links: [
        { label: t.nav.solutions, href: "#our-solutions" },
        { label: t.nav.products, href: "#products" },
      ],
    },
    {
      title: t.footer.companyTitle,
      links: [
        { label: t.footer.companyLinks.about, href: "#about" },
        { label: t.nav.services, href: "#services" },
        { label: t.nav.references, href: "#references" },
        { label: t.nav.contact, href: "#contact" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border/60 bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#home" className="flex items-center gap-2">
              <Image
                src="/images/Logo.png"
                alt="1erSysteme"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="font-hero text-xl font-semibold tracking-tight text-foreground">
                1erSysteme
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_16px_rgba(0,122,255,0.25)] dark:border-white/15 dark:bg-white/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_16px_rgba(0,122,255,0.25)] dark:border-white/15 dark:bg-white/5"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_16px_rgba(0,122,255,0.25)] dark:border-white/15 dark:bg-white/5"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_16px_rgba(0,122,255,0.25)] dark:border-white/15 dark:bg-white/5"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {t.footer.privacy}
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {t.footer.terms}
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
