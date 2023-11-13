import * as d3 from "d3"
import { useEffect, useMemo, useRef } from "react"
import Shark from "../shark/shark"

export default function PimpMyRequin() {
  const nez = useRef<SVGPathElement | null>(null)
  const aileronHaut = useRef<SVGPathElement | null>(null)
  const gueule = useRef<SVGPathElement | null>(null)
  const tronc = useRef<SVGPathElement | null>(null)
  const aileronBas = useRef<SVGPathElement | null>(null)
  const aileronArriere = useRef<SVGPathElement | null>(null)
  const queue = useRef<SVGPathElement | null>(null)
  const bas = useRef<SVGPathElement | null>(null)

  const parts = useMemo(
    () => [
      {
        ref: nez,
        name: "Nez",
      },
      {
        ref: aileronHaut,
        name: "Aileron Haut",
      },
      {
        ref: gueule,
        name: "Gueule",
      },
      {
        ref: tronc,
        name: "Tronc",
      },
      {
        ref: aileronBas,
        name: "Aileron Bas",
      },
      {
        ref: aileronArriere,
        name: "Aileron Arrière",
      },
      {
        ref: queue,
        name: "Queue",
      },
      { ref: bas, name: "Bas" },
    ],
    [aileronArriere, aileronBas, aileronHaut, gueule, nez, queue, tronc]
  )

  function onMouseEnterAnimation(part: SVGPathElement) {
    return () => {
      const bbox = part.getBBox()
      const cx = bbox.x + bbox.width / 2
      const cy = bbox.y + bbox.height / 2

      d3.select(part)
        .transition()
        .duration(200)
        .attr(
          "transform",
          `translate(${cx}, ${cy}) scale(1.05) translate(${-cx}, ${-cy})`
        )
        .style("stroke", "white")
        .style("stroke-width", "0.4rem")
    }
  }

  function onMouseLeaveAnimation(part: SVGPathElement) {
    return () => {
      const bbox = part.getBBox()
      const cx = bbox.x + bbox.width / 2
      const cy = bbox.y + bbox.height / 2

      d3.select(part)
        .transition()
        .duration(200)
        .attr(
          "transform",
          `translate(${cx}, ${cy}) scale(1) translate(${-cx}, ${-cy})`
        )
        .style("stroke", "")
        .style("stroke-width", "")
    }
  }

  function onClick(name: string) {
    return () => console.log("You clicked on a part", name)
  }

  useEffect(() => {
    const eventFunctions = new Map()

    parts.forEach(({ ref, name }) => {
      const part = ref.current
      if (part) {
        const mouseEnterFunc = onMouseEnterAnimation(part)
        const mouseLeaveFunc = onMouseLeaveAnimation(part)
        const mouseClickFunc = onClick(name)
        part.addEventListener("click", mouseClickFunc)
        part.addEventListener("mouseenter", mouseEnterFunc)
        part.addEventListener("mouseleave", mouseLeaveFunc)
        eventFunctions.set(part, {
          mouseEnterFunc,
          mouseLeaveFunc,
          mouseClickFunc,
        })
      }
    })
    return () => {
      parts.forEach(({ ref }) => {
        const part = ref.current
        if (part) {
          const { mouseEnterFunc, mouseLeaveFunc, mouseClickFunc } =
            eventFunctions.get(part)
          part.removeEventListener("click", mouseClickFunc)
          part.removeEventListener("mouseenter", mouseEnterFunc)
          part.removeEventListener("mouseleave", mouseLeaveFunc)
        }
      })
    }
  }, [parts])

  return (
    <Shark
      nez={nez}
      aileronArriere={aileronArriere}
      aileronBas={aileronBas}
      aileronHaut={aileronHaut}
      tronc={tronc}
      gueule={gueule}
      queue={queue}
      bas={bas}
    />
  )
}
