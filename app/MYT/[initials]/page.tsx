"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { useState, useCallback } from "react"
import { useTheme } from "@/lib/theme-context"
import { PageShell } from "@/components/page-shell"
import { HeroBackground } from "@/components/hero-background"
import { getTeamMemberByInitials } from "@/lib/team-data"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ExternalLink,
  Copy,
  Check,
  UserPlus,
} from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"

const SITE_LINKS = [
  { key: "solutions" as const, href: "/solutions" },
  { key: "products" as const, href: "/products" },
  { key: "references" as const, href: "/references" },
  { key: "contact" as const, href: "/#contact" },
]

function parsePhones(phoneStr: string | null | undefined): { value: string; isLandline: boolean }[] {
  if (!phoneStr?.trim()) return []
  return phoneStr
    .trim()
    .split(/\s*·\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((value, i, arr) => ({ value, isLandline: arr.length > 1 && i > 0 }))
}

export default function TeamMemberPage() {
  const params = useParams()
  const initials = typeof params.initials === "string" ? params.initials : ""
  const member = getTeamMemberByInitials(initials)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { t } = useI18n()
  const myt = t.mytPage as {
    email?: string
    phone?: string
    mobile?: string
    landline?: string
    address?: string
    socials?: string
    quickLinks?: string
    contactCta?: string
    addToContacts?: string
    about?: string
    copyToClipboard?: string
    copied?: string
  }
  const emailLabel = myt?.email ?? "Email"
  const phoneLabel = myt?.phone ?? "Phone"
  const mobileLabel = myt?.mobile ?? "Mobile"
  const landlineLabel = myt?.landline ?? "Landline"
  const addressLabel = myt?.address ?? "Address"
  const socialsLabel = myt?.socials ?? "Socials"
  const quickLinksLabel = myt?.quickLinks ?? "Quick links"
  const contactCta = myt?.contactCta ?? "Contact"
  const addToContacts = myt?.addToContacts ?? "Add to contacts"
  const aboutLabel = myt?.about ?? "About"
  const copyLabel = myt?.copyToClipboard ?? "Copy"
  const copiedLabel = myt?.copied ?? "Copied"

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }, [])

  if (!member) notFound()

  const hasContact =
    member.email?.trim() || member.phone?.trim() || member.address?.trim()
  const socialsMap = member.socials ?? {}
  const getSocialUrl = (key: string) => {
    const v = socialsMap[key]
    return v && typeof v === "string" && v.trim() ? v.trim() : null
  }
  const SOCIAL_KEYS = [
    { key: "linkedin", label: "LinkedIn", hoverClass: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]" },
    { key: "x", label: "X (Twitter)", hoverClass: "hover:bg-foreground hover:text-background hover:border-foreground" },
    { key: "facebook", label: "Facebook", hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" },
    { key: "instagram", label: "Instagram", hoverClass: "hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]" },
  ] as const

  const phones = parsePhones(member.phone)
  const primaryEmail = member.email?.trim() ?? null
  const primaryContactHref = primaryEmail
    ? `mailto:${primaryEmail}`
    : phones[0]
      ? `tel:${phones[0].value.replace(/\s/g, "")}`
      : "/#contact"

  const tapTarget = "min-h-[44px] min-w-[44px]"
  useHeroScrollLock(PAGE_HERO_ID)

  return (
    <PageShell>
      <TooltipProvider delayDuration={300}>
        {/* Hero with same background as home: Spline + dark-only left overlay */}
        <section
          id={PAGE_HERO_ID}
          className={cn(
            "relative flex h-screen min-h-0 flex-col items-center justify-center overflow-hidden pt-20 pb-10 sm:pb-12 md:pb-14"
          )}
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
          <div className="relative z-10 mx-auto w-full max-w-md px-4 sm:px-6 md:max-w-lg md:px-8 pointer-events-none">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center">
              {/* Avatar 72–96px, gradient or brand tint (not pure blue) */}
              <div
                className={cn(
                  "relative h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-md ring-2 sm:h-[96px] sm:w-[96px]",
                  isDark ? "ring-white/20 dark:ring-background" : "ring-slate-300"
                )}
              >
                {member.imageSrc ? (
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="96px"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-2xl font-bold text-white sm:text-3xl"
                    style={{
                      background: isDark
                        ? "linear-gradient(145deg, hsl(220 15% 28%) 0%, hsl(220 12% 18%) 100%)"
                        : "linear-gradient(145deg, hsl(220 10% 42%) 0%, hsl(220 8% 32%) 100%)",
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    aria-hidden
                  >
                    {member.initials}
                  </div>
                )}
              </div>

              <h1 className={cn(
                "mt-5 text-2xl font-semibold tracking-tight sm:text-3xl",
                isDark ? "text-white" : "text-slate-900"
              )}>
                {member.name}
              </h1>
              <p className={cn(
                "mt-1.5 text-sm sm:text-base",
                isDark ? "text-white/85" : "text-slate-700"
              )}>
                {(t as { roles?: Record<string, string> }).roles?.[member.roleKey] ?? member.roleKey}
              </p>
              <span className={cn(
                "mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider",
                isDark ? "bg-white/15 text-white/90" : "bg-slate-200/80 text-slate-900"
              )}>
                1er Système
              </span>

              {/* Primary: Contact — black, blue on hover */}
              <a
                href={primaryContactHref}
                className={cn(
                  "mt-6 w-full max-w-xs rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-sm",
                  "bg-black transition-colors hover:bg-[hsl(var(--accent))] active:scale-[0.98]",
                  "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                )}
              >
                {contactCta}
              </a>
              <button
                type="button"
                className={cn(
                  "mt-3 w-full max-w-xs rounded-xl px-5 py-3.5 text-sm font-medium backdrop-blur-sm",
                  "transition-colors active:scale-[0.98]",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
                  isDark
                    ? "border border-white/30 bg-white/10 text-white hover:bg-white/20 focus:ring-white/50"
                    : "border border-slate-300 bg-slate-100/80 text-slate-900 hover:bg-slate-200/80 focus:ring-slate-400"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  {addToContacts}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Contact card: below hero, clean rows, entire row tappable, copy on icon tap */}
        <section className="px-4 pb-8 sm:px-6 sm:pb-10 md:px-8">
          <div className="mx-auto max-w-md md:max-w-lg">
            {hasContact && (
              <div
                className={cn(
                  "rounded-2xl border border-border bg-card shadow-sm dark:border-white/10",
                  "overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
                  "mb-8"
                )}
                style={{ animationDelay: "80ms" }}
              >
                <div className="divide-y divide-border dark:divide-white/10">
                  {primaryEmail && (
                    <ContactRow
                      icon={<Mail className="h-5 w-5" />}
                      label={emailLabel}
                      value={primaryEmail}
                      href={`mailto:${primaryEmail}`}
                      copiedId={copiedId}
                      copyId="email"
                      onCopy={() => copyToClipboard(primaryEmail, "email")}
                      copyLabel={copyLabel}
                      copiedLabel={copiedLabel}
                      tapTarget={tapTarget}
                    />
                  )}
                  {phones.map(({ value, isLandline }, i) => {
                    const id = `phone-${i}`
                    const label = phones.length > 1 ? (isLandline ? landlineLabel : mobileLabel) : phoneLabel
                    return (
                      <ContactRow
                        key={id}
                        icon={<Phone className="h-5 w-5" />}
                        label={label}
                        value={value}
                        href={`tel:${value.replace(/\s/g, "")}`}
                        copiedId={copiedId}
                        copyId={id}
                        onCopy={() => copyToClipboard(value, id)}
                        copyLabel={copyLabel}
                        copiedLabel={copiedLabel}
                        tapTarget={tapTarget}
                      />
                    )
                  })}
                  {member.address?.trim() && (
                    <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground dark:bg-white/10">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {addressLabel}
                        </span>
                        <p className="mt-0.5 text-sm text-foreground">{member.address.trim()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bio / About — comfortable width, line-height */}
            <div
              className={cn(
                "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
                "mb-8"
              )}
              style={{ animationDelay: "120ms" }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {aboutLabel}
              </h2>
              <div className="max-w-[65ch]">
                {member.description ? (
                  <div className="space-y-3 text-[1rem] leading-relaxed text-foreground">
                    {member.description.split(/\n\n+/).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-sm">
                    Description can be added in team data.
                  </p>
                )}
              </div>
            </div>

            {/* Socials — 44px min, even spacing, subtle bg */}
            <div
              className={cn(
                "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
                "mb-10"
              )}
              style={{ animationDelay: "160ms" }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                {socialsLabel}
              </span>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_KEYS.map(({ key, label, hoverClass }) => {
                  const url = getSocialUrl(key) ?? getSocialUrl(key === "x" ? "twitter" : key)
                  const Icon =
                    key === "linkedin"
                      ? Linkedin
                      : key === "x"
                        ? Twitter
                        : key === "facebook"
                          ? Facebook
                          : Instagram
                  const baseClass = cn(
                    "flex items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition-all active:scale-95 dark:border-white/10 dark:bg-white/5",
                    "min-h-[44px] min-w-[44px] h-11 w-11",
                    hoverClass
                  )
                  if (url) {
                    return (
                      <Tooltip key={key}>
                        <TooltipTrigger asChild>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={baseClass}
                            aria-label={label}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>{label}</TooltipContent>
                      </Tooltip>
                    )
                  }
                  return (
                    <Tooltip key={key}>
                      <TooltipTrigger asChild>
                        <span
                          className={cn(baseClass, "opacity-40 cursor-default")}
                          aria-label={`${label} (not set)`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{label} (not set)</TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </div>

            {/* Quick links — thumb-friendly */}
            <div className="border-t border-border pt-6 dark:border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                {quickLinksLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {SITE_LINKS.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium text-foreground",
                      "transition-colors hover:bg-muted active:scale-[0.98]",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      "dark:bg-white/10 dark:hover:bg-white/15"
                    )}
                  >
                    {t.nav[key]}
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </TooltipProvider>
    </PageShell>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
  copiedId,
  copyId,
  onCopy,
  copyLabel,
  copiedLabel,
  tapTarget,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  copiedId: string | null
  copyId: string
  onCopy: () => void
  copyLabel: string
  copiedLabel: string
  tapTarget: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground dark:bg-white/10">
        {icon}
      </span>
      <a
        href={href}
        className="min-w-0 flex-1 text-left transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md py-1 -my-1"
      >
        <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-foreground">{value}</span>
      </a>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onCopy()
            }}
            className={cn(
              "shrink-0 rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              tapTarget
            )}
            aria-label={copiedId === copyId ? copiedLabel : copyLabel}
          >
            {copiedId === copyId ? (
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>{copiedId === copyId ? copiedLabel : copyLabel}</TooltipContent>
      </Tooltip>
    </div>
  )
}
