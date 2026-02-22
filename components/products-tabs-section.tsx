"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  DoorOpen,
  LayoutGrid,
  Monitor,
  Printer,
  ScanLine,
  Smartphone,
  Tag,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import {
  SOLUTIONS,
  CATEGORIES,
  getProductsByIds,
  getProductById,
  getCategoryById,
  type SolutionItem,
  type CategoryItem,
  type ProductItem,
  type CategoryIconKey,
} from "./products-tabs-data"

const CATEGORY_ICONS: Record<CategoryIconKey, React.ComponentType<{ className?: string }>> = {
  "credit-card": CreditCard,
  "door-open": DoorOpen,
  kiosk: LayoutGrid,
  monitor: Monitor,
  printer: Printer,
  scan: ScanLine,
  smartphone: Smartphone,
  tag: Tag,
  wrench: Wrench,
}

type ProductsTabsLabels = {
  bySolution: string
  byCategory: string
  solutionBadge: string
  categoryBadge: string
  viewProduct: string
  details: string
  close: string
  back: string
  productsUsed: string
  noProductsAssociated: string
  requestQuote: string
  downloadSpecs: string
  productBadge: string
}

const TAB_SOLUTION = "solution"
const TAB_CATEGORY = "category"

// --- Tabs (segmented control) ---
function TabsHeader({
  value,
  onValueChange,
  labels,
}: {
  value: string
  onValueChange: (v: string) => void
  labels: ProductsTabsLabels
}) {
  const indicatorLeft = value === TAB_CATEGORY ? "0%" : "50%"
  return (
    <div
      role="tablist"
      aria-label={labels.byCategory + " / " + labels.bySolution}
      className="relative flex w-full rounded-xl border border-border bg-muted/30 p-1 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.03]"
    >
      <button
        role="tab"
        aria-selected={value === TAB_CATEGORY}
        aria-controls="products-tabpanel-category"
        id="products-tab-category"
        tabIndex={value === TAB_CATEGORY ? 0 : -1}
        onClick={() => onValueChange(TAB_CATEGORY)}
        className={cn(
          "relative z-[1] flex-1 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          value === TAB_CATEGORY
            ? "bg-background text-foreground shadow-[inset_0_0_12px_-2px_hsl(var(--accent)_/_0.08)] ring-1 ring-border dark:bg-white/10 dark:text-white dark:ring-white/10 dark:shadow-[inset_0_0_16px_-4px_hsl(var(--accent)_/_0.06),0_0_20px_-6px_hsl(var(--accent)_/_0.08)]"
            : "opacity-80 text-muted-foreground hover:opacity-100 hover:bg-muted/50 hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white/90"
        )}
      >
        {labels.byCategory}
      </button>
      <button
        role="tab"
        aria-selected={value === TAB_SOLUTION}
        aria-controls="products-tabpanel-solution"
        id="products-tab-solution"
        tabIndex={value === TAB_SOLUTION ? 0 : -1}
        onClick={() => onValueChange(TAB_SOLUTION)}
        className={cn(
          "relative z-[1] flex-1 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          value === TAB_SOLUTION
            ? "bg-background text-foreground shadow-[inset_0_0_12px_-2px_hsl(var(--accent)_/_0.08)] ring-1 ring-border dark:bg-white/10 dark:text-white dark:ring-white/10 dark:shadow-[inset_0_0_16px_-4px_hsl(var(--accent)_/_0.06),0_0_20px_-6px_hsl(var(--accent)_/_0.08)]"
            : "opacity-80 text-muted-foreground hover:opacity-100 hover:bg-muted/50 hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white/90"
        )}
      >
        {labels.bySolution}
      </button>
      {/* Sliding indicator: 2px brand gradient under active tab */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-1/2 rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--accent)_/_0.5)] to-transparent transition-[left] duration-200 ease-out"
        style={{ left: indicatorLeft }}
      />
    </div>
  )
}

const FALLBACK_PRODUCT_IMAGE = "/images/final_logo/Logo%20(2).svg"

type CardDisplay = { name: string; short: string; tags: string[] }
function getCardDisplay(
  item: SolutionItem | CategoryItem,
  tab: string,
  t: { productsPage?: { categories?: Record<string, { name?: string; short?: string; tags?: string[] }> } }
): CardDisplay {
  if (tab === TAB_CATEGORY) {
    const c = t.productsPage?.categories?.[item.id]
    return { name: c?.name ?? item.name, short: c?.short ?? item.short, tags: c?.tags ?? item.tags }
  }
  return { name: item.name, short: item.short, tags: item.tags }
}

function getProductDisplay(
  product: ProductItem,
  t: { productsPage?: { products?: Record<string, { name?: string; description?: string; specs?: string[] }> } }
): { name: string; description: string; specs: string[] } {
  const p = t.productsPage?.products?.[product.id]
  return {
    name: p?.name ?? product.name,
    description: p?.description ?? product.description,
    specs: p?.specs ?? product.specs ?? [],
  }
}

// --- Card (solution or category) ---
type CardItem = (SolutionItem | CategoryItem) & { productIds: string[] }

function ProductCard({
  item,
  display,
  onClick,
}: {
  item: CardItem
  display: CardDisplay
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-border/80 bg-gradient-to-b from-muted/30 to-muted/10 p-6 text-left shadow-sm backdrop-blur-lg transition-all duration-[250ms] hover:scale-[1.02] hover:border-border hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-gradient-to-b dark:from-white/[0.07] dark:to-white/[0.02] dark:shadow-none dark:hover:border-white/15 dark:hover:from-white/[0.1] dark:hover:to-white/[0.04] dark:hover:shadow-[0_0_24px_-4px_hsl(var(--accent)_/_0.06),0_8px_32px_-8px_rgba(0,0,0,0.25)]"
    >
      {/* Top-left subtle highlight */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-24 w-24 rounded-full opacity-40 dark:opacity-30"
        style={{
          background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Hover arrow (top-right) */}
      <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 dark:bg-white/10">
        <ChevronRight className="h-4 w-4 text-foreground/70 dark:text-white/70" />
      </span>

      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-muted/40 shadow-[0_0_12px_-2px_hsl(var(--accent)_/_0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_14px_-2px_hsl(var(--accent)_/_0.08)]">
        {(() => {
          const iconKey = "icon" in item ? (item as CategoryItem).icon : null
          const Icon = iconKey ? CATEGORY_ICONS[iconKey] : null
          if (Icon) return <Icon className="h-5 w-5 text-foreground/80 dark:text-white/80" />
          return (
            <Image
              src={item.logoSrc}
              alt=""
              width={40}
              height={40}
              className="object-contain p-0.5"
            />
          )
        })()}
      </div>
      <h3 className="mt-4 font-bold leading-tight text-foreground">
        {display.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/60 dark:text-white/60">
        {display.short}
      </p>
      {display.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {display.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] text-foreground/70 transition-colors duration-200 group-hover:border-border/80 group-hover:text-foreground/85 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/60 dark:group-hover:border-white/12 dark:group-hover:text-white/75"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}

// --- Product image: one request per product; fallback to logo if 404 ---
function ProductImage({ src, fill, className }: { src: string; fill?: boolean; className?: string }) {
  const [imgSrc, setImgSrc] = useState(src)
  useEffect(() => setImgSrc(src), [src])
  const onError = useCallback(() => setImgSrc(FALLBACK_PRODUCT_IMAGE), [])
  return (
    <Image
      src={imgSrc}
      alt=""
      fill={fill}
      className={className}
      onError={onError}
    />
  )
}

// --- Modal (solution/category name + grid of hardware products) ---
function ProductModal({
  open,
  onOpenChange,
  item,
  tab,
  products,
  onSelectProduct,
  productsUsedLabel,
  noProductsLabel,
  badgeLabel,
  t,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: CardItem | null
  tab: string
  products: ProductItem[]
  onSelectProduct: (product: ProductItem) => void
  productsUsedLabel: string
  noProductsLabel: string
  badgeLabel: string
  t: { productsPage?: { categories?: Record<string, { name?: string; short?: string; tags?: string[] }>; products?: Record<string, { name?: string }> } }
}) {
  if (!item) return null
  const cardDisplay = getCardDisplay(item, tab, t)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[85vh] w-full max-w-[720px] flex-col border border-gray-200/60 bg-white/95 p-0 shadow-2xl shadow-black/[0.06] backdrop-blur-md dark:border-white/10 dark:bg-background/95 dark:shadow-black/20 sm:rounded-2xl data-[state=open]:animate-[product-modal-in_0.25s_ease-out_both] data-[state=closed]:animate-out data-[state=closed]:zoom-out-95"
        closeButtonClassName="right-12 top-12 h-8 w-8 bg-transparent [&>svg]:h-4 [&>svg]:w-4"
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="shrink-0 px-12 pt-12 pb-4">
            <DialogHeader className="space-y-0 border-b border-gray-200/40 pb-6 text-left">
              <span className="inline-block w-fit rounded-full bg-[hsl(var(--accent)_/_0.08)] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--accent))] dark:bg-[hsl(var(--accent)_/_0.08)]">
                {badgeLabel}
              </span>
              <DialogTitle className="mt-5 text-[2rem] font-bold leading-tight tracking-[-0.02em] text-black dark:text-white">
                {cardDisplay.name}
              </DialogTitle>
            </DialogHeader>
            <p className="mt-5 max-w-[75%] text-sm leading-7 text-gray-600 dark:text-gray-400">
              {cardDisplay.short}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-12 pb-12 pt-4">
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {productsUsedLabel}
            </p>

            {products.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {products.map((product, index) => {
                  const productDisplayName = getProductDisplay(product, t).name
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="group flex flex-col items-center rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[hsl(var(--accent)_/_0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/20 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/15 dark:hover:border-[hsl(var(--accent)_/_0.25)] dark:hover:bg-white/[0.08] dark:hover:shadow-xl animate-in fade-in-0 duration-300 [animation-fill-mode:both]"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-6 dark:bg-white/5">
                        <ProductImage
                          src={product.imageSrc}
                          fill
                          className="object-contain object-center p-2"
                        />
                      </div>
                      <span className="mt-4 line-clamp-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {productDisplayName}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {noProductsLabel}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- Drawer (product detail) ---
function ProductDrawer({
  open,
  onOpenChange,
  product,
  onBack,
  backLabel,
  categoryLabel,
  requestQuoteLabel,
  downloadSpecsLabel,
  t,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: ProductItem | null
  onBack?: () => void
  backLabel: string
  categoryLabel: string
  requestQuoteLabel: string
  downloadSpecsLabel: string
  t: { productsPage?: { products?: Record<string, { name?: string; description?: string; specs?: string[] }> } }
}) {
  if (!product) return null
  const { name, description, specs } = getProductDisplay(product, t)
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-full max-w-[520px] flex-col overflow-hidden border-l border-white/10 bg-background p-0 shadow-[-12px_0_40px_-8px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-background"
        closeButtonClassName="right-6 top-6 h-9 w-9 rounded-full border-0 focus:ring-2 focus:ring-[hsl(var(--accent))] focus:ring-offset-2 focus:ring-offset-background"
      >
        {/* Sticky glass header */}
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-black/[0.06] bg-white/75 px-6 py-4 backdrop-blur-[10px] dark:border-white/[0.08] dark:bg-[rgba(10,10,15,0.55)]">
          <div className="flex w-full items-center gap-3 pr-12">
            {onBack && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-9 w-9 shrink-0 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 hover:bg-black/5 dark:hover:bg-white/10"
                aria-label={backLabel}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <span className="rounded-full bg-[hsl(var(--accent)_/_0.12)] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--accent))] dark:bg-[hsl(var(--accent)_/_0.18)]">
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className="product-drawer-in flex flex-1 flex-col overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <SheetTitle className="sr-only">{name}</SheetTitle>

          <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground">
            {name}
          </h2>

          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="my-6 h-px w-full max-w-[60ch] bg-border" />

          {/* Spotlight image card */}
          <div
            className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10"
            style={{
              padding: "26px",
              background: "linear-gradient(180deg, rgba(99,102,241,0.10) 0%, rgba(59,130,246,0.08) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, rgba(59,130,246,0.16), transparent 60%)",
              }}
              aria-hidden
            />
            <div className="absolute inset-[26px]">
              <ProductImage
                src={product.imageSrc}
                fill
                className="object-contain object-center transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </div>
          </div>

          {specs.length > 0 && (
            <ul className="mt-6 space-y-3">
              {specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--accent)_/_0.2)] text-[hsl(var(--accent))]">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="font-medium">{spec}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              className="w-full border border-[rgba(59,130,246,0.35)] bg-primary text-primary-foreground transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.4)] sm:w-auto"
              size="default"
            >
              {requestQuoteLabel}
            </Button>
            <Button className="w-full sm:w-auto" variant="ghost" size="default">
              {downloadSpecsLabel}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// --- Section ---
export function ProductsTabsSection() {
  const { t } = useI18n()
  const tabsLabels = (t.productsPage as { tabs?: ProductsTabsLabels }).tabs ?? {
    bySolution: "Par solution",
    byCategory: "Par catégorie",
    solutionBadge: "Solution",
    categoryBadge: "Catégorie",
    viewProduct: "Voir le produit",
    details: "Détails",
    close: "Fermer",
    back: "Retour",
    productsUsed: "Produits utilisés",
    noProductsAssociated: "Aucun produit associé pour le moment.",
    requestQuote: "Demander un devis",
    downloadSpecs: "Télécharger la fiche",
    productBadge: "Produit",
  }
  const [tab, setTab] = useState(TAB_CATEGORY)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)

  const solutionsAsCards: CardItem[] = SOLUTIONS
  const categoriesAsCards: CardItem[] = CATEGORIES
  const cards = tab === TAB_SOLUTION ? solutionsAsCards : categoriesAsCards

  const modalProducts = selectedCard
    ? getProductsByIds(selectedCard.productIds)
    : []

  const openModal = (item: CardItem) => {
    setSelectedCard(item)
    setSelectedProduct(null)
    setModalOpen(true)
  }

  const openDrawerForProduct = (product: ProductItem) => {
    setSelectedProduct(product)
    setModalOpen(false)
    setDrawerOpen(true)
  }

  const goBackToModal = () => {
    setDrawerOpen(false)
    setModalOpen(true)
  }

  return (
    <section
      id="products-tabs"
      className="relative py-16 sm:py-20"
      aria-labelledby="products-tabs-title"
    >
      {/* Base + subtle radial gradient (center) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4] dark:opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, hsl(var(--accent) / 0.04) 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2
          id="products-tabs-title"
          className="sr-only"
        >
          Produits par solution et par catégorie
        </h2>
        <TabsHeader value={tab} onValueChange={setTab} labels={tabsLabels} />

        {/* Faint divider above grid */}
        <div className="mt-6 border-t border-border/60 dark:border-white/[0.06]" />

        <div
          key={tab}
          role="tabpanel"
          id={tab === TAB_SOLUTION ? "products-tabpanel-solution" : "products-tabpanel-category"}
          aria-labelledby={tab === TAB_SOLUTION ? "products-tab-solution" : "products-tab-category"}
          className="mt-6 grid grid-cols-1 gap-6 animate-in fade-in-0 duration-300 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              display={getCardDisplay(item, tab, t)}
              onClick={() => openModal(item)}
            />
          ))}
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        item={selectedCard}
        tab={tab}
        products={modalProducts}
        onSelectProduct={openDrawerForProduct}
        productsUsedLabel={tabsLabels.productsUsed}
        noProductsLabel={tabsLabels.noProductsAssociated}
        badgeLabel={tab === TAB_SOLUTION ? tabsLabels.solutionBadge : tabsLabels.categoryBadge}
        t={t}
      />

      <ProductDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        product={selectedProduct}
        onBack={goBackToModal}
        backLabel={tabsLabels.back}
        categoryLabel={
          selectedProduct
            ? ((t.productsPage as { categories?: Record<string, { name?: string }> })?.categories?.[getCategoryById(selectedProduct.categoryId)?.id ?? ""]?.name ??
               getCategoryById(selectedProduct.categoryId)?.name ??
               tabsLabels.productBadge)
            : ""
        }
        requestQuoteLabel={tabsLabels.requestQuote}
        downloadSpecsLabel={tabsLabels.downloadSpecs}
        t={t}
      />
    </section>
  )
}
