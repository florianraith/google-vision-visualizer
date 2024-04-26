import { MouseListener } from './mouseListener.ts';
import { Popover } from './popover.ts';
import { Renderer } from './render.ts';
import { Annotation } from './types.ts';
import { isInside, isSurrounding } from './utils.ts';

export class Visualizer {

  private mouseListener: MouseListener;
  private popover: Popover;
  private renderer: Renderer;
  private surroundingAnnotation: Annotation;

  constructor(private annotations: Annotation[]) {
    this.mouseListener = new MouseListener();
    this.popover = new Popover('annotation', 'text');
    this.renderer = new Renderer('canvas');
    this.surroundingAnnotation = this.calculateSurroundingAnnotation();
  }

  public start() {
    const image = new Image();
    image.src = './assets/image.jpg';
    image.onload = () => {
      this.renderer.renderImage(image);
      this.loop();
    };
  }

  private loop() {
    let hoveringAnnotation: Annotation|null = null;

    for (const annotation of this.annotations) {
      let color = 'red';

      const mouse = this.mouseListener.getMouseOverCanvas(this.renderer.canvas);

      if (isInside(mouse, annotation.boundingPoly)) {
        color = 'blue';
        hoveringAnnotation = annotation;
      }

      this.renderer.renderBoundingPoly(annotation.boundingPoly, color);
    }

    if (hoveringAnnotation && hoveringAnnotation !== this.surroundingAnnotation) {
      this.popover.setText(hoveringAnnotation.description);
      this.popover.showAt(this.mouseListener.getMouse());
    } else {
      this.popover.hide();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  private calculateSurroundingAnnotation() {
    let surroundingAnnotation = this.annotations[0];

    for (const annotation of this.annotations) {
      if (isSurrounding(annotation.boundingPoly, surroundingAnnotation.boundingPoly)) {
        surroundingAnnotation = annotation;
      }
    }

    return surroundingAnnotation;
  }

}