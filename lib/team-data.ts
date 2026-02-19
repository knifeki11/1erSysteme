/**
 * Team data for Meet Your Team (MYT) page.
 * Add profile image paths, descriptions, and contact details as needed.
 */

export type TeamMemberSocials = {
  linkedin?: string
  twitter?: string
  x?: string
  facebook?: string
  instagram?: string
  /** Add other keys as needed (e.g. github, website) */
  [key: string]: string | undefined
}

/** Role key: use with t.roles[roleKey] for translated label (en/fr/ar). */
export type TeamMemberRoleKey =
  | "directeurGeneral"
  | "responsableTechnique"
  | "cyberSecurity"
  | "assistantManager"
  | "team"

export type TeamMember = {
  initials: string
  name: string
  /** Translation key for role — resolve with t.roles[roleKey] in UI. */
  roleKey: TeamMemberRoleKey
  description?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  socials?: TeamMemberSocials | null
  /** Optional: path to profile image (e.g. /images/team/md.jpg). Add when ready. */
  imageSrc?: string | null
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    initials: "MD",
    name: "Mohammed Daoui",
    roleKey: "directeurGeneral",
    description: null,
    email: "infos@1er-systeme.ma",
    phone: "06 61 24 18 70 · 05 37 37 62 76",
    address: null,
    socials: null,
    imageSrc: "/images/myt/Daoui.png",
  },
  {
    initials: "ML",
    name: "Mohammed Lahlou",
    roleKey: "responsableTechnique",
    description: null,
    email: "infos@1er-systeme.ma",
    phone: "06 60 47 77 47 · 05 37 37 62 76",
    address: null,
    socials: null,
    imageSrc: "/images/myt/Lahlou.png",
  },
  {
    initials: "FC",
    name: "Fahd Chemicha",
    roleKey: "cyberSecurity",
    description: null,
    email: "infos@1er-systeme.ma",
    phone: "06 61 22 03 87 · 05 37 37 62 76",
    address: null,
    socials: null,
    imageSrc: "/images/myt/Fahd.png",
  },
  {
    initials: "KB",
    name: "Khadija Bouargane",
    roleKey: "assistantManager",
    description: null,
    email: "infos@1er-systeme.ma",
    phone: "06 68 70 08 03 · 05 37 37 62 76",
    address: null,
    socials: null,
    imageSrc: "/images/myt/Khadija.png",
  },
  {
    initials: "SEY",
    name: "Soufiane El Yahyaoui",
    roleKey: "team",
    description: null,
    email: null,
    phone: null,
    address: null,
    socials: null,
    imageSrc: null,
  },
  {
    initials: "YEG",
    name: "Yassine El Ghiyam",
    roleKey: "team",
    description: null,
    email: null,
    phone: null,
    address: null,
    socials: null,
    imageSrc: null,
  },
  {
    initials: "AEM",
    name: "Ahmed El Mourabite",
    roleKey: "team",
    description: null,
    email: null,
    phone: null,
    address: null,
    socials: null,
    imageSrc: "/images/myt/Ahmed.png",
  },
]

export function getTeamMemberByInitials(initials: string): TeamMember | undefined {
  const upper = initials.toUpperCase()
  return TEAM_MEMBERS.find((m) => m.initials.toUpperCase() === upper)
}

export function getAllInitials(): string[] {
  return TEAM_MEMBERS.map((m) => m.initials)
}
