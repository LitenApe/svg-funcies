import { SVG } from '@svgdotjs/svg.js';
import { random } from '../utils/random';

const canvas = SVG().addTo('#gridded-circles').viewbox(0, 0, 200, 200);

function getHSLColor(base: number, saturation = 75, lightness = 75) {
  return `hsl(${base}, ${saturation}%, ${lightness}%)`;
}

for (let x = 10; x < 200; x += 20) {
  for (let y = 10; y < 200; y += 20) {
    const size = random(5, 10, true);
    const offset_x = random(x - 5, x + 5, true);
    const offset_y = random(y - 5, y + 5, true);
    const color = getHSLColor(random(0, 360, true));
    canvas.circle(size).cx(offset_x).cy(offset_y).fill(color);
  }
}
