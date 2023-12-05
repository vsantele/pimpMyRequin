import { useSharkContext } from "../../contexes/sharkContext"
import MapContainer from "../map/mapContainer"
import Sliders from "../slider/sliders"
import { Map } from "leaflet"
import { useRef } from "react"
const position: [number, number] = [-7.96, 2.23]

export default function WhereIsMyRequin() {
  const { selectedSharkPart, dispatch, properties } = useSharkContext()

  const mapRef = useRef<Map | null>(null)

  const initMap = (map: Map) => {
    mapRef.current = map
  }

  if (!selectedSharkPart) {
    return <p>Veuillez rechargez la page</p>
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "40rem", width: "50rem" }}>
        <MapContainer
          center={position}
          zoom={2}
          initMap={initMap}
        ></MapContainer>
      </div>
      <div>
        <Sliders
          selectedPart={selectedSharkPart}
          onChange={(part, propertyName, value) =>
            dispatch({ part, propertyName, value, type: "UPDATE" })
          }
        />
      </div>
    </div>
  )
}
