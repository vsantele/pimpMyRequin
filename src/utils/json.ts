import sharkPropertiesJson from "../assets/sharksProperties.json"
import sharkAttacksJson from "../assets/sharksAttacks.json"
import { SharkPart, SharkPartPropertiesKeys } from "../models/Shark"

export const sharpPropertyNameToKey = {
  caseNumber: "cn",
  species: "s",
  nez_taille_oeil: "nto",
  nez_longueurMuseau: "nlom",
  nez_largeurMuseau: "nlam",
  nez_epaisseur: "ne",
  gueule_tailleDent: "gtd",
  gueule_ecartMachoire: "gem",
  aileronHaut_longueur: "ahlo",
  aileronHaut_largeur: "ahla",
  tronc_longueur: "tlp",
  tronc_epaisseur: "te",
  tronc_largeur: "tla",
  aileronBas_longueur: "ablo",
  aileronBas_largeur: "abla",
  queue_taille_aileron: "qta",
  queue_longueur: "qlo",
  aileronArriere_longueur: "aalo",
  aileronArriere_largeur: "aala",
  bas_longueur: "blo",
  bas_epaisseur: "be",
  bas_largeur: "bla",
  id: "ID",
} as const

type SharkPropertyName = keyof typeof sharpPropertyNameToKey
export type SharkPropertyKey =
  (typeof sharpPropertyNameToKey)[SharkPropertyName]

export const sharpPropertyKeyToName = Object.entries(
  sharpPropertyNameToKey
).reduce((acc, [key, value]) => {
  acc[value as SharkPropertyKey] = key as SharkPropertyName
  return acc
}, {} as Record<SharkPropertyKey, SharkPropertyName>)

export type SharkPartPropertiesValue = Record<string, number> // key: caseNumber, value: value
export type SharkPartProperties = Record<
  SharkPartPropertiesKeys,
  SharkPartPropertiesValue
>
export type SharkPartSpecies = Record<string, SharkPartProperties>
export type SharkProperties = Record<SharkPart, SharkPartSpecies>

export function getSharkPropertyJson() {
  const sharkProperties = {} as SharkProperties
  sharkPropertiesJson.forEach((sharkProperty) => {
    const species = sharkProperty.s
    const caseNumber = sharkProperty.cn
    Object.entries(sharkProperty).forEach(([key, value]) => {
      if (key === "s" || key === "cn") {
        return
      }
      const propName = sharpPropertyKeyToName[key as SharkPropertyKey]
      if (!propName) {
        console.log("propName not found", key)
        return
      }
      const partName = propName.split("_")[0] as SharkPart
      const property = propName.split("_")[1] as SharkPartPropertiesKeys
      if (!sharkProperties[partName]) {
        sharkProperties[partName] = {} as SharkPartSpecies
      }
      if (!sharkProperties[partName][species]) {
        sharkProperties[partName][species] = {} as SharkPartProperties
      }
      if (!sharkProperties[partName][species][property]) {
        sharkProperties[partName][species][property] =
          {} as SharkPartPropertiesValue
      }
      sharkProperties[partName][species][property][caseNumber] = value as number
    })
  })
  return sharkProperties
}
export type SharkPropertiesRawValue = Record<
  SharkPartPropertiesKeys,
  number | string
>
export type SharkPartPropertiesRaw = Record<SharkPart, SharkPropertiesRawValue>
export type SharkPropertiesRaw = Record<string, SharkPartPropertiesRaw>

function getSharkPropertiesRaw() {
  const sharkProperties = {} as SharkPropertiesRaw
  sharkPropertiesJson.forEach((sharkProperty) => {
    const caseNumber = sharkProperty.cn
    sharkProperties[caseNumber] = {} as SharkPartPropertiesRaw
    const sharkProp = sharkProperties[caseNumber]
    Object.entries(sharkProperty).forEach(([key, value]) => {
      if (key === "cn") {
        return
      }
      const propName = sharpPropertyKeyToName[key as SharkPropertyKey]
      if (!propName) {
        console.log("propName not found", key)
        return
      }
      const partName = propName.split("_")[0] as SharkPart
      const property = propName.split("_")[1] as SharkPartPropertiesKeys
      if (!sharkProp[partName]) {
        sharkProp[partName] = {} as SharkPropertiesRawValue
      }
      sharkProp[partName][property] = value
    })
  })
  return sharkProperties
}

export const sharkProperties = getSharkPropertyJson()

export const sharkPropertiesRaw = getSharkPropertiesRaw()
export const sharkAttacks = sharkAttacksJson

export type SharkAttack = {
  caseNumber: string
  year: string | null
  country: string | null
  area: string | null
  latitude: number
  longitude: number
  species: string
  isFatal: boolean
}
