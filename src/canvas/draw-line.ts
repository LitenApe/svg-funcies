import { SVG } from '@svgdotjs/svg.js';
import { random, randomColor } from '../utils/random';

const canvas = SVG().addTo('#draw-line').viewbox(0, 0, 200, 200);

function getCoord(node: SVGSVGElement, x: number, y: number) {
  const pt = node.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(node.getScreenCTM()?.inverse());
}

function build() {
  const node = canvas.node;
  const client = node.getBoundingClientRect();
  const top_left = getCoord(node, client.x, client.y);
  const top_right = getCoord(node, client.x + client.width, client.y);
  const bottom_left = getCoord(node, client.x, client.y + client.height);

  const center = (top_right.x - top_left.x) / 2;
  const start = `${center},${top_left.y}`;
  const end = `${center},${bottom_left.y}`;

  const points = Array.from(Array(6), (_, i) => {
    const offset = i < 2 ? 0 : random(25, 50);
    const r = random(top_left.x + offset, top_right.x - offset);
    return r;
  }).reduce((acc, cur, i) => `${acc}${i === 0 ? '' : ','}${cur}`, '');
  const color = randomColor();
  canvas
    .path(
      `M${start} C${points} S${random(center - 20, center + 20)},${
        bottom_left.y * 0.8
      } ${end}`
    )
    .fill('none')
    .stroke(color);
}

canvas.click(build);
