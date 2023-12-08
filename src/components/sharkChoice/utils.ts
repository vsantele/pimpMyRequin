import { SharkPart, SharkPartPropertiesKeys } from "../../models/Shark"
import { sharkAttacks, sharkProperties } from "../../utils/json"

export function getSpecies(
  sharkIds: string[]
): { species: string; corr: number }[] {
  const speciesCount = sharkAttacks.reduce((acc, curr) => {
    const species = curr.species
    if (acc[species]) {
      acc[species]++
    } else {
      acc[species] = 1
    }
    return acc
  }, {} as { [key: string]: number })
  const selectedSpeciesCount = sharkIds.reduce((acc, curr) => {
    const species = sharkAttacks.find(
      (shark) => shark.caseNumber === curr
    )?.species
    if (species) {
      if (acc[species]) {
        acc[species]++
      } else {
        acc[species] = 1
      }
    }
    return acc
  }, {} as { [key: string]: number })
  return [
    ...new Set(
      sharkIds
        .map((id) => {
          const shark = sharkAttacks.find((shark) => shark.caseNumber === id)
          return shark?.species
        })
        .filter((species) => species !== undefined) as string[]
    ),
  ]
    .map((s) => ({
      species: s,
      corr: selectedSpeciesCount[s] / speciesCount[s],
    }))
    .sort((a, b) => b.corr - a.corr)
}

export function getSharkData(selectedPart: SharkPart, sharkName: string) {
  const data = sharkProperties[selectedPart][sharkName]
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key as SharkPartPropertiesKeys] = Object.values(value)
    return acc
  }, {} as Record<Partial<SharkPartPropertiesKeys>, number[]>)
}

export function filterForSpecie(sharkIds: string[], species: string): string[] {
  return sharkIds.filter(
    (sharkId) =>
      sharkAttacks.find((shark) => shark.caseNumber === sharkId)?.species ===
      species
  )
}
