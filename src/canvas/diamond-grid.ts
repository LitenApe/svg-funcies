import { SVG } from '@svgdotjs/svg.js';
import { random } from '../utils/random';

const canvas = SVG().addTo('#diamond-grid').viewbox(0, 0, 200, 200);

const node = canvas.node;

function getCoord(node: SVGSVGElement, x: number, y: number) {
  const pt = node.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(node.getScreenCTM()?.inverse());
}

const client = node.getBoundingClientRect();
const top_left = getCoord(node, client.x, client.y);
const top_right = getCoord(node, client.x + client.width, client.y);
const bottom_left = getCoord(node, client.x, client.y + client.height);

function getHSLColor(base: number, saturation = 75, lightness = 75) {
  return `hsl(${base}, ${saturation}%, ${lightness}%)`;
}

for (let x = top_left.x; x < top_right.x; x += 15) {
  for (let y = top_left.y; y < bottom_left.y; y += 15) {
    const color = getHSLColor(random(0, 360, true));
    canvas.rect(5, 5).cx(x).cy(y).fill(color).transform({ rotate: 45 });
  }
}
