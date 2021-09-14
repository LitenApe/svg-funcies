import { SVG } from '@svgdotjs/svg.js';
import { createCoordsTransformer } from '../utils/createCoordsTransformer';
import { random } from '../utils/random';

const canvas = SVG().addTo('#circle-on-click').viewbox(0, 0, 200, 200);

const transform = createCoordsTransformer(canvas.node);
const text = canvas.text('x: 0 | y: 0').cx(100).cy(100);

function getHSLColor(base: number, saturation = 75, lightness = 75) {
  return `hsl(${base}, ${saturation}%, ${lightness}%)`;
}

function updateText(x: number, y: number) {
  text.text(`x: ${Math.round(x * 10) / 10} | y: ${Math.round(y * 10) / 10}`);
  text.center(100, 100);
  text.front();
}

function position(event: MouseEvent) {
  const { x, y } = transform(event);

  const base = random(0, 360, true);
  const size = random(5, 15, true);

  canvas.circle(size, size).cx(x).cy(y).fill(getHSLColor(base));

  updateText(x, y);
}

canvas.click(position);
