import { useSharkContext } from "../../contexes/sharkContext"
import {
  SharkPart,
  SharkPartPropertiesKeys,
  sharkPartPropertiesInfo,
} from "../../models/Shark"
import Slider from "./slider"

interface Props {
  selectedPart: SharkPart
  onChange?: (
    part: SharkPart,
    properties: SharkPartPropertiesKeys,
    value: number
  ) => void
}

export default function Sliders({ onChange, selectedPart }: Readonly<Props>) {
  const propertiesInfo = sharkPartPropertiesInfo[selectedPart]
  const { getValue } = useSharkContext()
  return (
    <div>
      {Object.entries(propertiesInfo).map(
        ([name, { min, max, defaultValue, step }]) => (
          <p key={name}>
            <Slider
              min={min}
              max={max}
              defaultValue={defaultValue}
              value={getValue(selectedPart, name as SharkPartPropertiesKeys)}
              step={step}
              name={name as SharkPartPropertiesKeys}
              onChange={(prop, value) => {
                onChange?.(selectedPart, prop, value)
              }}
            />
          </p>
        )
      )}
    </div>
  )
}
