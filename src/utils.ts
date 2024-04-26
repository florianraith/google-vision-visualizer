import { BoundingPoly, Vertex } from './types.ts';

export function isInside(vertex: Vertex, poly: BoundingPoly): boolean {
  const { x, y } = vertex;
  const { vertices } = poly;

  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

export function isSurrounding(outer: BoundingPoly, inner: BoundingPoly): boolean {
  const innerVertices = inner.vertices;

  for (let i = 0; i < innerVertices.length; i++) {
    const vertex = innerVertices[i];
    if (!isInside(vertex, outer)) {
      return false;
    }
  }

  return true;
}

// adds missing x and y properties to vertices
export function fixBoundingPoly(poly: BoundingPoly) {
  for (let i = 0; i < poly.vertices.length; i++) {
    if (!('x' in poly.vertices[i])) {
      poly.vertices[i].x = 0;
    }

    if (!('y' in poly.vertices[i])) {
      poly.vertices[i].y = 0;
    }
  }
}
