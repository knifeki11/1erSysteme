/**
 * Data for ProductsTabsSection: solutions, categories, and products.
 * French labels as fallback. Use i18n (productsPage.categories, productsPage.products) for EN/AR.
 * Categories: Borne, Imprimante, Lecteur, Mobile, Moniteur, POS, Service, Tag, Tourniquet.
 */

export type ProductItem = {
  id: string
  name: string
  imageSrc: string
  description: string
  specs?: string[]
  solutionId: string
  categoryId: string
}

export type SolutionItem = {
  id: string
  name: string
  logoSrc: string
  short: string
  tags: string[]
  productIds: string[]
}

/** Icon key for category card (maps to Lucide icon in UI). */
export type CategoryIconKey =
  | "kiosk"
  | "printer"
  | "scan"
  | "smartphone"
  | "monitor"
  | "credit-card"
  | "wrench"
  | "tag"
  | "door-open"

export type CategoryItem = {
  id: string
  name: string
  logoSrc: string
  /** Category icon key; when set, card shows this icon instead of logoSrc */
  icon: CategoryIconKey
  short: string
  tags: string[]
  productIds: string[]
}

/** Local product images: one path per product (.jpg). Use fallback logo if missing. */
const P = (base: string) => `/images/products/${base}.jpg`

/** All products: real catalog with category and primary solution. Same product can appear in multiple solutions via solution productIds. */
export const PRODUCTS: ProductItem[] = [
  { id: "prod-borne", name: "Borne", imageSrc: P("borne"), description: "Borne libre-service pour impression de tickets, accès ou information.", specs: ["Tactile", "Réseau", "Autonome"], solutionId: "sol-filatt", categoryId: "cat-borne" },
  { id: "prod-imprimante", name: "Imprimante", imageSrc: P("imprimante"), description: "Imprimante thermique reçus ou étiquettes, réseau ou USB.", specs: ["Thermique", "Réseau", "80 mm"], solutionId: "sol-cantipos", categoryId: "cat-imprimante" },
  { id: "prod-imprimante-mobile", name: "Imprimante mobile", imageSrc: P("imprimante-mobile"), description: "Imprimante portable pour reçus et étiquettes sur le terrain.", specs: ["Bluetooth", "Batterie", "Mobile"], solutionId: "sol-distrex", categoryId: "cat-imprimante" },
  { id: "prod-antenne-uhf", name: "Antenne UHF", imageSrc: P("antenne-uhf"), description: "Antenne UHF pour lecture RFID longue distance.", specs: ["UHF", "Longue portée", "Fixation"], solutionId: "sol-tagflow", categoryId: "cat-lecteur" },
  { id: "prod-lecteur", name: "Lecteur", imageSrc: P("lecteur"), description: "Lecteur RFID/NFC pour badges et cartes, contrôle d'accès.", specs: ["USB", "NFC", "Badge"], solutionId: "sol-onetouch", categoryId: "cat-lecteur" },
  { id: "prod-lecteur-uhf", name: "Lecteur UHF", imageSrc: P("lecteur-uhf"), description: "Lecteur UHF pour identification et traçabilité à distance.", specs: ["UHF", "Réseau", "Traçabilité"], solutionId: "sol-tagflow", categoryId: "cat-lecteur" },
  { id: "prod-scanner-uhf", name: "Scanner UHF", imageSrc: P("scanner-uhf"), description: "Scanner UHF portable pour inventaire et lecture de tags.", specs: ["Portable", "UHF", "Inventaire"], solutionId: "sol-tagflow", categoryId: "cat-lecteur" },
  { id: "prod-pda", name: "PDA", imageSrc: P("pda"), description: "Terminal PDA pour terrain, prise de commandes et inventaire.", specs: ["Android", "Rugged", "Réseau"], solutionId: "sol-distrex", categoryId: "cat-mobile" },
  { id: "prod-tablette", name: "Tablette", imageSrc: P("tablette"), description: "Tablette professionnelle pour caisse, commande ou affichage.", specs: ["Tactile", "Wi‑Fi", "Support"], solutionId: "sol-cantipos", categoryId: "cat-mobile" },
  { id: "prod-telephone", name: "Téléphone", imageSrc: P("telephone"), description: "Smartphone professionnel pour applications métier et terrain.", specs: ["Android", "4G", "Apps"], solutionId: "sol-distrex", categoryId: "cat-mobile" },
  { id: "prod-moniteur", name: "Moniteur", imageSrc: P("moniteur"), description: "Écran d'affichage pour poste de travail ou surveillance.", specs: ["Full HD", "HDMI", "Support"], solutionId: "sol-cantipos", categoryId: "cat-moniteur" },
  { id: "prod-caisse", name: "Caisse", imageSrc: P("caisse"), description: "Caisse enregistreuse ou tiroir-caisse pour point de vente.", specs: ["Tiroir", "RS-232/USB", "Sécurisé"], solutionId: "sol-cantipos", categoryId: "cat-pos" },
  { id: "prod-tiroir-caisse", name: "Tiroir-caisse", imageSrc: P("tiroir-caisse"), description: "Tiroir-caisse sécurisé pour espèces, ouverture par impulsion ou logiciel.", specs: ["Ouverture électrique", "Clé de sécurité", "RS-232/USB"], solutionId: "sol-cantipos", categoryId: "cat-pos" },
  { id: "prod-terminal-pos", name: "Terminal POS", imageSrc: P("terminal-pos"), description: "Terminal point de vente tout-en-un, écran tactile et impression intégrée.", specs: ["Écran tactile", "Réseau", "Imprimante intégrée"], solutionId: "sol-cantipos", categoryId: "cat-pos" },
  { id: "prod-alarme", name: "Alarme", imageSrc: P("alarme"), description: "Système d'alarme intrusion et surveillance.", specs: ["Central", "Détection", "SIREN"], solutionId: "sol-onetouch", categoryId: "cat-service" },
  { id: "prod-antenne", name: "Antenne", imageSrc: P("antenne"), description: "Antenne pour communication et couverture RFID.", specs: ["Gain", "Fixation", "Câble"], solutionId: "sol-tagflow", categoryId: "cat-service" },
  { id: "prod-armoire-technique", name: "Armoire technique", imageSrc: P("armoire-technique"), description: "Armoire de brassage et rangement équipements réseau.", specs: ["19\"", "Ventilation", "Câblage"], solutionId: "sol-smartclub", categoryId: "cat-service" },
  { id: "prod-camera", name: "Caméra", imageSrc: P("camera"), description: "Caméra IP pour vidéosurveillance et contrôle d'accès.", specs: ["IP", "HD", "PoE"], solutionId: "sol-onetouch", categoryId: "cat-service" },
  { id: "prod-detecteur-feu", name: "Détecteur de feu", imageSrc: P("detecteur-feu"), description: "Détecteur de fumée et de feu pour sécurité des locaux.", specs: ["Fumée", "Normes", "Alarme"], solutionId: "sol-onetouch", categoryId: "cat-service" },
  { id: "prod-domotique", name: "Domotique", imageSrc: P("domotique"), description: "Équipements domotiques pour automatisation et confort.", specs: ["Pilotage", "Scénarios", "Réseau"], solutionId: "sol-smartclub", categoryId: "cat-service" },
  { id: "prod-interphone", name: "Interphone", imageSrc: P("interphone"), description: "Interphone audio/vidéo pour contrôle d'accès à l'entrée.", specs: ["Vidéo", "Ouverture", "Réseau"], solutionId: "sol-onetouch", categoryId: "cat-service" },
  { id: "prod-materiel-reseau", name: "Matériel réseau", imageSrc: P("materiel-reseau"), description: "Switch, routeur et câblage pour infrastructure réseau.", specs: ["Gigabit", "PoE", "Rack"], solutionId: "sol-smartclub", categoryId: "cat-service" },
  { id: "prod-pointeuse", name: "Pointeuse", imageSrc: P("pointeuse"), description: "Pointeuse badge ou biométrique pour gestion des présences.", specs: ["Badge", "Biométrie", "Réseau"], solutionId: "sol-onetouch", categoryId: "cat-service" },
  { id: "prod-serveur", name: "Serveur", imageSrc: P("serveur"), description: "Serveur local ou NAS pour données et applications.", specs: ["Stockage", "RAID", "Réseau"], solutionId: "sol-smartclub", categoryId: "cat-service" },
  { id: "prod-tv", name: "TV", imageSrc: P("tv"), description: "Écran TV pour affichage d'information ou digital signage.", specs: ["Full HD", "HDMI", "Mur"], solutionId: "sol-smartclub", categoryId: "cat-service" },
  { id: "prod-serrure-digital", name: "Serrure digitale", imageSrc: P("serrure-digital"), description: "Serrure connectée à clavier ou badge pour contrôle d'accès des portes.", specs: ["Clavier", "Badge", "Réseau"], solutionId: "sol-onetouch", categoryId: "cat-service" },
  { id: "prod-controle-acces", name: "Contrôle d'accès", imageSrc: P("controle-acces"), description: "Central ou lecteur pour gestion des accès (badge, biométrie, clavier).", specs: ["Badge", "Réseau", "Central"], solutionId: "sol-onetouch", categoryId: "cat-service" },
  { id: "prod-bracelet", name: "Bracelet", imageSrc: P("bracelet"), description: "Bracelet RFID pour identification et accès.", specs: ["RFID", "Étanche", "Réutilisable"], solutionId: "sol-quickpass", categoryId: "cat-tag" },
  { id: "prod-carte", name: "Carte", imageSrc: P("carte"), description: "Carte RFID/NFC pour accès et fidélité.", specs: ["Mifare", "Personnalisable", "Lot"], solutionId: "sol-onetouch", categoryId: "cat-tag" },
  { id: "prod-tag", name: "Tag", imageSrc: P("tag"), description: "Tag RFID UHF pour traçabilité et inventaire.", specs: ["UHF", "Adhésif", "Réutilisable"], solutionId: "sol-tagflow", categoryId: "cat-tag" },
  { id: "prod-tourniquet", name: "Tourniquet", imageSrc: P("tourniquet"), description: "Tourniquet motorisé pour contrôle d'accès et flux.", specs: ["Motorisé", "Badge/QR", "Sécurisé"], solutionId: "sol-quickpass", categoryId: "cat-tourniquet" },
]

/** All 8 solutions (order matches solutions ring). productIds may repeat across solutions. */
export const SOLUTIONS: SolutionItem[] = [
  {
    id: "sol-rezerto",
    name: "RezerTo",
    logoSrc: "/images/RezerTo.png",
    short: "Réservation et réception pour restaurants multi-établissements. Admin, prise de résa, réception et réservation client.",
    tags: ["Réservations", "Multi-sites", "Réception"],
    productIds: ["prod-caisse", "prod-lecteur", "prod-tablette", "prod-telephone", "prod-imprimante"],
  },
  {
    id: "sol-smartclub",
    name: "SmartClub",
    logoSrc: "/images/SmartClub.png",
    short: "Solution complète (hardware + logiciel) pour transformer votre lieu en espace intelligent. Gestion, facturation, tournois.",
    tags: ["Automatisation", "Facturation", "Tournois"],
    productIds: ["prod-serveur", "prod-camera", "prod-tag", "prod-carte", "prod-bracelet", "prod-pointeuse", "prod-domotique", "prod-tv", "prod-armoire-technique", "prod-materiel-reseau"],
  },
  {
    id: "sol-tagflow",
    name: "TagFlow",
    logoSrc: "/images/TagFlow.png",
    short: "Gestion des flux et des étiquetages. Traçabilité, étiquettes et intégration avec vos systèmes.",
    tags: ["Étiquettes", "Traçabilité", "Intégration"],
    productIds: ["prod-imprimante", "prod-imprimante-mobile", "prod-lecteur", "prod-lecteur-uhf", "prod-scanner-uhf", "prod-antenne-uhf", "prod-antenne", "prod-tag", "prod-carte"],
  },
  {
    id: "sol-cantipos",
    name: "CantiPOS",
    logoSrc: "/images/CantiPos.png",
    short: "Restauration collective, cantines et comptoirs. Gestion des paiements, des ventes et des comptes clients.",
    tags: ["Cantines", "Soldes", "Sans espèces"],
    productIds: ["prod-caisse", "prod-tiroir-caisse", "prod-terminal-pos", "prod-imprimante", "prod-tablette", "prod-lecteur", "prod-moniteur"],
  },
  {
    id: "sol-distrex",
    name: "Distrex",
    logoSrc: "/images/Distrex.png",
    short: "Solution 100 % marocaine pour la force de vente et la distribution. Back-office web et application mobile Android.",
    tags: ["Force de vente", "Distribution", "Mobile"],
    productIds: ["prod-pda", "prod-tablette", "prod-telephone", "prod-imprimante", "prod-imprimante-mobile", "prod-caisse", "prod-terminal-pos"],
  },
  {
    id: "sol-filatt",
    name: "Filatt",
    logoSrc: "/images/Filatt.png",
    short: "Système hybride billets papier et digitaux, rendez-vous et back-office. Bornes d'impression, QR, web et mobile.",
    tags: ["Tickets", "Rendez-vous", "Analytique"],
    productIds: ["prod-borne", "prod-imprimante", "prod-imprimante-mobile", "prod-lecteur", "prod-tag", "prod-carte"],
  },
  {
    id: "sol-onetouch",
    name: "OneTouch",
    logoSrc: "/images/OneTouch.png",
    short: "Accès et contrôle en un toucher. Intégration avec les systèmes d'accès et de gestion des présences.",
    tags: ["Accès", "Contrôle", "Présence"],
    productIds: ["prod-lecteur", "prod-lecteur-uhf", "prod-tag", "prod-carte", "prod-bracelet", "prod-controle-acces", "prod-serrure-digital", "prod-pointeuse", "prod-tourniquet", "prod-interphone", "prod-camera", "prod-alarme", "prod-detecteur-feu"],
  },
  {
    id: "sol-quickpass",
    name: "QuickPass",
    logoSrc: "/images/QuickPass.png",
    short: "Passage rapide et sécurisé. Badge, QR ou mobile pour les contrôles d'accès et la billetterie.",
    tags: ["Accès rapide", "Billetterie", "Sans contact"],
    productIds: ["prod-lecteur", "prod-tag", "prod-carte", "prod-bracelet", "prod-tourniquet", "prod-borne"],
  },
]

/** 9 categories (Borne, Imprimante, Lecteur, Mobile, Moniteur, POS, Service, Tag, Tourniquet). Use i18n for name/short/tags. */
export const CATEGORIES: CategoryItem[] = [
  { id: "cat-borne", name: "Borne", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "kiosk", short: "Bornes libre-service pour tickets, accès ou information.", tags: ["Tactile", "Réseau"], productIds: ["prod-borne"] },
  { id: "cat-imprimante", name: "Imprimante", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "printer", short: "Imprimantes reçus, étiquettes et thermiques, réseau ou mobile.", tags: ["Thermique", "Réseau"], productIds: ["prod-imprimante", "prod-imprimante-mobile"] },
  { id: "cat-lecteur", name: "Lecteur", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "scan", short: "Lecteurs et scanners RFID/NFC/UHF pour badges et traçabilité.", tags: ["RFID", "UHF"], productIds: ["prod-antenne-uhf", "prod-lecteur", "prod-lecteur-uhf", "prod-scanner-uhf"] },
  { id: "cat-mobile", name: "Mobile", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "smartphone", short: "PDA, tablettes et téléphones pour terrain et point de vente.", tags: ["PDA", "Tablette"], productIds: ["prod-pda", "prod-tablette", "prod-telephone"] },
  { id: "cat-moniteur", name: "Moniteur", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "monitor", short: "Écrans et moniteurs pour poste et affichage.", tags: ["Affichage", "HD"], productIds: ["prod-moniteur"] },
  { id: "cat-pos", name: "POS", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "credit-card", short: "Caisses et terminaux pour point de vente.", tags: ["Caisse", "TPV"], productIds: ["prod-caisse", "prod-tiroir-caisse", "prod-terminal-pos"] },
  { id: "cat-service", name: "Service", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "wrench", short: "Alarme, caméra, serveur, réseau, domotique, serrure et contrôle d'accès.", tags: ["Sécurité", "Réseau"], productIds: ["prod-alarme", "prod-antenne", "prod-armoire-technique", "prod-camera", "prod-detecteur-feu", "prod-domotique", "prod-interphone", "prod-materiel-reseau", "prod-pointeuse", "prod-serveur", "prod-tv", "prod-serrure-digital", "prod-controle-acces"] },
  { id: "cat-tag", name: "Tag", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "tag", short: "Tags, cartes et bracelets RFID pour accès et traçabilité.", tags: ["RFID", "Badge"], productIds: ["prod-bracelet", "prod-carte", "prod-tag"] },
  { id: "cat-tourniquet", name: "Tourniquet", logoSrc: "/images/final_logo/Logo%20(2).svg", icon: "door-open", short: "Tourniquets pour contrôle d'accès et gestion des flux.", tags: ["Accès", "Flux"], productIds: ["prod-tourniquet"] },
]

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getCategoryById(id: string): CategoryItem | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

export function getProductsByIds(ids: string[]): ProductItem[] {
  return ids.map((id) => getProductById(id)).filter(Boolean) as ProductItem[]
}
