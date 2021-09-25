import { Circle, SVG } from '@svgdotjs/svg.js';
import { createCoordsTransformer } from '../utils/createCoordsTransformer';
import { random } from '../utils/random';

const canvas = SVG().addTo('#cursor-trail').viewbox(0, 0, 200, 200);
const transform = createCoordsTransformer(canvas.node);

function getHSLColor(base: number, saturation = 75, lightness = 75) {
  return `hsl(${base}, ${saturation}%, ${lightness}%)`;
}

function decay(circle: Circle) {
  let timer: number;

  function decayHelper() {
    const size = circle.width();
    circle.size(Number(size) - 1);

    if (size === 0 && timer !== undefined) clearInterval(timer);
  }

  timer = setInterval(decayHelper, 50);
}

function onMouseMove(event: MouseEvent) {
  const { x, y } = transform(event);

  const dot = canvas
    .circle(10)
    .cx(x)
    .cy(y)
    .fill(getHSLColor(random(0, 360, true)));

  decay(dot);
}

function onEnter() {
  document.onmousemove = onMouseMove;
}
canvas.mouseenter(onEnter);

function onLeave() {
  document.onmousemove = null;
}
canvas.mouseleave(onLeave);
