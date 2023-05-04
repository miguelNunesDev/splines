import { Circle } from "./Circle.js";
import { View } from "./View.js";
import { MouseState, Vector } from "./types.js";

export class MouseController {
    position: Vector;
    lastPosition: Vector;
    state: MouseState;
    actions: { [key in MouseState]: Array<Function> };
    distance: Vector;
    debug: Circle;
    
    constructor(canvas: HTMLCanvasElement) {
        this.state = MouseState.L_UP;
        this.distance;
        this.position = new Vector(0, 0);
        this.actions = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        };
        this.initListeners(canvas);
    }
    initListeners(canvas: HTMLCanvasElement) {
        
        canvas.addEventListener('mousedown', () => {
            this.state = MouseState.L_DOWN;
            this.actions[MouseState.L_DOWN].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('mouseleave', () => {
            this.state = MouseState.L_UP;
            this.actions[MouseState.L_UP].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('mouseup', () => {
            this.state = MouseState.L_UP;
            this.actions[MouseState.L_UP].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('mousemove', (e) => {
            this.lastPosition = this.lastPosition || this.position;
            this.position = {
                x: e.clientX - View.getPosition().x,
                y: e.clientY - View.getPosition().y
            }
            this.debug.center = this.position;
            this.debug.position = Vector.sub(this.position, this.debug.radius)
            requestAnimationFrame(() => {
                const distance: Vector = {
                    x: this.position.x - this.lastPosition.x,
                    y: this.position.y - this.lastPosition.y,
                }
                this.lastPosition = this.position;
                this.distance = distance;

            })
        })
    }
    addAction(f: Function, type: MouseState) {
        this.actions[type].push(f);
    }
}