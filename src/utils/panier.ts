import { SharkPart } from "../models/Shark"

export function panierMerged(panier: Record<SharkPart, string | null>) {
  return Object.entries(panier).reduce((acc, [part, specie]) => {
    if (specie === null) return acc
    return {
      ...acc,
      [specie]: [...(acc[specie] || []), part as SharkPart],
    }
  }, {} as Record<string, SharkPart[]>)
}
