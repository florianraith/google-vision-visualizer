import { Vertex } from './types.ts';

export class Popover {

  private element: HTMLElement;
  private textElement: HTMLElement;

  constructor(elementId: string, textId: string) {
    this.element = document.getElementById(elementId)!;
    this.textElement = document.getElementById(textId)!;
  }

  public showAt(position: Vertex) {
    this.element.style.left = `${position.x + document.documentElement.scrollLeft + 20}px`;
    this.element.style.top = `${position.y + document.documentElement.scrollTop + 20}px`;

    this.element.style.display = 'block';
  }

  public hide() {
    this.element.style.display = 'none';
  }

  public setText(text: string) {
    this.textElement.innerText = text;
  }

}