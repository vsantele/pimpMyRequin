import { useSharkContext } from "../../contexes/sharkContext"
import MapContainer from "../map/mapContainer"
import Sliders from "../slider/sliders"
import { Map, MarkerClusterGroup, markerClusterGroup, marker } from "leaflet"
import { useCallback, useEffect, useRef } from "react"
import classes from "./whereIsMyRequin.module.css"
import { sharkAttacks } from "../../utils/json"
import { SharkPart } from "../../models/Shark"

const position: [number, number] = [-7.96, 2.23]

export default function WhereIsMyRequin() {
  const { selectedSharkPart, dispatch, getSharkIds } = useSharkContext()

  const mapRef = useRef<Map | null>(null)
  const selectedSharkMarkerGroupRef = useRef<MarkerClusterGroup | null>(null)

  const initMap = (map: Map) => {
    mapRef.current = map
    displaySharks(map, selectedSharkPart)
  }

  const displaySharks = useCallback(
    (map: Map | null, selectedSharkPart: SharkPart | "") => {
      const selectedSharkMarkerGroup = selectedSharkMarkerGroupRef.current
      if (map) {
        if (!selectedSharkPart) {
          return
        }
        if (selectedSharkMarkerGroup) {
          map.removeLayer(selectedSharkMarkerGroup)
        }
        const newSelectedSharkMarkerGroup = markerClusterGroup()
        const selectedSharks = getSharkIds(selectedSharkPart)
        sharkAttacks
          .filter((s) => selectedSharks.includes(s.caseNumber))
          .forEach((sharkAttack) => {
            if (sharkAttack.latitude && sharkAttack.longitude) {
              newSelectedSharkMarkerGroup.addLayer(
                marker([sharkAttack.latitude, sharkAttack.longitude])
              )
            }
          })
        newSelectedSharkMarkerGroup.addTo(map)
        selectedSharkMarkerGroupRef.current = newSelectedSharkMarkerGroup
      }
    },
    [getSharkIds]
  )

  useEffect(() => {
    const map = mapRef.current
    displaySharks(map, selectedSharkPart)
  }, [mapRef, selectedSharkPart, displaySharks])

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
      <div className={classes["sliders-container"]}>
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
