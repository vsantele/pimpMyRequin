import { Map } from "leaflet"
import { useSharkContext } from "../../contexes/sharkContext"
import { SharkPart } from "../../models/Shark"
import { sharkAttacks } from "../../utils/json"
import MapContainer from "../map/mapContainer"
import { useRef } from "react"
import { getBounds } from "../../utils/map"
import { Marker, Polyline } from "react-leaflet"
import { useNavigationContext } from "../../contexes/navigationContext"
import classes from "./journey.module.css"

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

  const distance = getDistance(sharks.map((s) => [s.latitude, s.longitude]))
  const cost = getCost(distance)
  const duration = getDuration(distance)

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
      <div style={{ width: "60vw", height: "80vh" }}>
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
          padding: "2.4rem",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{}}>
          <div>
            <h2>Type de trajet</h2>
            <label
              style={{ marginRight: "1rem" }}
              htmlFor="shortestDistance"
              className={classes["container"]}
            >
              Le plus court{" "}
              <input
                type="radio"
                id="shortestDistance"
                name="distance"
                checked={false}
              />
              <span className={classes["checkmark"]}></span>
            </label>
            <label htmlFor="cheapestDistance" className={classes["container"]}>
              Le moins cher{" "}
              <input
                type="radio"
                id="cheapestDistance"
                name="distance"
                checked={true}
              />
              <span className={classes["checkmark"]}></span>
            </label>
          </div>
          <h2>Informations</h2>
          <p>{distance.toLocaleString()} kilomètres</p>
          <p>{cost.toLocaleString()} €</p>
          <p>
            {duration.toLocaleString()} Jour{duration > 1 ? "s" : ""}
          </p>
        </div>
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

function getDuration(distance: number) {
  return Math.round(distance / 2000)
}
