import { SVG } from '@svgdotjs/svg.js';
import { random, randomColor } from '../utils/random';
import { createVoronoiTessellation } from '@georgedoescode/generative-utils';

const canvas = SVG().addTo('#voronoi').viewbox(0, 0, 200, 200);
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

const points = Array.from(Array(1024), () => ({
  x: random(top_left.x, top_right.x),
  y: random(top_left.y, bottom_left.y),
}));

// points.forEach(({ x, y }) => {
//   canvas.circle(1).cx(x).cy(y).fill(randomColor());
// });

const width = top_right.x - top_left.x;
const height = bottom_left.y - top_left.y;

const tessalation = createVoronoiTessellation({
  width,
  height,
  points,
  relaxIterations: 6,
});

tessalation.cells.forEach((cell: any) => {
  // canvas.polygon(cell.points).fill('none').stroke(randomColor());

  const variant = random(0, 100);

  if (variant < 50) {
    canvas
      .circle(cell.innerCircleRadius * 2)
      .cx(cell.centroid.x)
      .cy(cell.centroid.y)
      .fill(randomColor())
      .scale(0.75);
  } else {
    canvas
      .line(
        cell.centroid.x - cell.innerCircleRadius / 2,
        cell.centroid.y - cell.innerCircleRadius / 2,
        cell.centroid.x + cell.innerCircleRadius / 2,
        cell.centroid.y + cell.innerCircleRadius / 2
      )
      .stroke({
        width: cell.innerCircleRadius / 2,
        color: randomColor(),
      })
      .rotate(random(0, 360));
  }
});
