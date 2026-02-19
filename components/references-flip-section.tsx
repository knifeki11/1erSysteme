"use client"

import { useState } from "react"
import Image from "next/image"
import { useI18n } from "@/lib/i18n-context"

const LOGO_MAP: Record<string, string> = {
  Paul: "/images/Paul.png",
  Consumar: "/images/Consumar.png",
  OCP: "/images/OCP.png",
  WA: "/images/WA.png",
  WNT: "/images/WNT.png",
  Afriquia: "/images/Afriquia.png",
  AlberoBello: "/images/AlberoBello.jpg",
  Amaya: "/images/Amaya.jpeg",
  AmysGarden: "/images/Amy's Garden.jpeg",
  Arabica: "/images/Arabica.webp",
  Arij: "/images/Arij.jpeg",
  AyoubHair: "/images/AyoubHair.png",
  BikeEatRepeat: "/images/BikeEatRepeat.jpeg",
  CHU: "/images/CHU.png",
  Cafeino: "/images/Cafeino.jpeg",
  CatHouse: "/images/CatHouse.png",
  CenturyClub: "/images/CenturyClub.png",
  Chellah: "/images/Chellah.png",
  ClayOven: "/images/ClayOven.png",
  Crucible: "/images/Crucible.png",
  Damasca: "/images/Damasca.png",
  DarLkbira: "/images/DarLkbira.jpeg",
  DarYamina: "/images/DarYamina.jpeg",
  Djajti: "/images/Djajti.jpeg",
  ElCielo: "/images/El Cielo.png",
  FOSTP: "/images/FOSTP.webp",
  Fratello: "/images/Fratello.jpeg",
  GastroLux: "/images/GastroLux.png",
  Gelato: "/images/Gelato.jpg",
  Havana: "/images/Havana.jpg",
  JackBrel: "/images/JackBrel.jpeg",
  KariaBeachClub: "/images/KariaBeachClub.png",
  Kimbo: "/images/Kimbo.png",
  KukuChicken: "/images/KukuChicken.jpeg",
  KyotoSushi: "/images/KyotoSushi.jpg",
  Lartiste: "/images/L'artiste.jpeg",
  LaDonna: "/images/LaDonna.png",
  LaMaison: "/images/LaMaison.jpeg",
  LaMesaVerde: "/images/LaMesaVerde.png",
  LaPause8: "/images/LaPause8.jpeg",
  LaSymphonie: "/images/LaSymphonie.png",
  LeGatsby: "/images/LeGatsby.png",
  LeJad: "/images/LeJad.jpeg",
  LeMarocain: "/images/LeMarocain.png",
  LeWariss: "/images/LeWariss.jpeg",
  LimeTree: "/images/LimeTree.jpeg",
  Madrid: "/images/Madrid.jpeg",
  MaisonKayser: "/images/MaisonKayser.png",
  MarchicaBella: "/images/MarchicaBella.png",
  NovoClass: "/images/NovoClass.jpeg",
  Ohana: "/images/Ohana.avif",
  PainsEtSaveurs: "/images/PainsEtSaveurs.jpeg",
  PomoDolce: "/images/PomoDolce.png",
  Primo: "/images/Primo.jpeg",
  RedHouse: "/images/RedHouse.png",
  Restolab: "/images/Restolab.png",
  RocaNegra: "/images/RocaNegra.png",
  RoyalKids: "/images/RoyalKids.png",
  SabahCham: "/images/SabahCham.jpeg",
  Sapphire: "/images/Sapphire.png",
  Shiru: "/images/Shiru.png",
  Shoko: "/images/Shoko.png",
  SofiaPalace: "/images/SofiaPalace.png",
  Solyana: "/images/Solyana.png",
  TheCorner: "/images/TheCorner.webp",
  TressForcas: "/images/Tress Forcas.jpeg",
  Trov: "/images/Trov.jpeg",
  TuscanBistro: "/images/TuscanBistro.png",
  Wakame: "/images/Wakame.jpg",
  WeDrinks: "/images/WeDrink's.png",
  WinstonBistro: "/images/WinstonBistro.png",
  Winxo: "/images/Winxo.jpeg",
}

/** Companies that have an actual solution — back shows solution logo; others show 1erSysteme logo only */
const COMPANY_TO_SOLUTION: Record<string, string> = {
  RoyalKids: "QuickPass",
  CHU: "CantiPOS",
  FOSTP: "CantiPOS",
  LaPause8: "SmartClub",
  CenturyClub: "SmartClub",
  Chellah: "QuickPass",
  NourDelice: "Filatt",
  Kenoiserie: "Filatt",
  Contessa: "Filatt",
  California: "QuickPass",
  PlaySport: "CantiPOS",
}

const SOLUTION_LOGO: Record<string, string> = {
  QuickPass: "/images/QuickPass.png",
  CantiPOS: "/images/CantiPos.png",
  SmartClub: "/images/SmartClub.png",
  Filatt: "/images/Filatt.png",
}

const LOGO_1ERSYSTEME = "/images/Logo.png"

type ReferenceCard = {
  companyKey: string
  solution: string
  whatWeDid: string
}

type ReferencesPageContent = {
  label: string
  subtitle: string
  solutionLabel: string
  whatWeDidLabel: string
  cards: ReadonlyArray<ReferenceCard>
}

export function ReferencesFlipSection() {
  const { t } = useI18n()
  const content = (t as { referencesPage?: ReferencesPageContent }).referencesPage
  const cards = content?.cards ?? []
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (cards.length === 0) return null

  return (
    <section id="references-flip" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#040404]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_10%,rgba(0,0,0,0.04),transparent_60%)] dark:bg-[radial-gradient(80%_60%_at_70%_10%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {content?.label}
        </p>
        <p className="font-hero mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {content?.subtitle}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {cards.map((card, index) => {
            const isFlipped = hoveredIndex === index
            const logoSrc = LOGO_MAP[card.companyKey] ?? "/images/Logo.png"
            const isWide = card.companyKey === "WA" || card.companyKey === "WNT"

            return (
              <div
                key={card.companyKey}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setHoveredIndex((i) => (i === index ? null : index))
                  }
                }}
                className="group relative aspect-square w-full min-h-0 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-4"
                style={{ perspective: "1000px" }}
                aria-label={isFlipped ? "Show company logo" : "Show back"}
              >
                <div
                  className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* Front — logo: constrained to card width so wide logos don't overflow */}
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-none border border-border/50 bg-card/80 p-3 shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-sm [backface-visibility:hidden] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.2)] sm:p-4"
                    style={{ transform: "rotateY(0deg)" }}
                  >
                    <Image
                      src={logoSrc}
                      alt={card.companyKey}
                      width={220}
                      height={120}
                      className="max-h-full w-full max-w-full object-contain opacity-90 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  {/* Back — solution logo or 1erSysteme logo only, no text */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-none border border-accent/20 bg-card/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm [backface-visibility:hidden] dark:border-accent/30 dark:bg-slate-900/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.2)]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <Image
                      src={
                        COMPANY_TO_SOLUTION[card.companyKey]
                          ? SOLUTION_LOGO[COMPANY_TO_SOLUTION[card.companyKey]] ?? LOGO_1ERSYSTEME
                          : LOGO_1ERSYSTEME
                      }
                      alt=""
                      width={200}
                      height={120}
                      className="max-h-full w-full max-w-full object-contain opacity-90"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
