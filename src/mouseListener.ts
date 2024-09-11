import { Vertex } from './types.ts';

export class MouseListener {
  private mouseX = 0;
  private mouseY = 0;

  constructor() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    scrollX = window.scrollX;
    scrollY = window.scrollY;
  }

  public getMouse(): Vertex {
    return { x: this.mouseX, y: this.mouseY };
  }

  public getMouseOverCanvas(canvas: HTMLCanvasElement): Vertex {
    const boundingRect = canvas.getBoundingClientRect();

    let mouseX = this.mouseX - boundingRect.left;
    let mouseY = this.mouseY - boundingRect.top;

    mouseX *= canvas.width / canvas.clientWidth;
    mouseY *= canvas.height / canvas.clientHeight;

    return { x: mouseX, y: mouseY };
  }
}
