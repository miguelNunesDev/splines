import { Spline } from './Spline.js';
import { View } from './View.js';
import { MouseState, Vector } from './types.js';
import { Circle } from './Circle.js';
var Doc = document;
Doc.view = new View('#canvas');
var view = Doc.view;
document.addEventListener('DOMContentLoaded', function () {
    view.init();
    view.update();
    var cubicBezier = new Spline(new Vector(60, 220), new Vector(600, 220), 'bezier');
    view.mouse.debug = new Circle(new Vector(0, 0), 2, view.mouse, 'blue');
    view.collision.listen(view.mouse, cubicBezier.handler, function (collider, collided) {
        if (collider.state === MouseState.L_DOWN) {
            requestAnimationFrame(function () {
                var offset = Vector.sub(collider.position, collided.center);
                collided.center = collider.position;
                var left = collided.parent.weightHandler.left;
                var right = collided.parent.weightHandler.right;
                left.center = Vector.add(left.center, offset);
                right.center = Vector.add(right.center, offset);
            });
        }
    });
    view.collision.listen(view.mouse, cubicBezier.weightHandler.left, function (collider, collided) {
        if (collider.state === MouseState.L_DOWN) {
            requestAnimationFrame(function () {
                var offset = Vector.sub(collider.position, collided.center);
                collided.center = collider.position;
                var handler = collided.parent.handler;
            });
        }
    });
    view.collision.listen(view.mouse, cubicBezier.weightHandler.right, function (collider, collided) {
        if (collider.state === MouseState.L_DOWN) {
            requestAnimationFrame(function () {
                var offset = Vector.sub(collider.position, collided.center);
                collided.center = collider.position;
                var handler = collided.parent.handler;
            });
        }
    });
});
//# sourceMappingURL=index.js.map