import {
  SharkPart,
  SharkPartPropertiesKeys,
  sharkPartPropertiesInfo,
} from "../../models/Shark"

interface Props {
  selectedPart: SharkPart
  onChange?: (
    part: SharkPart,
    properties: SharkPartPropertiesKeys,
    value: number
  ) => void
}

export default function Slider({ onChange, selectedPart }: Readonly<Props>) {
  const properties = sharkPartPropertiesInfo[selectedPart]
  return (
    <div>
      {Object.entries(properties).map(
        ([name, { min, max, defaultValue, step }]) => (
          <input
            key={name}
            type="range"
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue}
            id="myRange"
            onChange={(e) =>
              onChange?.(
                selectedPart,
                name as SharkPartPropertiesKeys,
                parseInt(e.target.value)
              )
            }
          />
        )
      )}
    </div>
  )
}
