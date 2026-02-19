"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const getMoroccoTheme = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Casablanca",
        hour: "numeric",
        hour12: false,
      })
      const hour = Number(formatter.format(new Date()))
      return hour >= 19 || hour < 7 ? "dark" : "light"
    }

    const saved = localStorage.getItem("theme") as Theme | null
    if (saved === "dark" || saved === "light") {
      setTheme(saved)
    } else {
      setTheme(getMoroccoTheme())
    }

    const intervalId = window.setInterval(() => {
      const stored = localStorage.getItem("theme") as Theme | null
      if (stored === "dark" || stored === "light") return
      setTheme(getMoroccoTheme())
    }, 5 * 60 * 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
