import { SVG } from '@svgdotjs/svg.js';
import { random, randomColor } from '../utils/random';

const canvas = SVG().addTo('#wave-gradient-background');

const base = random(0, 360);
const colors = Array.from(Array(4), (_, i) =>
  randomColor(base, 100 - i * 20, 70)
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

// background
canvas
  .path(
    `M ${top_left.x} ${top_left.y} L ${top_right.x} ${top_right.y} L ${top_right.x} ${bottom_left.y} L ${bottom_left.x} ${bottom_left.y}`
  )
  .fill(colors[0])
  .stroke(colors[0]);

// waves
const spacing_width = ((top_right.x - top_left.x) * 0.95) / 4;
const spacing_height = ((bottom_left.y - top_left.y) * 0.98) / 4;

function createWave(offset_x: number, offset_y: number, color: string) {
  const start_wave_x = top_left.x + offset_x;
  const end_wave_y = top_left.y + offset_y;

  const step_length =
    Math.sqrt(
      Math.pow(start_wave_x - top_left.x, 2) + (end_wave_y - top_left.y)
    ) / 9;

  const points = Array.from(Array(9), (_, i) => {
    const ref_point_x = start_wave_x - step_length * i;
    const ref_point_y = top_left.y + step_length * i;
    const noise = step_length;
    const point_x = random(ref_point_x - noise, ref_point_x + noise);
    const point_y = random(ref_point_y - noise, ref_point_y + noise);
    return [point_x, point_y];
  });
  const curves = points.reduce((acc, coord, i) => {
    return `${acc}${coord[0]},${coord[1]}${i !== 8 ? ',' : ''}`;
  }, 'C ');

  const start = `M ${top_left.x} ${top_left.y}`;
  const curve_start = `L ${start_wave_x}, ${top_left.y}`;
  const end = `S ${points[points.length - 1][0]},${
    points[points.length - 1][1]
  } ${top_left.x},${end_wave_y}`;

  canvas
    .path(`${start} ${curve_start} ${curves} ${end}`)
    .fill(color)
    .stroke(color);
}

createWave(spacing_width * 4, spacing_height * 4, colors[1]);
createWave(spacing_width * 3, spacing_height * 3, colors[2]);
createWave(spacing_width * 2, spacing_height * 2, colors[3]);
