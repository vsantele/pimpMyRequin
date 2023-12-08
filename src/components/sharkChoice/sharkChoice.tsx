import { useRef, useEffect, useMemo, useCallback, useState } from "react"
import Chart from "chart.js/auto"
import { useSharkContext } from "../../contexes/sharkContext"
import { filterForSpecie, getSharkData, getSpecies } from "./utils"
import MapContainer from "../map/mapContainer"
import {
  LatLngBoundsExpression,
  Map,
  MarkerClusterGroup,
  marker,
  markerClusterGroup,
} from "leaflet"
import { SharkPart, SharkPartPropertiesKeys } from "../../models/Shark"
import { sharkAttacks } from "../../utils/json"

const position: [number, number] = [-7.96, 2.23]

export default function SharkChoice() {
  const barChartRef = useRef(null)
  const radarChartRef = useRef(null)
  const mapRef = useRef<Map | null>(null)
  const selectedSharkMarkerGroupRef = useRef<MarkerClusterGroup | null>(null)
  const [selectedSpecie, setSelectedSpecie] = useState("")
  const [selectedSpecieProperties, setSelectedSpecieProperties] =
    useState<Record<Partial<SharkPartPropertiesKeys>, number[]> | null>(null)
  const { selectedSharkPart, getSharkIds } = useSharkContext()

  const species = useMemo(() => {
    if (!selectedSharkPart) return []
    return getSpecies(getSharkIds(selectedSharkPart))
  }, [selectedSharkPart, getSharkIds])

  function handleChangeSpecies(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!selectedSharkPart) return
    const selectedShark = event.target.value
    setSelectedSpecieProperties(getSharkData(selectedSharkPart, selectedShark))
    setSelectedSpecie(selectedShark)
    displaySharks()
  }

  function initMap(map: Map) {
    mapRef.current = map
  }

  const displaySharks = useCallback(() => {
    const map = mapRef.current
    const selectedSharkMarkerGroup = selectedSharkMarkerGroupRef.current
    if (map) {
      if (!selectedSharkPart) {
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
            marker([sharkAttack.latitude, sharkAttack.longitude])
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
      selectedSharkPart !== ""
    ) {
      console.log(
        getPropertyBarChart(selectedSharkPart),
        selectedSpecieProperties[getPropertyBarChart(selectedSharkPart)]
      )
      const barChart = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "Size",
              data: selectedSpecieProperties[
                getPropertyBarChart(selectedSharkPart)
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
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
              text: "Votre Titre",
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
  }, [selectedSharkPart, selectedSpecieProperties])

  useEffect(() => {
    if (selectedSharkPart === "") return
    if (radarChartRef.current && selectedSpecieProperties) {
      const radarChart = new Chart(radarChartRef.current, {
        type: "radar",
        data: {
          labels: [
            "Eating",
            "Drinking",
            "Sleeping",
            "Designing",
            "Coding",
            "Cycling",
            "Running",
          ],
          datasets: [
            {
              label: "Dataset",
              data: [65, 59, 90, 81, 56, 55, 40],
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
          maintainAspectRatio: true,
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
              text: "Votre Titre",
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
  }, [selectedSharkPart, selectedSpecieProperties])

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 2 }}>
        <label>
          <p>Choisissez votre requin :</p>
          <select
            style={{ width: "80%", minWidth: 200 }}
            name="shark_choice"
            size={10}
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

function getBounds(points: [number, number][]): LatLngBoundsExpression {
  const bounds: LatLngBoundsExpression = [
    [points[0][0], points[0][1]],
    [points[0][0], points[0][1]],
  ]
  points.forEach((point) => {
    if (point[0] < bounds[0][0]) {
      bounds[0][0] = point[0]
    }
    if (point[0] > bounds[1][0]) {
      bounds[1][0] = point[0]
    }
    if (point[1] < bounds[0][1]) {
      bounds[0][1] = point[1]
    }
    if (point[1] > bounds[1][1]) {
      bounds[1][1] = point[1]
    }
  })
  return bounds
}
