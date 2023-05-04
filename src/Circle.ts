import { MouseController } from "./MouseController.js";
import { Spline } from "./Spline";
import { Context, Size, Vector } from "./types.js";

export class Circle {
    _center: Vector;
    radius: number;
    _position: Vector;
    size: Size;
    color: string;
    parent: any;
    constructor(center: Vector, radius?: number, parent?: Spline | MouseController, color?: string) {
        const DOC: any = document;
        DOC.view.entities.register(this);
        this.color = color || 'rend';
        this._center = center;
        this.radius = radius || 5;
        this.size = new Size(radius * 2, radius * 2);
        this.parent = parent;
    }
    get position() {
        return Vector.sub(this._center, this.radius)
    }
    set position(pos: Vector) {
        this._position = pos;
        this._center = Vector.add(pos, this.radius)
    }
    get center() {
        return this._center;
    }
    set center(pos: Vector) {
        this._center = pos;
        this._position = Vector.sub(pos, this.radius)
    }
    render(ctx: Context, color: string = this.color) {
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
    }
}