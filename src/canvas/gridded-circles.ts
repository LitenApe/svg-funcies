import { SVG } from '@svgdotjs/svg.js';
import { random } from '../utils/random';

const canvas = SVG().addTo('#gridded-circles').viewbox(0, 0, 200, 200);

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

function getHSLColor(base: number, saturation = 75, lightness = 75) {
  return `hsl(${base}, ${saturation}%, ${lightness}%)`;
}

for (let x = top_left.x; x < top_right.x; x += 20) {
  for (let y = 10; y < 200; y += 20) {
    const size = random(5, 10, true);
    const offset_x = random(x - 5, x + 5, true);
    const offset_y = random(y - 5, y + 5, true);
    const color = getHSLColor(random(0, 360, true));
    canvas.circle(size).cx(offset_x).cy(offset_y).fill(color);
  }
}
