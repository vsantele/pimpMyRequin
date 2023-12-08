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
  largeurMuseau: number
}

export type SharkPartPropertiesInfo = {
  max: number
  min: number
  defaultValue: number
  step: number
  label: string
}

export type SharkPartPropertiesKeys = keyof SharkPartProperties

export const sharkPartPropertiesInfo = {
  nez: {
    tailleOeil: {
      min: 1,
      max: 10,
      defaultValue: 5,
      step: 1,
      label: "Taille de l'oeil",
    },
    longueurMuseau: {
      min: 5,
      max: 15,
      defaultValue: 10,
      step: 1,
      label: "Longueur du museau",
    },
    largeurMuseau: {
      min: 2,
      max: 15,
      defaultValue: 10,
      step: 1,
      label: "Largeur du museau",
    },
    epaisseur: {
      min: 1,
      max: 15,
      defaultValue: 5,
      step: 1,
      label: "Épaisseur du museau",
    },
  } as const,
  aileronHaut: {
    longueur: {
      min: 5,
      max: 20,
      defaultValue: 12,
      step: 1,
      label: "Longueur de la nageoire",
    },
    largeur: {
      min: 2,
      max: 10,
      defaultValue: 7,
      step: 1,
      label: "Largeur de la nageoire",
    },
  },
  gueule: {
    tailleDent: {
      min: 1.3,
      max: 5.1,
      defaultValue: 3,
      step: 0.1,
      label: "Taille des dents",
    },
    ecartMachoire: {
      min: 20,
      max: 100,
      defaultValue: 50,
      step: 1,
      label: "Écart de la mâchoire",
    },
  },
  tronc: {
    longueur: {
      min: 2,
      max: 10,
      defaultValue: 6,
      step: 1,
      label: "Longueur du corps",
    },
    largeur: {
      min: 2,
      max: 10,
      defaultValue: 5,
      step: 1,
      label: "Largeur du corps",
    },
    epaisseur: {
      min: 1,
      max: 8,
      defaultValue: 5,
      step: 1,
      label: "Profondeur du corps",
    },
  },
  aileronBas: {
    longueur: {
      min: 5,
      max: 20,
      defaultValue: 12,
      step: 1,
      label: "Longueur de la nageoire",
    },
    largeur: {
      min: 2,
      max: 10,
      defaultValue: 6,
      step: 1,
      label: "Largeur de la nageoire",
    },
  },
  queue: {
    tailleAileron: {
      min: 5,
      max: 20,
      defaultValue: 15,
      step: 1,
      label: "Taille de la nageoire",
    },
    longueur: {
      min: 5,
      max: 30,
      defaultValue: 20,
      step: 1,
      label: "Longueur de la queue",
    },
  },
  aileronArriere: {
    longueur: {
      min: 2,
      max: 6,
      defaultValue: 4,
      step: 1,
      label: "Longueur de la nageoire",
    },
    largeur: {
      min: 1,
      max: 4,
      defaultValue: 2,
      step: 1,
      label: "Largeur de la nageoire",
    },
  },
  bas: {
    longueur: {
      min: 2,
      max: 10,
      defaultValue: 7,
      step: 1,
      label: "Longueur du ventre",
    },
    largeur: {
      min: 2,
      max: 8,
      defaultValue: 6,
      step: 1,
      label: "Largeur du ventre",
    },
    epaisseur: {
      min: 1,
      max: 6,
      defaultValue: 4,
      step: 1,
      label: "Profondeur du ventre",
    },
  },
} as Record<
  SharkPart,
  Partial<{ [K in SharkPartPropertiesKeys]: SharkPartPropertiesInfo }>
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
    case "largeurMuseau":
      return "Largeur du museau"
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

export function getSharkPartName(key: SharkPart) {
  switch (key) {
    case "nez":
      return "Museau"
    case "aileronHaut":
      return "Première nageoire dorsale"
    case "gueule":
      return "Gueule"
    case "tronc":
      return "Corps"
    case "aileronBas":
      return "Nageoire pectorale"
    case "queue":
      return "Nageoire caudale"
    case "aileronArriere":
      return "Deuxième nageoire dorsale"
    case "bas":
      return "Ventre"
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
