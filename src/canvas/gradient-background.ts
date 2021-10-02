import { SVG } from '@svgdotjs/svg.js';
import { random, randomColor } from '../utils/random';

const canvas = SVG().addTo('#gradient-background');

const base = random(0, 360);
const colors = Array.from(Array(6), (_, i) =>
  randomColor(base, 100 - i * 15, 70)
).reverse();

function getCoord(node: SVGSVGElement, x: number, y: number) {
  const pt = node.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(node.getScreenCTM()?.inverse());
}

const node = canvas.node;
const client = node.getBoundingClientRect();
const top_left = getCoord(node, client.x, client.y);
const top_right = getCoord(node, client.x + client.width, client.y);
const bottom_left = getCoord(node, client.x, client.y + client.height);

const step_width = (top_right.x - top_left.x) / 6;
const step_height = (bottom_left.y - top_left.y) / 6;

colors.map((color, i) => {
  const offset_width = i * step_width;
  const offset_heigth = i * step_height;

  const start_x = top_left.x + offset_width;
  const start_y = top_right.y + offset_heigth;

  const start = `M${start_x} ${top_left.y}`;
  const line_one = `L ${start_x + step_width} ${top_left.y}`;
  const line_two = `L ${top_left.x} ${start_y + step_height}`;
  const line_three = `L ${top_left.x} ${start_y}`;

  canvas
    .path(`${start} ${line_one} ${line_two} ${line_three}`)
    .fill(color)
    .stroke(color);
});

colors.map((color, i) => {
  const offset_width = i * step_width;
  const offset_heigth = i * step_height;

  const start_x = top_right.x - offset_width;
  const start_y = bottom_left.y - offset_heigth;

  const start = `M ${start_x} ${bottom_left.y}`;
  const line_one = `L ${start_x - step_width} ${bottom_left.y}`;
  const line_two = `L ${top_right.x} ${start_y - step_height}`;
  const line_three = `L ${top_right.x} ${start_y}`;

  canvas
    .path(`${start} ${line_one} ${line_two} ${line_three}`)
    .fill(color)
    .stroke(color);
});
