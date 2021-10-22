import { SVG } from '@svgdotjs/svg.js';
import { getMetaInfo } from '../utils/getMetaInfo';
import { random, randomColor } from '../utils/random';

const canvas = SVG().addTo('#gridded-circles').viewbox(0, 0, 200, 200);

const { start_x, end_x, start_y, end_y } = getMetaInfo(canvas.node);

for (let x = start_x; x < end_x; x += 15) {
  for (let y = start_y; y < end_y; y += 15) {
    const size = random(5, 10, true);
    const offset_x = random(x - 5, x + 5, true);
    const offset_y = random(y - 5, y + 5, true);
    const color = randomColor();
    canvas.circle(size).cx(offset_x).cy(offset_y).fill(color);
  }
}
