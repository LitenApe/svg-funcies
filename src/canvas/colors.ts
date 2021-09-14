import { SVG } from '@svgdotjs/svg.js';
import { random } from '../utils/random';

const canvas = SVG().addTo('#colors').viewbox(0, 0, 200, 200);

const baseHue = random(0, 360, true);

function getHSLColor(base: number, saturation = 75, lightness = 75) {
  return `hsl(${base}, ${saturation}%, ${lightness}%)`;
}

canvas.rect(44, 44).cx(100).cy(100).fill(getHSLColor(baseHue));
canvas
  .rect(44, 44)
  .cx(100 - 44)
  .cy(100)
  .fill(getHSLColor(baseHue + 160));
canvas
  .rect(44, 44)
  .cx(100 + 44)
  .cy(100)
  .fill(getHSLColor(baseHue + 260));
