import { SharkPart, SharkPartPropertiesKeys } from "../../models/Shark"
import "./slider.css"

interface Props {
  part: SharkPart
  name: SharkPartPropertiesKeys
  min: number
  max: number
  step: number
  label: string
  defaultValue: number
  value: number
  onChange?: (properties: SharkPartPropertiesKeys, value: number) => void
}

export default function Slider({
  name,
  min,
  max,
  defaultValue,
  value,
  step,
  label,
  onChange,
}: Readonly<Props>) {
  return (
    <div className="slider-container">
      <label htmlFor={name} className="slider-label">
        {label}
      </label>
      <div className="slider-input-container">
        <input
          id={name}
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange?.(name, parseInt(e.target.value))}
          className="slider-input"
        />
        <span className="slider-value">{value}</span>
      </div>
    </div>
  )
}
