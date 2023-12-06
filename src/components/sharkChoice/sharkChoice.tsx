import { useRef, useEffect, useMemo } from "react"
import Chart from "chart.js/auto"
import classes from "./sharkChoice.module.css"
import { useSharkContext } from "../../contexes/sharkContext"
import { getSharkData, getSpecies } from "./utils"

export default function SharkChoice() {
  const barChartRef = useRef(null)
  const radarChartRef = useRef(null)

  const { selectedSharkPart, getSharkIds } = useSharkContext()

  const species = useMemo(() => {
    if (!selectedSharkPart) return []
    return getSpecies(getSharkIds(selectedSharkPart))
  }, [selectedSharkPart, getSharkIds])

  function handleChangeSpecies(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!selectedSharkPart) return
    const selectedShark = event.target.value
    console.log(getSharkData(selectedSharkPart, selectedShark))
  }

  useEffect(() => {
    if (barChartRef.current) {
      const barChart = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
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
  }, [])

  useEffect(() => {
    if (radarChartRef.current) {
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
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.choices}>
        <label>
          <p>Choisissez votre requin :</p>
          <select name="shark_choice" size={10} onChange={handleChangeSpecies}>
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
      <div className={classes.barchart}>
        <canvas ref={barChartRef}></canvas>
      </div>
      <div className={classes.spiderchart}>
        <canvas ref={radarChartRef}></canvas>
      </div>
      <div className={classes.map}>a</div>
    </div>
  )
}

function SharkOption({
  name,
  corr,
  isFirst,
}: {
  name: string
  corr: number
  isFirst: boolean
}) {
  return (
    <option value={name}>
      <strong>{name}</strong> - {(corr * 100).toFixed(2)}%{" "}
      {isFirst && <span>👍</span>}
    </option>
  )
}
