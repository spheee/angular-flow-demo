// import './intersect-ellipse';
// import './intersect-node';
// import './intersect-rect';
// import './intersect-circle';
// import './intersect-polygon';


// module.exports = {
//     node: intersectNode,
//     circle: intersectCircle,
//     ellipse: intersectEllipse,
//     rect: intersectRect,
//     polygon: intersectPolygon
// };


module.exports = {
    node: require('./intersect-node'),
    circle: require('./intersect-circle'),
    ellipse: require('./intersect-ellipse'),
    polygon: require('./intersect-polygon'),
    rect: require('./intersect-rect')
  };
