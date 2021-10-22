import { SVG } from '@svgdotjs/svg.js';
import { random, randomColor } from '../utils/random';
import { createVoronoiTessellation } from '@georgedoescode/generative-utils';
import { getMetaInfo } from '../utils/getMetaInfo';

const canvas = SVG().addTo('#voronoi').viewbox(0, 0, 200, 200);

// pushes the x = 0 to the left of the canvas
canvas.node.setAttribute('preserveAspectRatio', 'xMinYMin meet');

const { start_x, end_x, start_y, end_y, width, height } = getMetaInfo(
  canvas.node
);

const points = Array.from(Array(512), () => ({
  x: random(start_x, end_x),
  y: random(start_y, end_y),
}));

const tessalation = createVoronoiTessellation({
  width,
  height,
  points,
  relaxIterations: 6,
});

tessalation.cells.forEach((cell: any) => {
  canvas.polygon(cell.points).fill('none').stroke(randomColor());

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
