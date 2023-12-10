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
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ width: "60vw", height: "60vh" }}>
        <MapContainer initMap={initMap}>
          {sharks.map((shark) => (
            <Marker
              key={shark.caseNumber}
              position={[shark.latitude, shark.longitude]}
            ></Marker>
          ))}
          <Polyline
            positions={sharks.map((shark) => [shark.latitude, shark.longitude])}
            color="var(--accent-color)"
          />
        </MapContainer>
      </div>
      <div
        style={{
          marginLeft: "1rem",
          backgroundColor: "whitesmoke",
          padding: "1rem",
          color: "black",
        }}
      >
        <div>
          <h2>Type de trajet</h2>
          <label style={{ marginRight: "1rem" }} htmlFor="shortestDistance">
            <input
              type="radio"
              id="shortestDistance"
              name="distance"
              checked={false}
            />
            Le plus court
          </label>
          <label htmlFor="cheapestDistance">
            <input
              type="radio"
              id="cheapestDistance"
              name="distance"
              checked={true}
            />
            Le moins cher
          </label>
        </div>
        <h2 style={{ marginLeft: "1rem", textAlign: "start" }}>
          Distance à parcourir
        </h2>
        <p style={{ marginLeft: "1rem" }}>
          {getDistance(
            sharks.map((s) => [s.latitude, s.longitude])
          ).toLocaleString()}{" "}
          kilomètres
        </p>
        <h2 style={{ marginLeft: "1rem", textAlign: "start" }}>Coût</h2>
        <p style={{ marginLeft: "1rem" }}>
          {getCost(
            getDistance(sharks.map((s) => [s.latitude, s.longitude]))
          ).toLocaleString()}{" "}
          €
        </p>
        <button style={{ marginTop: "8rem" }} onClick={() => setSelectedTab(0)}>
          Nouvelle partie
        </button>
      </div>
    </div>
  )
}

function getDistance(coords: [number, number][]) {
  let distance = 0
  for (let i = 0; i < coords.length - 1; i++) {
    distance += distanceBetween(coords[i], coords[i + 1])
  }
  return distance
}

function distanceBetween(coord1: [number, number], coord2: [number, number]) {
  const R = 6371e3 // metres
  const φ1 = (coord1[0] * Math.PI) / 180 // φ, λ in radians
  const φ2 = (coord2[0] * Math.PI) / 180
  const Δφ = ((coord2[0] - coord1[0]) * Math.PI) / 180
  const Δλ = ((coord2[1] - coord1[1]) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round((R * c) / 1000) // in kilometres
}

function getCost(distance: number) {
  return Math.round(distance * 0.42)
}
