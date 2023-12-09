import { MutableRefObject, useEffect } from "react"
import classes from "./shark.module.css"
import { useSharkContext } from "../../contexes/sharkContext"
import { SharkPart } from "../../models/Shark"
export interface SharkProps {
  nez?: MutableRefObject<SVGPathElement | null>
  aileronHaut?: MutableRefObject<SVGPathElement | null>
  gueule?: MutableRefObject<SVGPathElement | null>
  tronc?: MutableRefObject<SVGPathElement | null>
  aileronBas?: MutableRefObject<SVGPathElement | null>
  aileronArriere?: MutableRefObject<SVGPathElement | null>
  queue?: MutableRefObject<SVGPathElement | null>
  bas?: MutableRefObject<SVGPathElement | null>
}

export default function Shark(props: Readonly<SharkProps>) {
  const {
    aileronArriere,
    aileronBas,
    aileronHaut,
    gueule,
    nez,
    queue,
    tronc,
    bas,
  } = props

  const { panier } = useSharkContext()
  const selectedParts = Object.entries(panier)
    .filter((i) => i[1] !== null)
    .map(([part]) => part as SharkPart)

  useEffect(() => {
    if (nez) {
      nez.current = document.getElementById("nez") as unknown as SVGPathElement
      if (selectedParts.includes("nez")) {
        nez.current.classList.add(classes.selected)
      }
    }
    if (aileronHaut) {
      aileronHaut.current = document.getElementById(
        "aileronHaut"
      ) as unknown as SVGPathElement
      if (selectedParts.includes("aileronHaut")) {
        aileronHaut.current.classList.add(classes.selected)
      }
    }
    if (gueule) {
      gueule.current = document.getElementById(
        "gueule"
      ) as unknown as SVGPathElement
      if (selectedParts.includes("gueule")) {
        gueule.current.classList.add(classes.selected)
      }
    }
    if (tronc) {
      tronc.current = document.getElementById(
        "tronc"
      ) as unknown as SVGPathElement
      if (selectedParts.includes("tronc")) {
        tronc.current.classList.add(classes.selected)
      }
    }
    if (aileronBas) {
      aileronBas.current = document.getElementById(
        "aileronBas"
      ) as unknown as SVGPathElement
      if (selectedParts.includes("aileronBas")) {
        aileronBas.current.classList.add(classes.selected)
      }
    }
    if (aileronArriere) {
      aileronArriere.current = document.getElementById(
        "aileronArriere"
      ) as unknown as SVGPathElement
      if (selectedParts.includes("aileronArriere")) {
        aileronArriere.current.classList.add(classes.selected)
      }
    }
    if (queue) {
      queue.current = document.getElementById(
        "queue"
      ) as unknown as SVGPathElement
      if (selectedParts.includes("queue")) {
        queue.current.classList.add(classes.selected)
      }
    }
    if (bas) {
      bas.current = document.getElementById("bas") as unknown as SVGPathElement
      if (selectedParts.includes("bas")) {
        bas.current.classList.add(classes.selected)
      }
    }
  }, [
    aileronArriere,
    aileronBas,
    aileronHaut,
    gueule,
    nez,
    queue,
    tronc,
    bas,
    selectedParts,
  ])

  return (
    <svg
      id="Calque_2"
      data-name="Calque 2"
      viewBox="0 0 1612.34 711"
      version="1.1"
      className={classes.shark}
    >
      <g id="Requin" data-name="Calque 1">
        <path
          d="m 1529.34,0 h 2 c -4.33,12 -8.67,24 -13,36 -9.51,26.18 -12.63,55.68 -18,85 -20.13,109.89 32.29,242.36 68,307 14.67,22.66 29.33,45.34 44,68 -59.87,-4.6 -159.79,-67.74 -176,-112 -31.66,14 -63.34,28 -95,42 0.5,10.44 5.76,53.21 0,61 l -62,-36 c -21.33,9.33 -42.67,18.67 -64,28 -5.04,-30.38 -7.58,-76.34 2,-105 92.68,0.41 163.87,-17.28 200,-74 7.54,-11.84 -0.12,-35.23 3,-54 3.33,-19 6.67,-38 10,-57 21.95,-72.19 55.7,-137.43 99,-189 z m 2e-4,-0.22618454 h 2 c -4.33,11.99999954 -8.67,23.99999954 -13,35.99999954 -9.51,26.18 -12.63,55.68 -18,85.000005 -20.13,109.89 32.29,242.36 68,307 14.67,22.66 29.33,45.34 44,68 -59.87,-4.6 -159.79,-67.74 -176,-112 -31.66,14 -63.34,28 -95,42 0.5,10.44 5.76,53.21 0,61 l -62,-36 c -21.33,9.33 -42.67,18.67 -64,28 -5.04,-30.38 -7.58,-76.34 2,-105 92.68,0.41 163.87,-17.28 200,-74 7.54,-11.84 -0.12,-35.23 3,-54 3.33,-19 6.67,-38 10,-57 21.95,-72.19 55.7,-137.430005 99,-189.00000454 z"
          id="queue"
        />
        <path
          d="m 990.34,262 5,1 c -1.16,43.12 4.22,86.1 41,93 l -2,4 c -14.77,31.6 -84.45,43.84 -120,22 -17.05,-10.47 -26.73,-25.34 -35,-45 -3.51,-8.34 -8.5,-21.33 -5,-34 l 66,27 c 8.09,-33.07 29.9,-47.45 50,-68 z"
          id="aileronArriere"
        />
        <path
          d="m 813.34,281 27,9 c -17.74,84.91 67.19,157.2 155,135 25.52,-6.45 55.76,-23.63 70,-42 4.33,-6 8.67,-12 13,-18 32.56,7.77 66.23,9.92 103,10 v 1 c -10.02,36.24 -2.07,82.14 1,117 l -141,45 c -91.09,27.62 -198.5,46.14 -312,48 -13.48,-24.75 -35.72,-36.59 -54,-56 15.17,-16.42 36.83,-26.41 51,-44 28.53,-35.41 53.08,-73.61 71,-120 10,-25.89 7.83,-54.26 16,-85 z m 2.4e-4,-0.22618 27,9 c -17.74,84.91 67.19,157.2 155,135 25.51996,-6.45 55.75996,-23.63 69.99996,-42 4.33,-6 8.67,-12 13,-18 32.56,7.77 66.23,9.92 103,10 v 1 c -10.02,36.24 -2.07,82.14 1,117 l -141,45 c -91.08996,27.62 -198.49996,46.14 -311.99996,48 -13.48,-24.75 -35.72,-36.59 -54,-56 15.17,-16.42 36.83,-26.41 51,-44 28.53,-35.41 53.08,-73.61 71,-120 10,-25.89 7.83,-54.26 16,-85 z"
          id="bas"
        />
        <path
          d="m 368.34,598 c 0,0 72.88,-75 166,-78 104.23,1.2 149.7,67 151,67 h -50 c -31.54,39.96 6.89,124 13,124 6.11,0 -108.98,-13.53 -171,-111 -17.66,0.06 -109,-2 -109,-2 z m 2.4e-4,-0.22618 c 0,0 72.88,-75 166,-78 104.23,1.2 149.7,67 151,67 h -50 c -31.54,39.96 6.89,124 13,124 6.11,0 -108.98,-13.53 -171,-111 -17.66,0.06 -109,-2 -109,-2 z"
          id="aileronBas"
        />
        <path
          d="m 509.34,200 c 34.52,-0.73 63.92,13.53 92,21 45.58,12.12 96.27,17.71 135,36 13.42,6.34 32.13,3.46 42,13 1.61,87.82 -40.08,143.7 -79,192 -8.92,11.07 -43.07,45.42 -57,48 0,0 -54.96,-20.88 -66,-23 -43.62,-8.38 -83.13,6.44 -117,12 v -8 c 16.66,-57.06 -17.52,-105.96 -40,-135 14.26,-14.22 36.32,-20.16 49,-36 25.34,-31.67 30.58,-71.51 41,-120 z m 96,88 c 30.61,40.24 36.38,67.69 25,131 h 1 v -2 c 35.36,-42.97 21.55,-110.88 -26,-129 z m -60,3 c 28.12,25.34 60.36,60.55 49,121 h 1 l 1,-2 c 31.58,-51.81 -8.16,-109.09 -51,-119 z m -47,12 c 20.11,21.7 37.86,34.96 47,69 l 3,56 c 13.12,-68.81 12.58,-103.15 -50,-125 z m 11.00024,-103.22618 c 34.52,-0.73 63.92,13.53 92,21 45.58,12.12 96.27,17.71 135,36 13.42,6.34 32.13,3.46 42,13 1.61,87.82 -40.08,143.7 -79,192 -8.92,11.07 -43.07,45.42 -57,48 0,0 -54.96,-20.88 -66,-23 -43.62,-8.38 -83.13,6.44 -117,12 v -8 c 16.66,-57.06 -17.52,-105.96 -40,-135 14.26,-14.22 36.32,-20.16 49,-36 25.34,-31.67 30.58,-71.51 41,-120 z m 96,88 c 30.61,40.24 36.38,67.69 25,131 h 1 v -2 c 35.36,-42.97 21.55,-110.88 -26,-129 z m -60,3 c 28.12,25.34 60.36,60.55 49,121 h 1 l 1,-2 c 31.58,-51.81 -8.16,-109.09 -51,-119 z m -47,12 c 20.11,21.7 37.86,34.96 47,69 l 3,56 c 13.12,-68.81 12.58,-103.15 -50,-125 z"
          id="tronc"
        />
        <path
          d="m 93.34,368 -4,-19 104,-24 c 88.01,-16.18 165.58,21.11 207,63 21.57,21.81 30.45,61.97 24,103 -1.48,9.42 1.19,18.63 -3,25 -24.52,37.33 -79.52,45.48 -111,76 -53.56,0.77 -152.83,-25.29 -157,-68 l 1,-2 c 11.98,0.17 18.31,6.12 26,7 l 6,-32 h 1 l 4,3 21,33 7,-1 11,-42 c 14.15,5.08 19.12,29.54 30,39 9.09,-5.68 14.02,-29.77 17,-41 13.22,7.89 19.81,26.08 34,32 l 2,-1 6,-34 h 1 l 27,25 c 4.37,-0.13 5.66,-0.41 8,-2 6.42,-6.74 2.48,-23.3 8,-31 l 26,19 4,-2 c 25.54,-11.06 -8.47,-73.74 -14,-82 h -1 l -21,12 c -2.76,-11.02 -5.77,-33.25 -13,-41 v 2 l -22,22 h -2 l -26,-42 -2,1 -18,34 -4,-3 -23,-36 -2,1 -19,45 -2,-1 -31,-45 -2,1 -23,46 -5,-1 -36,-43 z m 2.38e-4,-0.22618 -4,-19 104.000002,-24 c 88.01,-16.18 165.58,21.11 207,63 21.57,21.81 30.45,61.97 24,103 -1.48,9.42 1.19,18.63 -3,25 -24.52,37.33 -79.52,45.48 -111,76 -53.56,0.77 -152.83,-25.29 -157,-68 l 1,-2 c 11.98,0.17 18.31,6.12 26,7 l 6,-32 h 1 l 4,3 21,33 7,-1 11,-42 c 14.15,5.08 19.12,29.54 30,39 9.09,-5.68 14.02,-29.77 17,-41 13.22,7.89 19.81,26.08 34,32 l 2,-1 6,-34 h 1 l 27,25 c 4.37,-0.13 5.66,-0.41 8,-2 6.42,-6.74 2.48,-23.3 8,-31 l 26,19 4,-2 c 25.54,-11.06 -8.47,-73.74 -14,-82 h -1 l -21,12 c -2.76,-11.02 -5.77,-33.25 -13,-41 v 2 l -22,22 h -2 l -26,-42 -2,1 -18,34 -4,-3 -23,-36 -2,1 -19,45 -2,-1 -31,-45 -2,1 -23,46 -5,-1 -36,-43 z"
          id="gueule"
        />
        <path
          d="m 735.34,215 -49,-11 c -43.11,-10.9 -84.85,-22.61 -126,-32 l 21,-23 48,-38 c 35.96,-25.93 104.6,-60.83 160,-64 l -2,4 -20,28 c -19.2,34.71 -31.36,84.9 -32,136 z m 2.4e-4,-0.22618 -49,-11 c -43.11,-10.9 -84.85,-22.61 -126,-32 l 21,-23 48,-38 c 35.96,-25.930005 104.6,-60.830005 160,-64.000005 l -2,4 -20,28 c -19.2,34.710005 -31.36,84.900005 -32,136.000005 z"
          id="aileronHaut"
        />
        <path
          d="m 9.34,178 c 76.58,-0.27 179.46,-1.82 243,14 l 60,4 160,4 c 0.62,56.66 -20.79,94.33 -56,116 -6.83,4.2 -19.13,16.26 -27,15 -40.2,-16.37 -105.62,-53.55 -171,-43 l -57,8 c -17.66,4.47 -77.45,23.84 -92,21 C 58.31,289.5 -5.19,215.53 0.34,185 Z m 376,78 c -1.67,0.67 -6.33,1.33 -8,2 -3.33,2.67 -4.17,3.46 -7,8 -0.31,5.82 -0.37,11.98 2,15 2.66,5.99 7.51,8.8 16,9 9.36,-3.31 15,-7.26 15,-20 -3.91,-8.37 -7.62,-11.93 -18,-14 z M 9.3402376,177.77382 c 76.5800004,-0.27 179.4600024,-1.82 243.0000024,14 l 60,4 160,4 c 0.62,56.66 -20.79,94.33 -56,116 -6.83,4.2 -19.13,16.26 -27,15 -40.2,-16.37 -105.62,-53.55 -171,-43 l -57,8 c -17.66,4.47 -77.450002,23.84 -92.000002,21 -11.03,-27.5 -74.5300004,-101.47 -69.0000004,-132 z m 376.0000024,78 c -1.67,0.67 -6.33,1.33 -8,2 -3.33,2.67 -4.17,3.46 -7,8 -0.31,5.82 -0.37,11.98 2,15 2.66,5.99 7.51,8.8 16,9 9.36,-3.31 15,-7.26 15,-20 -3.91,-8.37 -7.62,-11.93 -18,-14 z"
          id="nez"
        />
      </g>
    </svg>
  )
}
