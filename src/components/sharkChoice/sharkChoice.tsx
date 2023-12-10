import { useRef, useEffect, useMemo, useCallback } from "react"
import Chart from "chart.js/auto"
import { useSharkContext } from "../../contexes/sharkContext"
import { filterForSpecie, getSharkData, getSpecies } from "./utils"
import MapContainer from "../map/mapContainer"
import {
  Icon,
  Map,
  MarkerClusterGroup,
  marker,
  markerClusterGroup,
} from "leaflet"
import {
  SharkPart,
  SharkPartPropertiesKeys,
  sharkPartPropertiesInfo,
} from "../../models/Shark"
import { sharkAttacks } from "../../utils/json"
import { getBounds } from "../../utils/map"
import markerSrc from "../../assets/marker-icon.png"

const position: [number, number] = [-7.96, 2.23]

export default function SharkChoice() {
  const barChartRef = useRef(null)
  const radarChartRef = useRef(null)
  const mapRef = useRef<Map | null>(null)
  const selectedSharkMarkerGroupRef = useRef<MarkerClusterGroup | null>(null)
  const { selectedSharkPart, getSharkIds, panier, setPanierPart } =
    useSharkContext()
  const selectedSpecie = panier[selectedSharkPart as SharkPart]
  const species = useMemo(() => {
    if (!selectedSharkPart) return []
    return getSpecies(getSharkIds(selectedSharkPart))
  }, [selectedSharkPart, getSharkIds])
  if (!selectedSpecie) {
    setPanierPart(species[0]?.species ?? "")
  }

  const selectedSpecieProperties = useMemo(() => {
    if (!selectedSharkPart || !selectedSpecie) return null
    return getSharkData(selectedSharkPart, selectedSpecie)
  }, [selectedSharkPart, selectedSpecie])

  function handleChangeSpecies(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!selectedSharkPart) return
    const selectedShark = event.target.value
    setPanierPart(selectedShark)
    displaySharks()
  }

  function initMap(map: Map) {
    mapRef.current = map
  }

  const displaySharks = useCallback(() => {
    const map = mapRef.current
    const selectedSharkMarkerGroup = selectedSharkMarkerGroupRef.current
    if (map) {
      if (!selectedSharkPart || !selectedSpecie) {
        return
      }
      if (selectedSharkMarkerGroup) {
        map.removeLayer(selectedSharkMarkerGroup)
      }
      const newSelectedSharkMarkerGroup = markerClusterGroup()
      const selectedSharks = filterForSpecie(
        getSharkIds(selectedSharkPart),
        selectedSpecie
      )
      const showedSharks = sharkAttacks.filter((s) =>
        selectedSharks.includes(s.caseNumber)
      )
      if (showedSharks.length == 1) {
        map.setView([showedSharks[0].latitude, showedSharks[0].longitude], 5)
      } else {
        const bounds = getBounds(
          showedSharks.map((s) => [s.latitude, s.longitude])
        )
        map.fitBounds(bounds, {
          padding: [50, 50],
        })
      }
      showedSharks.forEach((sharkAttack) => {
        if (sharkAttack.latitude && sharkAttack.longitude) {
          newSelectedSharkMarkerGroup.addLayer(
            marker([sharkAttack.latitude, sharkAttack.longitude], {
              icon: new Icon({
                iconUrl: markerSrc,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              }),
            })
          )
        }
      })
      newSelectedSharkMarkerGroup.addTo(map)
      selectedSharkMarkerGroupRef.current = newSelectedSharkMarkerGroup
    }
  }, [getSharkIds, selectedSharkPart, selectedSpecie])

  useEffect(() => {
    if (
      barChartRef.current &&
      selectedSpecieProperties &&
      selectedSharkPart !== "" &&
      selectedSpecie !== null
    ) {
      const partProperty = getPropertyBarChart(selectedSharkPart)
      const data = selectedSpecieProperties[partProperty].slice(0, 42)
      const barChart = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: data.map((_, i) => i),
          datasets: [
            {
              barPercentage: 1,
              label: selectedSpecie,
              data: data,
              backgroundColor: "#ff9600",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "grey", // Couleur de la grille pour l'axe Y
              },
              ticks: {
                color: "grey", // Couleur des étiquettes pour l'axe Y
              },
            },
            x: {
              grid: {
                color: "grey", // Couleur de la grille pour l'axe X
              },
              ticks: {
                color: "grey", // Couleur des étiquettes pour l'axe X
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "grey", // Couleur du texte de la légende
              },
            },
            title: {
              display: true,
              text:
                sharkPartPropertiesInfo[selectedSharkPart][partProperty]
                  ?.label ?? "",
              color: "grey", // Couleur du texte du titre
            },
          },
        },
        plugins: [
          {
            id: "backgroundPlugin",
            beforeDraw: (chart) => {
              const ctx = chart.ctx
              ctx.save()
              ctx.fillStyle = "black"
              ctx.fillRect(0, 0, chart.width, chart.height)
              ctx.restore()
            },
          },
        ],
      })

      return () => barChart.destroy()
    }
  }, [selectedSharkPart, selectedSpecie, selectedSpecieProperties])

  useEffect(() => {
    if (selectedSharkPart === "" || selectedSpecie === null) return
    if (radarChartRef.current && selectedSpecieProperties) {
      const radarChart = new Chart(radarChartRef.current, {
        type: "radar",
        data: {
          labels: Object.values(sharkPartPropertiesInfo[selectedSharkPart]).map(
            (p) => p.label
          ),
          datasets: [
            {
              label: selectedSpecie,
              data: Object.values(selectedSpecieProperties).map(
                (i) => i.reduce((acc, cur) => acc + cur, 0) / i.length
              ),
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              backgroundColor: "white",
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "grey", // Couleur du texte de la légende
              },
            },
            title: {
              display: true,
              text: "Caractéristiques",
              color: "grey", // Couleur du texte du titre
            },
          },
        },
        plugins: [
          {
            id: "backgroundPlugin",
            beforeDraw: (chart) => {
              const ctx = chart.ctx
              ctx.save()
              ctx.fillStyle = "black"
              ctx.fillRect(0, 0, chart.width, chart.height)
              ctx.restore()
            },
          },
        ],
      })

      return () => radarChart.destroy()
    }
  }, [selectedSharkPart, selectedSpecie, selectedSpecieProperties])

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 2 }}>
        <label>
          <p>Choisissez votre requin :</p>
          <select
            style={{ width: "80%", minWidth: 200 }}
            name="shark_choice"
            size={10}
            value={selectedSpecie ?? ""}
            onChange={handleChangeSpecies}
          >
            {species.map((shark, index) => (
              <SharkOption
                key={shark.species}
                name={shark.species}
                corr={shark.corr}
                isFirst={index === 0}
              />
            ))}
          </select>
        </label>
      </div>
      <div style={{ flex: 6 }}>
        <div
          style={{
            position: "relative",
            height: "20rem",
            width: "90%",
            marginBottom: "0.4rem",
          }}
        >
          <canvas ref={barChartRef}></canvas>
        </div>
        <div style={{ width: "90%", height: "30rem" }}>
          <div
            style={{
              display: "inline-block",
              position: "relative",
              height: "20rem",
              maxHeight: "40rem",
              width: "50%",
            }}
          >
            <canvas ref={radarChartRef}></canvas>
          </div>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              height: "20rem",
              width: "50%",
            }}
          >
            <MapContainer
              center={position}
              zoom={3}
              initMap={initMap}
            ></MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function SharkOption({
  name,
  corr,
  isFirst,
}: Readonly<{
  name: string
  corr: number
  isFirst: boolean
}>) {
  return (
    <option
      value={name}
      style={{
        borderBottom: "4 solid white",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ flex: 3 }}>
          <p>
            <strong style={{ textTransform: "capitalize" }}>{name}</strong>
          </p>
          {(corr * 100).toFixed(2)}%
        </div>
        {isFirst && <span style={{ flex: 1, fontSize: 24 }}>👍</span>}
      </div>
    </option>
  )
}

function getPropertyBarChart(part: SharkPart): SharkPartPropertiesKeys {
  switch (part) {
    case "nez":
      return "longueurMuseau"
    case "aileronArriere":
    case "aileronBas":
    case "aileronHaut":
    case "queue":
    case "bas":
    case "tronc":
      return "longueur"
    case "gueule":
      return "tailleDent"
    default:
      return "longueur"
  }
}
