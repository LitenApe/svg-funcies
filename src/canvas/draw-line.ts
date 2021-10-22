import { SVG } from '@svgdotjs/svg.js';
import { getMetaInfo } from '../utils/getMetaInfo';
import { random, randomColor } from '../utils/random';

const canvas = SVG().addTo('#draw-line').viewbox(0, 0, 200, 200);

function build() {
  canvas.clear();
  const { start_x, end_x, start_y, end_y, width } = getMetaInfo(canvas.node);

  const center = width / 2;
  const start = `${center},${start_y}`;
  const end = `${center},${end_y}`;

  const points = Array.from(Array(6), (_, i) => {
    const offset = i < 2 ? 0 : random(25, 50);
    const r = random(start_x + offset, end_x - offset);
    return r;
  }).reduce((acc, cur, i) => `${acc}${i === 0 ? '' : ','}${cur}`, '');
  canvas
    .path(
      `M${start} C${points} S${random(center - 20, center + 20)},${
        end_y * 0.8
      } ${end}`
    )
    .fill('none')
    .stroke(randomColor());
}

canvas.click(build);
