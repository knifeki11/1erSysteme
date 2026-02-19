import { Suspense } from "react"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { OurSolutions } from "@/components/our-solutions"
import { Services } from "@/components/services"
import { Products } from "@/components/products"
import { References } from "@/components/references"
import { Contact } from "@/components/contact"
import { PageShell } from "@/components/page-shell"

export default function Page() {
  return (
    <PageShell>
      <Hero />
      <References />
      <About />
      <OurSolutions />
      <Services />
      <Products />
      <Suspense fallback={<section id="contact" className="min-h-[50vh]" />}>
        <Contact />
      </Suspense>
    </PageShell>
  )
}
