import { BoundingPoly } from './types.ts';

export class Renderer {

  public readonly canvas: HTMLCanvasElement;
  public readonly context: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;

    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public renderImage(image: HTMLImageElement) {
    this.canvas.width = image.width;
    this.canvas.height = image.height;

    this.context.drawImage(image, 0, 0);
  }

  public renderBoundingPoly(poly: BoundingPoly, color: string): void {
    this.context.strokeStyle = color;
    this.context.lineWidth = 5;
    this.context.beginPath();

    const firstVertex = poly.vertices[0];
    this.context.moveTo(firstVertex.x, firstVertex.y);

    for (let i = 1; i < poly.vertices.length; i++) {
      const vertex = poly.vertices[i];
      this.context.lineTo(vertex.x, vertex.y);
    }

    this.context.lineTo(firstVertex.x, firstVertex.y);
    this.context.stroke();
  }

}