function getCoord(node: SVGSVGElement, x: number, y: number) {
  const pt = node.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(node.getScreenCTM()?.inverse());
}

export function getMetaInfo(node: SVGSVGElement) {
  const client = node.getBoundingClientRect();
  const top_left = getCoord(node, client.x, client.y);
  const top_right = getCoord(node, client.x + client.width, client.y);
  const bottom_left = getCoord(node, client.x, client.y + client.height);

  return {
    start_x: top_left.x,
    end_x: top_right.x,
    start_y: top_left.y,
    end_y: bottom_left.y,
    height: Math.round((bottom_left.y - top_left.y) * 100) / 100,
    width: Math.round((top_right.x - top_left.x) * 100) / 100,
  };
}
