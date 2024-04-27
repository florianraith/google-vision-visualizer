import 'bootstrap/dist/css/bootstrap.min.css';
import { visionData } from './vision-mock';
import { VisionResponse } from './types.ts';
import { fixBoundingPoly } from './utils.ts';
import { Visualizer } from './visualizer.ts';
import { alpine } from './alpine.ts';

alpine.start();

const data: VisionResponse = JSON.parse(visionData);
data.textAnnotations.forEach((annotation) => fixBoundingPoly(annotation.boundingPoly));

document.getElementById('output')!.innerHTML = data.fullTextAnnotation.text;

const visualizer = new Visualizer();
visualizer.annotationMode(data.textAnnotations);
visualizer.start();

alpine.onChangeMode((mode) => {
  if (mode === 'text') {
    visualizer.annotationMode(data.textAnnotations);
  } else if (mode === 'full-text') {
    visualizer.pageMode(data.fullTextAnnotation.pages);
  }
});

alpine.onChangeDetail((detail) => {
  const detailToNumber: Record<string, number> = {
    pages: Visualizer.PAGES,
    blocks: Visualizer.BLOCKS,
    paragraphs: Visualizer.PARAGRAPHS,
    words: Visualizer.WORDS,
    symbols: Visualizer.SYMBOLS,
  };

  visualizer.setDetail(detailToNumber[detail]);
});