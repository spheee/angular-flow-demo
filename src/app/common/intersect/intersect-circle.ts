import './intersect-ellipse';

function intersectCircle(node, rx, point) {
  return intersectEllipse(node, rx, rx, point);
}
module.exports = intersectCircle;

