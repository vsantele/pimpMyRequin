import {
  SharkPartPropertiesKeys,
  getSharkPropertyName,
} from "../../models/Shark"

interface Props {
  name: SharkPartPropertiesKeys
  min: number
  max: number
  step: number
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
  onChange,
}: Readonly<Props>) {
  return (
    <label htmlFor={name}>
      {getSharkPropertyName(name as SharkPartPropertiesKeys)}:
      <input
        id={name}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) =>
          onChange?.(name as SharkPartPropertiesKeys, parseInt(e.target.value))
        }
        style={{ width: "20rem" }}
      />
      <span>{value}</span>
    </label>
  )
}
