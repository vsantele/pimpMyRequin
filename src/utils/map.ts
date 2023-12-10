import { LatLngBoundsExpression } from "leaflet"

export function getBounds(points: [number, number][]): LatLngBoundsExpression {
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
