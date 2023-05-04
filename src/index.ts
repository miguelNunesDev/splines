import { Spline } from './Spline.js';
import { View } from './View.js'
import { MouseState, Vector } from './types.js';
import { Circle } from './Circle.js';
import { MouseController } from './MouseController.js';
import { lerp } from './Helper.js';

const Doc: any = document;
Doc.view = new View('#canvas');
const view: View = Doc.view;

document.addEventListener('DOMContentLoaded', () => {
    view.init();
    view.update();
    // const quadraticBezier = new Spline(
    //     new Vector(20, 60),
    //     new Vector(200, 60),
    // );
    const cubicBezier = new Spline(
        new Vector(60, 220),
        new Vector(600, 220),
        'bezier'
    );
    view.mouse.debug = new Circle(new Vector(0, 0), 2, view.mouse, 'blue')
    // view.collision.listen(view.mouse, quadraticBezier.handler, (collider: MouseController, collided: Circle) => {
    //     if (collider.state === MouseState.L_DOWN) {
    //         requestAnimationFrame(() => {
    //             const offset = Vector.sub(collider.position, collided.center)
    //             collided.center = collider.position;
    //         })
    //     }

    // })
    view.collision.listen(view.mouse, cubicBezier.handler, (collider: MouseController, collided: Circle) => {
        if (collider.state === MouseState.L_DOWN) {
            requestAnimationFrame(() => {
                const offset = Vector.sub(collider.position, collided.center)
                collided.center = collider.position;

                const left = collided.parent.weightHandler.left;
                const right = collided.parent.weightHandler.right;
                left.center = Vector.add(left.center, offset);
                right.center = Vector.add(right.center, offset);

            })
        }

    })

    view.collision.listen(view.mouse, cubicBezier.weightHandler.left, (collider: MouseController, collided: Circle) => {
        if (collider.state === MouseState.L_DOWN) {
            requestAnimationFrame(() => {
                const offset = Vector.sub(collider.position, collided.center)
                collided.center = collider.position;
                const handler = collided.parent.handler;
                
                // const right = collided.parent.weightHandler.right;
                // const left = collided;

                // handler.center = lerp(left.center,right.center, 0.5)

            })
        }
    })
    view.collision.listen(view.mouse, cubicBezier.weightHandler.right, (collider: MouseController, collided: Circle) => {
        if (collider.state === MouseState.L_DOWN) {
            requestAnimationFrame(() => {
                const offset = Vector.sub(collider.position, collided.center)
                collided.center = collider.position;
                const handler = collided.parent.handler;
                // const left = collided.parent.weightHandler.left;
                // const right = collided;

                // handler.center = lerp(left.center,right.center, 0.5)

            })
        }
    })
});