import { SharkPropertiesState } from "../contexes/sharkContext"
import {
  SharkPart,
  SharkPartPropertiesKeys,
  sharkPartPropertiesInfo,
} from "../models/Shark"
import { SharkAttack, sharkAttacks, sharkPropertiesRaw } from "./json"

export type SharkPropertiesAction = {
  type: "UPDATE"
  part: SharkPart
  propertyName: SharkPartPropertiesKeys
  value: number
}

export const initialStateSharkProperties = Object.fromEntries(
  Object.entries(sharkPartPropertiesInfo).map(([sharkPart, properties]) => [
    sharkPart,
    {
      properties: Object.fromEntries(
        Object.entries(properties).map(([key, value]) => [
          key,
          value.defaultValue,
        ])
      ) as Record<Partial<SharkPartPropertiesKeys>, number>,
      sharks: [] as string[],
    },
  ])
) as SharkPropertiesState

export const sharkPropertiesReducer = (
  state: SharkPropertiesState = initialStateSharkProperties,
  action: SharkPropertiesAction
): SharkPropertiesState => {
  switch (action.type) {
    case "UPDATE": {
      const newState = {
        ...state,
        [action.part]: {
          ...state[action.part],
          properties: {
            ...state[action.part].properties,
            [action.propertyName]: action.value,
          },
        },
      }
      return {
        ...newState,
        [action.part]: {
          ...newState[action.part],
          sharks: filterSharks(
            sharkAttacks,
            newState[action.part].properties,
            action.part
          ),
        },
      }
    }
    default:
      return state
  }
}

export default sharkPropertiesReducer

function filterSharks(
  sharks: SharkAttack[],
  partProperties: Record<Partial<SharkPartPropertiesKeys>, number>,
  part: SharkPart
) {
  return sharks
    .filter((shark) => filterShark(shark, partProperties, part))
    .map((s) => s.caseNumber)
}

function filterShark(
  shark: SharkAttack,
  partProperties: Record<Partial<SharkPartPropertiesKeys>, number>,
  part: SharkPart
) {
  const sharkInfo = sharkPropertiesRaw[shark.caseNumber]
  if (!sharkInfo) {
    return false
  }
  const sharkPartInfo = sharkInfo[part]
  if (!sharkPartInfo) {
    return false
  }
  for (const [key, value] of Object.entries(partProperties)) {
    const propName = key as SharkPartPropertiesKeys
    const propValue = sharkPartInfo[propName] as number
    const propInfo = sharkPartPropertiesInfo[part][propName]
    if (!propInfo) {
      continue
    }
    if (
      valueIsInRange({
        value,
        target: propValue,
        min: propInfo.min,
        max: propInfo.max,
      })
    ) {
      return true
    }
  }
  return false
}

function valueIsInRange({
  value,
  target,
  min,
  max,
  delta = 0.1,
}: {
  value: number
  target: number
  min: number
  max: number
  delta?: number
}) {
  const dif = (max - min) * delta
  return value >= target - dif && value <= target + dif
}
