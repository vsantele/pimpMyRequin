export const sharpPropertyNameToKey = {
  shark: "species",
  nez_taille_oeil: "nto",
  nez_longueur_museau: "nlom",
  nez_largeur_museau: "nlam",
  nez_epaisseur: "ne",
  gueule_taille_dent: "gtd",
  gueule_ecart_machoire: "gem",
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

function getSharkPropertyJson() {
  const sharkPropertyJson = require("../data/sharkProperty.json")
  return sharkPropertyJson
}
