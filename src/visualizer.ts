import { MouseListener } from './mouseListener.ts';
import { Popover } from './popover.ts';
import { Renderer } from './render.ts';
import { Annotation, Page } from './types.ts';
import { isInside, isSurrounding } from './utils.ts';

export class Visualizer {
  private mode: 'none' | 'annotation' | 'page' = 'none';
  private mouseListener: MouseListener;
  private popover: Popover;
  private renderer: Renderer;
  private surroundingAnnotation: Annotation | null = null;

  private annotations: Annotation[] = [];

  public static readonly PAGES = 0;
  public static readonly BLOCKS = 1;
  public static readonly PARAGRAPHS = 2;
  public static readonly WORDS = 3;
  public static readonly SYMBOLS = 4;

  private detail: number = Visualizer.BLOCKS;
  private pages: Page[] = [];

  constructor() {
    this.mouseListener = new MouseListener();
    this.popover = new Popover('annotation');
    this.renderer = new Renderer('canvas');
  }

  public annotationMode(annotations: Annotation[]) {
    this.mode = 'annotation';
    this.annotations = annotations;
    this.surroundingAnnotation = this.calculateSurroundingAnnotation();
  }

  public pageMode(pages: Page[]) {
    this.mode = 'page';
    this.pages = pages;
  }

  public setDetail(detail: number) {
    this.detail = detail;
  }

  public start() {
    const image = new Image();
    image.src = './assets/image.jpg';
    image.onload = () => {
      this.renderer.setImage(image);
      this.loop();
    };
  }

  private loop() {
    this.renderer.clear();

    if (this.mode === 'annotation') {
      this.loopAnnotations();
    } else if (this.mode === 'page') {
      this.loopPages();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  private loopAnnotations() {
    let hoveringAnnotation: Annotation | null = null;

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
      this.popover.setText({ text: hoveringAnnotation.description });
      this.popover.showAt(this.mouseListener.getMouse());
    } else {
      this.popover.hide();
    }
  }

  private loopPages() {
    const mouse = this.mouseListener.getMouseOverCanvas(this.renderer.canvas);
    this.popover.hide();

    // todo: refactor this pyramid of doom, lol

    for (const page of this.pages) {
      if (this.detail < Visualizer.BLOCKS) {
        continue;
      }

      for (const block of page.blocks) {
        const insideBlock = isInside(mouse, block.boundingBox);
        this.renderer.renderBoundingPoly(block.boundingBox, this.leveledColor(Visualizer.BLOCKS, insideBlock));

        if (this.detail === Visualizer.BLOCKS && insideBlock) {
          this.popover.showBlockAt(this.mouseListener.getMouse(), block);
        }

        if (this.detail < Visualizer.PARAGRAPHS) {
          continue;
        }

        for (const paragraph of block.paragraphs) {
          const insideParagraph = isInside(mouse, paragraph.boundingBox);
          this.renderer.renderBoundingPoly(
            paragraph.boundingBox,
            this.leveledColor(Visualizer.PARAGRAPHS, insideParagraph),
          );

          if (this.detail === Visualizer.PARAGRAPHS && insideParagraph) {
            this.popover.showParagraphAt(this.mouseListener.getMouse(), paragraph);
          }

          if (this.detail < Visualizer.WORDS) {
            continue;
          }

          for (const word of paragraph.words) {
            const insideWord = isInside(mouse, word.boundingBox);
            this.renderer.renderBoundingPoly(word.boundingBox, this.leveledColor(Visualizer.WORDS, insideWord));

            if (this.detail === Visualizer.WORDS && insideWord) {
              this.popover.showWordAt(this.mouseListener.getMouse(), word);
            }

            if (this.detail < Visualizer.SYMBOLS) {
              continue;
            }

            for (const symbol of word.symbols) {
              const insideSymbol = isInside(mouse, symbol.boundingBox);
              this.renderer.renderBoundingPoly(symbol.boundingBox, this.leveledColor(Visualizer.SYMBOLS, insideSymbol));

              if (insideSymbol) {
                this.popover.showSymbolAt(this.mouseListener.getMouse(), symbol);
              }
            }
          }
        }
      }
    }
  }

  private leveledColor(level: number, inside: boolean): string {
    let opacity = (level / this.detail) ** 2;

    const color = inside ? '0, 0, 255' : '255, 0, 0';

    return `rgba(${color}, ${opacity})`;
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
