import * as d3 from "d3"

import { useEffect, useRef } from "react"
import Shark from "./shark"

interface EasterSharpProps {
  width?: number
  height?: number
}

export default function EasterShark({
  width = 640,
  height = 640,
}: Readonly<EasterSharpProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const data: (d3.SimulationNodeDatum & { r: number })[] = Array.from(
    { length: 100 },
    () => ({
      r: Math.random() * 12 + 4,
      group: Math.random() * 3,
      id: crypto.randomUUID(),
    })
  )
  const nodes = data.map(Object.create)

  useEffect(() => {
    if (!canvasRef.current) return
    const ref = canvasRef.current
    const color = d3.scaleOrdinal(d3.schemeTableau10)
    const svg = d3.select(ref)
    d3.xml("/shark.svg").then((svgFile) => {
      // Append the loaded SVG to your SVG container
      svg.node()!.appendChild(svgFile.documentElement)
    })
    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3) // stay hot
      .velocityDecay(0.1) // low friction
      .force("x", d3.forceX().strength(0.01))
      .force("y", d3.forceY().strength(0.01))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d) => d.r + 1)
          .iterations(3)
      )
      .force(
        "charge",
        d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3))
      )
      .on("tick", ticked)

    d3.select(ref)
      .on("touchmove", (event) => event.preventDefault())
      .on("pointermove", pointermoved)

    function pointermoved(event: unknown) {
      const [x, y] = d3.pointer(event)
      nodes[0].fx = x - width / 2
      nodes[0].fy = y - height / 2
    }

    function ticked() {
      const context = ref.getContext("2d")!
      context.clearRect(0, 0, width, height)
      context.save()
      context.translate(width / 2, height / 2)
      for (let i = 1; i < nodes.length; ++i) {
        const n = nodes[i]
        const d = d3.select(`#${nodes[i].id}`)
        d.context.fillStyle = color(nodes[i].group)
        context.beginPath()
        context.arc(n.x, n.y, n.r, 0, 2 * Math.PI)
        context.fill()
      }
      context.restore()
    }

    return () => simulation.stop() // cleanup function to stop the simulation when the component unmounts
  }, [data, height, width]) // re-run the effect when `data` or `width` changes

  return (
    <canvas ref={canvasRef} width={width} height={height}>
      {nodes.map((n) => (
        <Shark key={n.id} id={n.id} />
      ))}
    </canvas>
  )
}
