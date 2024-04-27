export type VisionResponse = {
  fullTextAnnotation: {
    text: string,
    pages: Page[],
  },
  textAnnotations: Annotation[],
}

export type Page = {
  blocks: Block[],
  width: number,
  height: number,
  property?: Property,
  confidence?: number,
}

export type Block = {
  blockType: string,
  boundingBox: BoundingPoly,
  paragraphs: Paragraph[],
  property?: Property,
  confidence?: number,
}

export type Paragraph = {
  boundingBox: BoundingPoly,
  words: Word[],
  property?: Property,
  confidence?: number,
}

export type Word = {
  boundingBox: BoundingPoly,
  symbols: Symbol[],
  property?: Property,
  confidence?: number,
}

export type Symbol = {
  boundingBox: BoundingPoly,
  text: string,
  property?: Property,
  confidence?: number,
}

export type Property = {
  detectedLanguages?: DetectedLanguage[],
  detectedBreak?: { type: string },
}

export type DetectedLanguage = {
  languageCode: string,
  confidence: number,
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