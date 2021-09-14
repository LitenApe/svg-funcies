// https://github.com/georgedoescode/generative-utils/blob/master/src/createCoordsTransformer.js
function createCoordsTransformer(svg: any) {
  const pt = svg.createSVGPoint();

  return function (e: any) {
    pt.x = e.clientX;
    pt.y = e.clientY;

    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };
}

export { createCoordsTransformer };
