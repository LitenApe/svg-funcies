import { SVG } from '@svgdotjs/svg.js';
import { getMetaInfo } from '../utils/getMetaInfo';
import { randomColor } from '../utils/random';

const canvas = SVG().addTo('#diamond-grid').viewbox(0, 0, 200, 200);

const { start_x, end_x, start_y, end_y } = getMetaInfo(canvas.node);

for (let x = start_x; x < end_x; x += 15) {
  for (let y = start_y; y < end_y; y += 15) {
    canvas.rect(5, 5).cx(x).cy(y).fill(randomColor()).transform({ rotate: 45 });
  }
}
