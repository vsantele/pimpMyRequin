import { useSharkContext } from "../../contexes/sharkContext"
import {
  SharkPart,
  SharkPartPropertiesKeys,
  getSharkPartName,
  sharkPartPropertiesInfo,
} from "../../models/Shark"
import Slider from "./slider"
import "./sliders.css"

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
    <div className="sliders-container">
      <h3>{getSharkPartName(selectedPart)}</h3>
      {Object.entries(propertiesInfo).map(
        ([name, { min, max, defaultValue, step, label }]) => (
          <div key={name}>
            <Slider
              part={selectedPart}
              min={min}
              max={max}
              defaultValue={defaultValue}
              value={getValue(selectedPart, name as SharkPartPropertiesKeys)}
              step={step}
              label={label}
              name={name as SharkPartPropertiesKeys}
              onChange={(prop, value) => {
                onChange?.(selectedPart, prop, value)
              }}
            />
          </div>
        )
      )}
    </div>
  )
}
