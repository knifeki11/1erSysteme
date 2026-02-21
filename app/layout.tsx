import React from "react"
import type { Metadata, Viewport } from "next"
import { Saira, Outfit } from "next/font/google"
import { Providers } from "@/components/providers"

import "./globals.css"

const saira = Saira({ subsets: ["latin"], variable: "--font-saira" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

/* Fonts: Saira (titles), Outfit (secondary/body) via next/font. */

export const metadata: Metadata = {
  title: "1erSysteme | Enterprise Technology Solutions",
  description:
    "We design, deploy and maintain critical systems: point of sale, ticketing, access control, RFID, reservations and infrastructure.",
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${saira.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
