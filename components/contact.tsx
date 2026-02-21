"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

type ContactForm = {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
  firstNamePlaceholder: string
  lastNamePlaceholder: string
  emailPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  companyPlaceholder: string
  messagePlaceholder: string
  submit: string
  solutionLabel: string
  solutionPlaceholder: string
  solutionOptions: ReadonlyArray<string>
  sectorLabel: string
  sectorPlaceholder: string
  sectorOptions: ReadonlyArray<string>
  successMessage: string
}

type ContactSection = {
  label: string
  infoTitle: string
  email: string
  emailValue: string
  phone: string
  phoneValue: string
  office: string
  officeValue: string
  socials: Record<string, string>
  form: ContactForm
}

export function Contact() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const contact = t.contact as unknown as ContactSection
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const successTimeoutRef = useRef<number | null>(null)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    solution: "",
    sector: "",
    message: "",
  })
  const socials = [
    { key: "linkedin", icon: Linkedin },
    { key: "twitter", icon: Twitter },
    { key: "facebook", icon: Facebook },
    { key: "instagram", icon: Instagram },
  ] as const

  useEffect(() => {
    const selected = (searchParams.get("solution") || "").trim()
    if (!selected) return
    if (!contact.form.solutionOptions.includes(selected)) return
    setFormValues((prev) => (prev.solution === selected ? prev : { ...prev, solution: selected }))
  }, [searchParams, contact.form.solutionOptions])

  return (
    <section id="contact" className="relative bg-slate-50 py-24 text-foreground sm:py-32 dark:bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-border/30 to-transparent dark:from-border/20" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/5 shadow-xl shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20 dark:shadow-black/30">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70 blur-0 dark:opacity-55 bg-[url('/images/Hero_BG_Light.png')] dark:bg-[url('/images/Hero_BG.png')]"
          />
          <div className="absolute inset-0 bg-white/20 dark:bg-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_50%,transparent_10%,rgba(0,0,0,0.18)_70%)] dark:bg-[radial-gradient(80%_70%_at_50%_50%,transparent_10%,rgba(0,0,0,0.45)_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,122,255,0.12),transparent_55%)]" />

          <div className="relative z-10 min-h-[520px] px-8 py-10 text-foreground sm:px-10 sm:py-12 lg:min-h-[560px] lg:px-12 lg:py-14 dark:text-white">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/70 dark:text-white/70">
              <Image
                src="/images/Logo.png"
                alt="1erSysteme"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <span className="h-5 w-px bg-accent/50" aria-hidden="true" />
              <span>{contact.label}</span>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60 dark:text-white/60">
                  {contact.infoTitle}
                </p>
                <div className="mt-6 flex flex-col gap-5">
                  <div className="group flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 ring-1 ring-foreground/10 transition-all duration-200 group-hover:ring-accent/40 group-hover:shadow-[0_0_18px_rgba(0,122,255,0.2)] dark:bg-white/5 dark:ring-white/10">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground dark:text-white">{contact.email}</p>
                      <p className="text-sm text-foreground/70 dark:text-white/70">{contact.emailValue}</p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 ring-1 ring-foreground/10 transition-all duration-200 group-hover:ring-accent/40 group-hover:shadow-[0_0_18px_rgba(0,122,255,0.2)] dark:bg-white/5 dark:ring-white/10">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground dark:text-white">{contact.phone}</p>
                      <p className="text-sm text-foreground/70 dark:text-white/70">{contact.phoneValue}</p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 ring-1 ring-foreground/10 transition-all duration-200 group-hover:ring-accent/40 group-hover:shadow-[0_0_18px_rgba(0,122,255,0.2)] dark:bg-white/5 dark:ring-white/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground dark:text-white">{contact.office}</p>
                      <p className="text-sm text-foreground/70 dark:text-white/70">{contact.officeValue}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  {socials.map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      aria-label={contact.socials[key]}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition-all duration-200 hover:border-accent/40 hover:text-accent hover:shadow-[0_0_16px_rgba(0,122,255,0.25)] dark:border-white/15 dark:text-white/70"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:border-l lg:border-black/10 lg:pl-10 dark:lg:border-white/10">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={async (event) => {
                    event.preventDefault()
                    if (isSubmitting) return
                    setIsSubmitting(true)
                    try {
                      const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formValues),
                      })
                      if (!response.ok) {
                        throw new Error("Failed to send message.")
                      }
                      setFormValues({ name: "", email: "", phone: "", solution: "", sector: "", message: "" })
                      if (successTimeoutRef.current) {
                        window.clearTimeout(successTimeoutRef.current)
                      }
                      setShowSuccess(true)
                      successTimeoutRef.current = window.setTimeout(() => {
                        setShowSuccess(false)
                        successTimeoutRef.current = null
                      }, 3000)
                    } finally {
                      setIsSubmitting(false)
                    }
                  }}
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-2 block text-xs font-medium text-foreground/60 dark:text-white/60">
                        {contact.form.firstName}
                        <span className="ml-1 text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formValues.name}
                        onChange={(event) =>
                          setFormValues((prev) => ({ ...prev, name: event.target.value }))
                        }
                        required
                        className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-200 focus:border-accent focus:outline-none dark:border-white/25 dark:text-white dark:placeholder:text-white/40"
                        placeholder={contact.form.firstNamePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact" className="mb-2 block text-xs font-medium text-foreground/60 dark:text-white/60">
                        {contact.form.email}
                      </label>
                      <input
                        type="email"
                        id="contact"
                        value={formValues.email}
                        onChange={(event) =>
                          setFormValues((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-200 focus:border-accent focus:outline-none dark:border-white/25 dark:text-white dark:placeholder:text-white/40"
                        placeholder={contact.form.emailPlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-medium text-foreground/60 dark:text-white/60">
                      {contact.form.phoneLabel}
                      <span className="ml-1 text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formValues.phone}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, phone: event.target.value }))
                      }
                      required
                      className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-200 focus:border-accent focus:outline-none dark:border-white/25 dark:text-white dark:placeholder:text-white/40"
                      placeholder={contact.form.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="solution" className="mb-2 block text-xs font-medium text-foreground/60 dark:text-white/60">
                      {contact.form.solutionLabel}
                    </label>
                    <select
                      id="solution"
                      value={formValues.solution}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, solution: event.target.value }))
                      }
                      className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground transition-colors duration-200 focus:border-accent focus:outline-none dark:border-white/25 dark:text-white"
                    >
                      <option value="">{contact.form.solutionPlaceholder}</option>
                      {contact.form.solutionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sector" className="mb-2 block text-xs font-medium text-foreground/60 dark:text-white/60">
                      {contact.form.sectorLabel}
                    </label>
                    <select
                      id="sector"
                      value={formValues.sector}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, sector: event.target.value }))
                      }
                      className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground transition-colors duration-200 focus:border-accent focus:outline-none dark:border-white/25 dark:text-white"
                    >
                      <option value="">{contact.form.sectorPlaceholder}</option>
                      {contact.form.sectorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-xs font-medium text-foreground/60 dark:text-white/60">
                      {contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formValues.message}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, message: event.target.value }))
                      }
                      className="w-full resize-none border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-200 focus:border-accent focus:outline-none dark:border-white/25 dark:text-white dark:placeholder:text-white/40"
                      placeholder={contact.form.messagePlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex w-fit self-end items-center rounded-full border border-foreground/10 bg-foreground/5 px-6 py-3 text-sm font-medium text-accent transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_16px_rgba(0,122,255,0.25)] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-white/5"
                  >
                    {contact.form.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div
          className="fixed bottom-6 left-6 z-50 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm text-foreground/80 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/15 dark:bg-white/5 dark:text-white/80"
          role="status"
          aria-live="polite"
        >
          {contact.form.successMessage}
        </div>
      )}
    </section>
  )
}
