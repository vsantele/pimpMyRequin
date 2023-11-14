import * as d3 from "d3"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useNavigationContext } from "../../contexes/navigationContext"
import { useSharkContext } from "../../contexes/sharkContext"
import { SharkPart } from "../../models/Shark"
import Shark from "../shark/shark"
import classes from "./pimpMyRequin.module.css"

interface Part {
  ref: React.RefObject<SVGPathElement>
  name: string
  key: SharkPart
}

export default function PimpMyRequin() {
  const nez = useRef<SVGPathElement | null>(null)
  const aileronHaut = useRef<SVGPathElement | null>(null)
  const gueule = useRef<SVGPathElement | null>(null)
  const tronc = useRef<SVGPathElement | null>(null)
  const aileronBas = useRef<SVGPathElement | null>(null)
  const aileronArriere = useRef<SVGPathElement | null>(null)
  const queue = useRef<SVGPathElement | null>(null)
  const bas = useRef<SVGPathElement | null>(null)

  const { setSelectedSharkPart } = useSharkContext()
  const { nextTab } = useNavigationContext()

  const parts: Part[] = useMemo(
    () => [
      {
        ref: nez,
        name: "Nez",
        key: "nez",
      },
      {
        ref: aileronHaut,
        name: "Aileron Haut",
        key: "aileronHaut",
      },
      {
        ref: gueule,
        name: "Gueule",
        key: "gueule",
      },
      {
        ref: tronc,
        name: "Tronc",
        key: "tronc",
      },
      {
        ref: aileronBas,
        name: "Aileron Bas",
        key: "aileronBas",
      },
      {
        ref: aileronArriere,
        name: "Aileron Arrière",
        key: "aileronArriere",
      },
      {
        ref: queue,
        name: "Queue",
        key: "queue",
      },
      { ref: bas, name: "Bas", key: "bas" },
    ],
    [aileronArriere, aileronBas, aileronHaut, gueule, nez, queue, tronc]
  )

  function onMouseEnterAnimation(part: Part) {
    const svg = part.ref.current!
    return () => {
      const bbox = svg.getBBox()
      const cx = bbox.x + bbox.width / 2
      const cy = bbox.y + bbox.height / 2

      d3.select(svg)
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

  function onMouseLeaveAnimation(part: Part) {
    const svg = part.ref.current!
    return () => {
      const bbox = svg.getBBox()
      const cx = bbox.x + bbox.width / 2
      const cy = bbox.y + bbox.height / 2

      d3.select(svg)
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

  const onClick = useCallback(
    (part: Part) => {
      return () => {
        setSelectedSharkPart(part.key)
        nextTab()
      }
    },
    [nextTab, setSelectedSharkPart]
  )

  useEffect(() => {
    const eventFunctions = new Map()

    parts.forEach((part) => {
      const partSvg = part.ref.current
      if (partSvg) {
        const mouseEnterFunc = onMouseEnterAnimation(part)
        const mouseLeaveFunc = onMouseLeaveAnimation(part)
        const mouseClickFunc = onClick(part)
        partSvg.addEventListener("click", mouseClickFunc)
        partSvg.addEventListener("mouseenter", mouseEnterFunc)
        partSvg.addEventListener("mouseleave", mouseLeaveFunc)
        eventFunctions.set(partSvg, {
          mouseEnterFunc,
          mouseLeaveFunc,
          mouseClickFunc,
        })
      }
    })
    return () => {
      parts.forEach((part) => {
        const partSvg = part.ref.current
        if (partSvg) {
          const { mouseEnterFunc, mouseLeaveFunc, mouseClickFunc } =
            eventFunctions.get(partSvg)
          partSvg.removeEventListener("click", mouseClickFunc)
          partSvg.removeEventListener("mouseenter", mouseEnterFunc)
          partSvg.removeEventListener("mouseleave", mouseLeaveFunc)
        }
      })
    }
  }, [parts, onClick])

  return (
    <div className={classes["shark-container"]}>
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
    </div>
  )
}
