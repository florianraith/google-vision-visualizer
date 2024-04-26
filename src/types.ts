export type VisionResponse = {
  fullTextAnnotation: {
    text: string,
  },
  textAnnotations: Annotation[],
}

export type Annotation = {
  description: string,
  boundingPoly: BoundingPoly,
}

export type BoundingPoly = {
  vertices: [Vertex, Vertex, Vertex, Vertex],
}

export type Vertex = {
  x: number,
  y: number,
}