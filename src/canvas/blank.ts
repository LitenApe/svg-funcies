import { SVG } from '@svgdotjs/svg.js';
import { getMetaInfo } from '../utils/getMetaInfo';
import { randomColor } from '../utils/random';

const canvas = SVG().addTo('#blank').viewbox(0, 0, 200, 200);

canvas.rect(200, 200).cx(100).cy(100).fill(randomColor());

const text = canvas.text('');
canvas.click(() => {
  const metadata = getMetaInfo(canvas.node);
  text.text(`w: ${metadata.width} | h: ${metadata.height}`).cx(100).cy(100);
});
