"use client"

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { en } from "@/lib/translations/en"
import { fr } from "@/lib/translations/fr"
import { ar } from "@/lib/translations/ar"

export type Locale = "en" | "fr" | "ar"

export type Translations = typeof en

const translationsMap: Record<Locale, Translations> = { en, fr, ar }

const defaultLocale: Locale = "en"

/** Client-only locale store. Server and initial client render use getServerSnapshot ("en"). */
const localeStore = {
  value: defaultLocale as Locale,
  listeners: new Set<() => void>(),

  getSnapshot(): Locale {
    return this.value
  },

  getServerSnapshot(): Locale {
    return defaultLocale
  },

  subscribe(cb: () => void): () => void {
    this.listeners.add(cb)
    return () => {
      this.listeners.delete(cb)
    }
  },

  setLocale(l: Locale) {
    if (this.value === l) return
    this.value = l
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", l)
    }
    this.listeners.forEach((fn) => fn())
  },
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const subscribe = (cb: () => void) => localeStore.subscribe(cb)
const getSnapshot = () => localeStore.getSnapshot()
const getServerSnapshot = () => localeStore.getServerSnapshot()

export function I18nProvider({ children }: { children: ReactNode }) {
  const localeFromStore = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [hasMounted, setHasMounted] = useState(false)

  const setLocale = useCallback((l: Locale) => {
    localeStore.setLocale(l)
  }, [])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted) return
    const saved = localStorage.getItem("locale") as Locale | null
    if (saved && translationsMap[saved]) {
      localeStore.setLocale(saved)
    }
  }, [hasMounted])

  // Use defaultLocale until after mount so server and first client render match (avoids hydration mismatch)
  const locale = hasMounted ? localeFromStore : defaultLocale

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
  }, [locale])

  const dir = locale === "ar" ? "rtl" : "ltr"
  const t = translationsMap[locale]

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
