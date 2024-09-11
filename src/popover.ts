import { Block, Paragraph, Property, Symbol, Vertex, Word } from './types.ts';

export class Popover {
  private element: HTMLElement;

  constructor(elementId: string) {
    this.element = document.getElementById(elementId)!;
  }

  public showAt(position: Vertex) {
    this.element.style.left = `${position.x + document.documentElement.scrollLeft + 15}px`;
    this.element.style.top = `${position.y + document.documentElement.scrollTop + 15}px`;

    this.element.style.display = 'block';
  }

  public hide() {
    this.element.style.display = 'none';
  }

  public setText(text: Record<string, any>) {
    this.element.innerHTML = Object.keys(text)
      .map((key) => `<b>${key}</b>: ${text[key]}`)
      .join('<br>');
  }

  public showBlockAt(position: Vertex, block: Block) {
    let text: Record<string, any> = {
      blockType: block.blockType,
      '#paragraphs': block.paragraphs.length,
    };

    if (block.property) {
      text = { ...text, ...this.propertyToString(block.property) };
    }

    if (block.confidence) {
      text['confidence'] = (block.confidence * 100).toFixed(2) + '%';
    }

    this.setText(text);
    this.showAt(position);
  }

  public showParagraphAt(position: Vertex, paragraph: Paragraph) {
    let text: Record<string, any> = { '#words': paragraph.words.length };

    if (paragraph.property) {
      text = { ...text, ...this.propertyToString(paragraph.property) };
    }

    if (paragraph.confidence) {
      text['confidence'] = (paragraph.confidence * 100).toFixed(2) + '%';
    }

    this.setText(text);
    this.showAt(position);
  }

  public showWordAt(position: Vertex, word: Word) {
    let text: Record<string, any> = { text: word.symbols.map((symbol) => symbol.text).join('') };

    if (word.property) {
      text = { ...text, ...this.propertyToString(word.property) };
    }

    if (word.confidence) {
      text['confidence'] = (word.confidence * 100).toFixed(2) + '%';
    }

    this.setText(text);
    this.showAt(position);
  }

  public showSymbolAt(position: Vertex, symbol: Symbol) {
    let text: Record<string, any> = { text: symbol.text };

    if (symbol.property) {
      text = { ...text, ...this.propertyToString(symbol.property) };
    }

    if (symbol.confidence) {
      text['confidence'] = (symbol.confidence * 100).toFixed(2) + '%';
    }

    this.setText(text);
    this.showAt(position);
  }

  private propertyToString(property: Property): Record<string, any> {
    let text: { [key: string]: string } = {};

    if (property.detectedLanguages) {
      text['languages'] = property.detectedLanguages
        .map((language) => `${language.languageCode} (${(language.confidence * 100).toFixed(2)}%)`)
        .join(', ');
    }

    if (property.detectedBreak) {
      text['break'] = property.detectedBreak.type;
    }

    return text;
  }
}
