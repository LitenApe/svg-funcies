import { SVG } from '@svgdotjs/svg.js';
import { getMetaInfo } from '../utils/getMetaInfo';
import { random, randomColor } from '../utils/random';

const canvas = SVG().addTo('#gradient-background');

const base = random(0, 360);
const colors = Array.from(Array(6), (_, i) =>
  randomColor(base, 100 - i * 15, 70)
).reverse();

const { start_x, end_x, start_y, end_y, width, height } = getMetaInfo(
  canvas.node
);

const step_width = width / 6;
const step_height = height / 6;

colors.map((color, i) => {
  const offset_width = i * step_width;
  const offset_heigth = i * step_height;

  const x = start_x + offset_width;
  const y = start_y + offset_heigth;

  const start = `M${x} ${start_y}`;
  const line_one = `L ${x + step_width} ${start_y}`;
  const line_two = `L ${start_x} ${y + step_height}`;
  const line_three = `L ${start_x} ${y}`;

  canvas
    .path(`${start} ${line_one} ${line_two} ${line_three}`)
    .fill(color)
    .stroke(color);
});

colors.map((color, i) => {
  const offset_width = i * step_width;
  const offset_heigth = i * step_height;

  const x = end_x - offset_width;
  const y = end_y - offset_heigth;

  const start = `M ${x} ${end_y}`;
  const line_one = `L ${x - step_width} ${end_y}`;
  const line_two = `L ${end_x} ${y - step_height}`;
  const line_three = `L ${end_x} ${y}`;

  canvas
    .path(`${start} ${line_one} ${line_two} ${line_three}`)
    .fill(color)
    .stroke(color);
});
