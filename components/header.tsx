"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon, Globe, ChevronDown, Menu } from "lucide-react"
import { useI18n, type Locale } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { SOLUTIONS_RING_ORDER } from "@/components/solutions/solutions-ring-data"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

function solutionSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "")
}

export function Header() {
  const pathname = usePathname()
  const isMytPage = pathname?.startsWith("/MYT") ?? false
  const hideDistance: number = 90
  const [inverted, setInverted] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollOffset, setScrollOffset] = useState(0)
  const langRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef(0)
  const { t, locale, setLocale } = useI18n()
  const { theme, toggleTheme } = useTheme()

  const checkOverlap = useCallback(() => {
    const checkY = 40
    const darkSections = document.querySelectorAll<HTMLElement>(
      "[data-header-theme='inverted']"
    )
    let isOverDark = false

    for (const section of darkSections) {
      const rect = section.getBoundingClientRect()
      if (checkY >= rect.top && checkY <= rect.bottom) {
        isOverDark = true
        break
      }
    }

    setInverted(isOverDark)
  }, [])

  useEffect(() => {
    checkOverlap()
    window.addEventListener("scroll", checkOverlap, { passive: true })
    window.addEventListener("resize", checkOverlap)
    return () => {
      window.removeEventListener("scroll", checkOverlap)
      window.removeEventListener("resize", checkOverlap)
    }
  }, [checkOverlap])

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      setScrollOffset((prev) => {
        const next = prev + delta
        return Math.max(0, Math.min(hideDistance, next))
      })

      lastScrollY.current = currentY
    }

    lastScrollY.current = window.scrollY
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false)
      }
      if (solutionsRef.current && !solutionsRef.current.contains(target)) {
        setSolutionsOpen(false)
      }
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        if (servicesCloseTimeoutRef.current) {
          clearTimeout(servicesCloseTimeoutRef.current)
          servicesCloseTimeoutRef.current = null
        }
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.solutions, href: "/solutions" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.products, href: "/products" },
    { label: t.nav.references, href: "/references" },
    { label: t.nav.contact, href: "/contact" },
  ]

  const useInvertedColors = theme === "dark" && inverted
  const textColor = useInvertedColors ? "#ffffff" : undefined
  const mutedTextColor = useInvertedColors ? "rgba(255,255,255,0.7)" : undefined
  const lineColor = useInvertedColors
    ? "rgba(255,255,255,0.2)"
    : theme === "dark"
      ? "rgba(255,255,255,0.2)"
      : "rgba(0,0,0,0.1)"

  const brandName = "1ERSYSTEME"
  const hideProgress = hideDistance === 0 ? 0 : scrollOffset / hideDistance
  const translateY = -hideProgress * hideDistance
  const fade = 1 - hideProgress
  const isHidden = hideProgress >= 1

  return (
    <>
      {/* On team pages: logo only top-left, links to home */}
      {isMytPage && (
        <Link
          href="/"
          aria-label="1erSysteme home"
          className="fixed left-0 top-0 z-50 p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-br-md"
          style={{ right: locale === "ar" ? "0" : "auto", left: locale === "ar" ? "auto" : "0" }}
        >
          <Image
            src="/images/final_logo/Logo%20(2).svg"
            alt="1erSysteme"
            width={80}
            height={80}
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
          />
        </Link>
      )}

      {/* Vertical brand on left edge — hidden on team pages (/MYT/...) and on mobile */}
      {!isMytPage && (
        <div
          className="fixed top-0 z-50 hidden h-screen flex-col items-center md:flex"
          style={{
            left: locale === "ar" ? "auto" : "0",
            right: locale === "ar" ? "0" : "auto",
          }}
        >
          <div className="flex h-full flex-col items-center pl-2 pr-4 pt-2 pb-6 sm:pl-3 sm:pr-5 sm:pt-3">
            <Link href="/" aria-label="1erSysteme home" className="mb-4">
              <Image
                src="/images/final_logo/Logo%20(2).svg"
                alt="1erSysteme"
                width={80}
                height={80}
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
              />
            </Link>
            {/* Vertical line */}
            <div
              className="mb-4 w-px flex-1 transition-colors duration-500"
              style={{ backgroundColor: lineColor }}
            />

            {/* Brand letters stacked vertically */}
            <Link href="/" className="flex flex-col items-center gap-0.5" aria-label="1erSysteme home">
              {brandName.split("").map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className="font-hero text-[11px] font-bold leading-none tracking-widest transition-colors duration-500"
                  style={{ color: textColor }}
                >
                  {!useInvertedColors && <span className="text-foreground">{char}</span>}
                  {useInvertedColors && char}
                </span>
              ))}
            </Link>

            {/* Vertical line */}
            <div
              className="mt-4 w-px flex-1 transition-colors duration-500"
              style={{ backgroundColor: lineColor }}
            />
          </div>
        </div>
      )}

      {/* Top-right navigation */}
      {/* Subtle progressive blur background (behind nav text) */}
      <div
        className="pointer-events-none fixed top-0 z-40 h-16 w-full transition-[transform,opacity] duration-300"
        style={{
          transform: `translateY(${translateY}px)`,
          opacity: fade,
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
          background:
            theme === "dark"
              ? "linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0))"
              : "linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0))",
        }}
      />

      <nav
        className="font-hero fixed top-0 z-50 flex items-center justify-end gap-1 px-4 py-5 transition-[transform,opacity] duration-300 sm:gap-3 sm:px-6 lg:gap-5 lg:px-8"
        style={{
          right: locale === "ar" ? "auto" : "0",
          left: locale === "ar" ? "0" : "auto",
          transform: `translateY(${translateY}px)`,
          opacity: fade,
          pointerEvents: isHidden ? "none" : "auto",
        }}
      >
        {/* Mobile: hamburger opens sheet with full nav */}
        <div className="flex md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              asChild
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: useInvertedColors ? "#fff" : undefined }}
              aria-label={t.nav.menu}
            >
              <button type="button">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side={locale === "ar" ? "left" : "right"}
              className="flex w-[min(85vw,320px)] flex-col gap-6 pt-14 font-hero"
              closeButtonClassName={locale === "ar" ? "left-4 right-auto" : ""}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  if (item.href === "/solutions") {
                    return (
                      <Link
                        key={item.href}
                        href="/solutions"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                      >
                        {item.label}
                      </Link>
                    )
                  }
                  if (item.href === "/services") {
                    return (
                      <div key={item.href} className="flex flex-col gap-1">
                        <Link
                          href="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                        >
                          {item.label}
                        </Link>
                        <div className="pl-4 flex flex-col gap-0.5">
                          <Link
                            href="/services/developpement"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {t.nav.servicesDeveloppement}
                          </Link>
                          <Link
                            href="/services/infrastructure-reseau"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {t.nav.servicesInfrastructure}
                          </Link>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
              <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
                <div className="flex items-center gap-2 rounded-lg px-3 py-2.5">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{locale.toUpperCase()}</span>
                  <div className="flex gap-1">
                    {(["en", "fr", "ar"] as Locale[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => {
                          setLocale(l)
                          setMobileMenuOpen(false)
                        }}
                        className={`rounded px-2 py-1 text-xs ${locale === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                      >
                        {l === "en" ? "EN" : l === "fr" ? "FR" : "AR"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop: full nav bar */}
        <div className="hidden items-center gap-1 sm:gap-3 lg:gap-5 md:flex">
        {navItems.map((item) => {
          const isSolutions = item.href === "/solutions"
          const isServices = item.href === "/services"
          if (isSolutions) {
            return (
              <div
                key={item.href}
                ref={solutionsRef}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-0.5 text-xs font-medium transition-colors duration-500 sm:text-sm"
                  style={{ color: mutedTextColor }}
                >
                  {!useInvertedColors && (
                    <span className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </span>
                  )}
                  {useInvertedColors && item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </Link>
                {solutionsOpen && (
                  <div
                    className="absolute top-full z-50 -mt-1 pt-1 min-w-[14rem] rounded-xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
                    style={{
                      [locale === "ar" ? "left" : "right"]: 0,
                    }}
                    role="menu"
                    aria-label={t.nav.solutions}
                  >
                    <div className="grid grid-cols-2 grid-rows-4 gap-px p-1.5 rounded-[10px] overflow-hidden">
                      {SOLUTIONS_RING_ORDER.map((name) => (
                        <Link
                          key={name}
                          href={`/solutions/${solutionSlug(name)}`}
                          role="menuitem"
                          className="rounded-[6px] px-3 py-2.5 text-center text-xs font-medium text-foreground transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:hover:bg-white/20"
                          onClick={() => setSolutionsOpen(false)}
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          }
          if (isServices) {
            return (
              <div
                key={item.href}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => {
                  if (servicesCloseTimeoutRef.current) {
                    clearTimeout(servicesCloseTimeoutRef.current)
                    servicesCloseTimeoutRef.current = null
                  }
                  setServicesOpen(true)
                }}
                onMouseLeave={() => {
                  servicesCloseTimeoutRef.current = setTimeout(() => {
                    servicesCloseTimeoutRef.current = null
                    setServicesOpen(false)
                  }, 300)
                }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-0.5 text-xs font-medium transition-colors duration-500 sm:text-sm"
                  style={{ color: mutedTextColor }}
                >
                  {!useInvertedColors && (
                    <span className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </span>
                  )}
                  {useInvertedColors && item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </Link>
                {servicesOpen && (
                  <div
                    className="absolute top-full z-50 -mt-2 pt-2 min-w-[14rem] rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-background/95"
                    style={{
                      [locale === "ar" ? "left" : "right"]: 0,
                    }}
                    role="menu"
                    aria-label={t.nav.services}
                    onMouseEnter={() => {
                      if (servicesCloseTimeoutRef.current) {
                        clearTimeout(servicesCloseTimeoutRef.current)
                        servicesCloseTimeoutRef.current = null
                      }
                    }}
                    onMouseLeave={() => {
                      servicesCloseTimeoutRef.current = setTimeout(() => {
                        servicesCloseTimeoutRef.current = null
                        setServicesOpen(false)
                      }, 300)
                    }}
                  >
                    <div className="flex flex-col gap-px p-1.5 rounded-[10px] overflow-hidden">
                      <Link
                        href="/services/developpement"
                        role="menuitem"
                        className="rounded-[6px] px-3 py-2.5 text-left text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        onClick={() => {
                          if (servicesCloseTimeoutRef.current) {
                            clearTimeout(servicesCloseTimeoutRef.current)
                            servicesCloseTimeoutRef.current = null
                          }
                          setServicesOpen(false)
                        }}
                      >
                        {t.nav.servicesDeveloppement}
                      </Link>
                      <Link
                        href="/services/infrastructure-reseau"
                        role="menuitem"
                        className="rounded-[6px] px-3 py-2.5 text-left text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        onClick={() => {
                          if (servicesCloseTimeoutRef.current) {
                            clearTimeout(servicesCloseTimeoutRef.current)
                            servicesCloseTimeoutRef.current = null
                          }
                          setServicesOpen(false)
                        }}
                      >
                        {t.nav.servicesInfrastructure}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium transition-colors duration-500 sm:text-sm"
              style={{ color: mutedTextColor }}
            >
              {!useInvertedColors && (
                <span className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </span>
              )}
              {useInvertedColors && item.label}
            </Link>
          )
        })}

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center transition-colors duration-500"
          style={{ color: mutedTextColor }}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {!useInvertedColors && (
            <span className="text-muted-foreground hover:text-foreground">
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </span>
          )}
          {useInvertedColors &&
            (theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            ))}
        </button>

        {/* Language picker */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className="flex h-8 items-center gap-1 text-xs font-medium transition-colors duration-500 sm:gap-1.5 sm:text-sm"
            style={{ color: mutedTextColor }}
            aria-label="Change language"
          >
            {!useInvertedColors && (
              <span className="flex items-center gap-1 text-muted-foreground hover:text-foreground sm:gap-1.5">
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {locale.toUpperCase()}
              </span>
            )}
            {useInvertedColors && (
              <>
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {locale.toUpperCase()}
              </>
            )}
          </button>
          {langOpen && (
            <div className="absolute end-0 top-full mt-2 w-32 rounded-xl border border-border bg-card p-1 shadow-xl">
              {(["en", "fr", "ar"] as Locale[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLocale(l)
                    setLangOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    locale === l
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {l === "en"
                    ? "English"
                    : l === "fr"
                      ? "Fran\u00e7ais"
                      : "\u0627\u0644\u0639\u0631\u0628\u064a\u0629"}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>
      </nav>
    </>
  )
}
