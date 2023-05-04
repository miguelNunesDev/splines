import { MouseState, Vector, Canvas, Context } from "./types.js";
import { MouseController } from './MouseController.js';
import { EntitiesManager } from "./EntitiesManager.js";
import { CollisionManager } from "./CollisionManager.js";



export class View {
    canvas: Canvas;
    context: Context;
    delta: number;
    lastTime: number;
    now: number;
    fps: number;
    interval: number;
    ui: HTMLElement;
    pos: Vector;
    mouse: MouseController;
    renderQueue: Array<Function>
    entities: EntitiesManager;
    collision: CollisionManager;
    constructor(canvasID: string) {
        this.canvas = document.querySelector(canvasID);
        this.context = this.canvas.getContext('2d');
        this.delta;
        this.lastTime;
        this.now;
        this.fps = 60;
        this.interval = 1000 / this.fps; //seconds / frams
        this.ui = document.querySelector('#ui-delta');
        this.pos = { x: 0, y: 0 };
        this.entities = new EntitiesManager();
        this.collision = new CollisionManager();
        this.mouse = new MouseController(this.canvas);


        this.initMouse();
    }
    static getPosition() {
        const Doc: any = document;
        const rect = Doc.querySelector('canvas').getBoundingClientRect();
        return { x: rect.left, y: rect.top };
    }
    queueRender(f: Function) {
        this.renderQueue.push(f)
    }
    initMouse() {
        this.mouse.addAction(() => {

        }, MouseState.L_DOWN)
    }
    getDelta() {
        this.now = new Date().getTime();

        if (!this.lastTime) {
            this.lastTime = this.now;
        }
        let elapsed = this.now - this.lastTime;

        if (elapsed > this.interval) {
            // do stuff
            this.lastTime = this.now;
        }
        this.delta = elapsed / this.fps;
        return this.delta;
    }
    lerp(from: Vector, to: Vector, interval: number) {
        return {
            x: (1 - interval) * from.x + interval * to.x,
            y: (1 - interval) * from.y + interval * to.y,
        };
    }
    update() {
        window.requestAnimationFrame(() => {
            const dt = this.getDelta();
            this.ui.innerHTML = `x: ${this.mouse.position.x} y: ${this.mouse.position.y}`;
            this.collision.update();
            this.render();
            this.update();
        });
    }
    clear() {
        this.context.clearRect(0, 0, 800, 600);
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, 800, 600);
    }
    render() {
        this.clear();
        this.entities.render(this.context);

    }
    init() {
        const ctx = this.context;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
    }
}