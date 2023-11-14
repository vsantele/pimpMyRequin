import "leaflet"
import "leaflet/dist/leaflet.css"

import {
  LatLngBoundsExpression,
  LatLngExpression,
  Map as LeafletMap,
  LeafletMouseEvent,
} from "leaflet"
import { ReactNode } from "react"
import {
  LayersControl,
  MapContainer as LeafletMapContainer,
  ScaleControl,
  TileLayer,
} from "react-leaflet"
import HandleMapEvents from "./handleMapEvents"

interface MapProps {
  center?: LatLngExpression
  zoom?: number
  bounds?: LatLngBoundsExpression
  onMapClick?: (e: LeafletMouseEvent) => void
  onMouseMove?: (e: LeafletMouseEvent) => void
  initMap?: (map: LeafletMap) => void
  children?: ReactNode
}

export default function MapContainer({
  center = {
    lat: 50.4541,
    lng: 3.9519,
  },
  bounds,
  zoom = 15,
  onMapClick,
  onMouseMove,
  initMap,
  children,
}: Readonly<MapProps>) {
  const whenCreated = (map: LeafletMap | null) => {
    if (map) {
      initMap?.(map)
    }
  }

  return (
    <LeafletMapContainer
      center={center}
      bounds={bounds}
      zoom={zoom}
      maxZoom={25}
      scrollWheelZoom={true}
      ref={whenCreated}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            zIndex={1}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxNativeZoom={19}
            maxZoom={25}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="MapBox.Satellite">
          <TileLayer
            zIndex={1}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxNativeZoom={21}
            maxZoom={25}
          />
        </LayersControl.BaseLayer>
        {children}
      </LayersControl>
      <HandleMapEvents onMapClick={onMapClick} onMouseMove={onMouseMove} />
      <ScaleControl />
    </LeafletMapContainer>
  )
}
