import { Map } from "leaflet"
import { useSharkContext } from "../../contexes/sharkContext"
import { SharkPart } from "../../models/Shark"
import { sharkAttacks } from "../../utils/json"
import MapContainer from "../map/mapContainer"
import { useRef } from "react"
import { getBounds } from "../../utils/map"
import { Marker, Polyline } from "react-leaflet"
import { useNavigationContext } from "../../contexes/navigationContext"

export default function Journey() {
  const { panier, properties } = useSharkContext()
  const { setSelectedTab } = useNavigationContext()

  const mapRef = useRef<Map | null>(null)

  const sharks = Object.entries(properties).reduce(
    (acc, [part, { sharks: selectedSharks }]) => {
      const selectedShark =
        selectedSharks
          .filter((s) => !s.startsWith("DataShark"))
          .map((shark) => sharkAttacks.find((s) => s.caseNumber === shark))
          .find((shark) => shark?.species === panier[part as SharkPart]) ?? null
      if (selectedShark) {
        return [...acc, selectedShark]
      }
      return acc
    },
    [] as {
      caseNumber: string
      species: string
      latitude: number
      longitude: number
    }[]
  )

  function initMap(map: Map) {
    mapRef.current = map
    if (sharks.length == 0) return
    if (sharks.length == 1) {
      map.setView([sharks[0].latitude, sharks[0].longitude], 5)
    } else {
      const bounds = getBounds(sharks.map((s) => [s.latitude, s.longitude]))
      map.fitBounds(bounds, {
        padding: [50, 50],
      })
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ width: "60vw", height: "60vh" }}>
        <MapContainer initMap={initMap}>
          {sharks.map((shark) => (
            <Marker
              key={shark.caseNumber}
              position={[shark.latitude, shark.longitude]}
            >
              Tests
            </Marker>
          ))}
          <Polyline
            positions={sharks.map((shark) => [shark.latitude, shark.longitude])}
            color="var(--accent-color)"
          />
        </MapContainer>
      </div>
      <button style={{ marginLeft: "1rem" }} onClick={() => setSelectedTab(0)}>
        Nouvelle partie
      </button>
    </div>
  )
}
