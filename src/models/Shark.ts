export type SharkPart =
  | "nez"
  | "aileronHaut"
  | "gueule"
  | "tronc"
  | "aileronBas"
  | "queue"
  | "aileronArriere"
  | "bas"

export interface SharkPartProperties {
  tailleOeil: number
  longueurMuseau: number
  tailleDent: number
  ecartMachoire: number
  longueur: number
  largeur: number
  epaisseur: number
  tailleAileron: number
}

export type SharkPartPropertiesInfo = {
  max: number
  min: number
  defaultValue: number
  step: number
}

export type SharkPartPropertiesKeys = keyof SharkPartProperties

export const sharkPartPropertiesInfo = {
  nez: {
    tailleOeil: { min: 4, max: 10, defaultValue: 5, step: 1 },
    longueurMuseau: { min: 10, max: 15, defaultValue: 5, step: 1 },
  } as const,
  aileronHaut: {
    longueur: { min: 10, max: 20, defaultValue: 15, step: 1 },
    largeur: { min: 5, max: 10, defaultValue: 7, step: 1 },
  },
  gueule: {
    tailleDent: { min: 1.3, max: 5.1, defaultValue: 3, step: 0.1 },
    ecartMachoire: { min: 50, max: 100, defaultValue: 75, step: 1 },
  },
  tronc: {
    longueur: { min: 5, max: 10, defaultValue: 7, step: 1 },
    largeur: { min: 5, max: 10, defaultValue: 7, step: 1 },
    epaisseur: { min: 2, max: 8, defaultValue: 6, step: 1 },
  },
  aileronBas: {
    longueur: { min: 10, max: 20, defaultValue: 15, step: 1 },
    largeur: { min: 5, max: 10, defaultValue: 7, step: 1 },
  },
  queue: {
    tailleAileron: { min: 10, max: 20, defaultValue: 15, step: 1 },
    longueur: { min: 15, max: 30, defaultValue: 23, step: 1 },
  },
  aileronArriere: {
    longueur: { min: 2, max: 6, defaultValue: 4, step: 1 },
    largeur: { min: 1, max: 4, defaultValue: 2, step: 1 },
  },
  bas: {
    longueur: { min: 5, max: 10, defaultValue: 7, step: 1 },
    largeur: { min: 5, max: 8, defaultValue: 6, step: 1 },
    epaisseur: { min: 2, max: 6, defaultValue: 4, step: 1 },
  },
} as const satisfies Record<
  SharkPart,
  Partial<{ [K in keyof SharkPartProperties]: SharkPartPropertiesInfo }>
>

export function getSharkPropertyName(key: keyof SharkPartProperties) {
  switch (key) {
    case "longueur":
      return "Longueur"
    case "largeur":
      return "Largeur"
    case "epaisseur":
      return "Épaisseur"
    case "tailleOeil":
      return "Taille de l'oeil"
    case "longueurMuseau":
      return "Longueur du museau"
    case "tailleDent":
      return "Taille des dents"
    case "ecartMachoire":
      return "Écart de la mâchoire"
    case "tailleAileron":
      return "Taille de l'aileron"
    default:
      return key
  }
}

export type SharkPropertiesPerPart = Record<
  SharkPart,
  keyof SharkPartProperties
>

export interface SharkInfo {
  name: string
  age: number
  species: string
  parts: SharkPart
}

export interface SharkInfo {
  name: string
  age: number
  species: string
}
