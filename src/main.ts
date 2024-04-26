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

const visualizer = new Visualizer(data.textAnnotations);
visualizer.start();

alpine.onChangeMode((mode) => {

});