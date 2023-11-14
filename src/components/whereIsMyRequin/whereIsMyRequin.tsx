import { Marker } from "react-leaflet"
import { useSharkContext } from "../../contexes/sharkContext"
import MapContainer from "../map/mapContainer"
import Slider from "../slider/sliders"
const position: [number, number] = [51.505, -0.09]

export default function WhereIsMyRequin() {
  const { selectedSharkPart } = useSharkContext()
  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "40rem", width: "50rem" }}>
        <MapContainer center={position} zoom={13}>
          <Marker position={position}></Marker>
        </MapContainer>
      </div>
      <div>
        <Slider />
      </div>
    </div>
  )
}
