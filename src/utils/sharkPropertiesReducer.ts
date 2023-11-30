import {
  SharkPart,
  SharkPartPropertiesKeys,
  sharkPartPropertiesInfo,
} from "../models/Shark"

type SharkPropertiesState = Record<
  SharkPart,
  Record<Partial<SharkPartPropertiesKeys>, number>
>

export type SharkPropertiesAction = {
  type: "UPDATE"
  part: SharkPart
  properties: SharkPartPropertiesKeys
  value: number
}

export const initialStateSharkProperties = Object.fromEntries(
  Object.entries(sharkPartPropertiesInfo).map(([sharkPart, properties]) => [
    sharkPart,
    Object.fromEntries(
      Object.entries(properties).map(([key, value]) => [
        key,
        value.defaultValue,
      ])
    ) as Record<Partial<SharkPartPropertiesKeys>, number>,
  ])
) as SharkPropertiesState

export const sharkPropertiesReducer = (
  state: SharkPropertiesState = initialStateSharkProperties,
  action: SharkPropertiesAction
): SharkPropertiesState => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.part]: {
          ...state[action.part],
          [action.properties]: action.value,
        },
      }
    default:
      return state
  }
}

export default sharkPropertiesReducer
