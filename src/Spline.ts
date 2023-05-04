import { Circle } from "./Circle.js";
import { Helper, lerp, lerpLine } from "./Helper.js";
import { Context, Vector, Line } from "./types.js";

type DrawType = {
    bezier: Function,
    cubic: Function
}
export class Spline {
    line: Line
    origin: Vector;
    end: Vector;
    distance: Vector;
    t: Vector;
    handler: Circle;
    position: Vector;
    type: string;
    drawType: DrawType;
    weightHandler: any;

    constructor(from: Vector, to: Vector, type: string = 'bezier') {
        const DOC: any = document;
        DOC.view.entities.register(this);
        this.position = from;
        this.line = { from, to }
        this.distance = Vector.sub(to, from);
        this.t = Vector.add(Vector.mult(this.distance, 0.5), from);
        this.handler = new Circle(this.t, 7, this, 'red');
        this.handler.parent = this;
        this.weightHandler = {
            left: new Circle({
                x: lerp(this.line.from, this.handler.center, 0.5).x,
                y: this.handler.center.y
            }, 4, this, 'green'),
            right: new Circle({
                x: lerp(this.handler.center, this.line.to, 0.5).x,
                y: this.handler.center.y
            }, 4, this, 'green')
        }
        this.type = type;
        this.drawType = {
            bezier: this.drawCubic,
            cubic: this.drawBezier
        }
    }
    toLocal(v: Vector) {

    }
    public drawBezier(ctx: Context, color: string = 'black') {
        const line = this.line;
        ctx.beginPath();

        ctx.moveTo(line.from.x, line.from.y);
        ctx.lineTo(line.to.x, line.to.y);
        ctx.strokeStyle = 'gray';
        ctx.stroke();

        const leftLine = {
            from: this.line.from,
            to: this.handler.center
        };
        const rigthLine = {
            from: this.handler.center,
            to: this.line.to
        }

        ctx.beginPath();
        ctx.moveTo(line.from.x, line.from.y);
        for (let i = 0; i < 1; i += 0.01) {
            const left_t = lerpLine(leftLine, i);
            const right_t = lerpLine(rigthLine, i);
            const middleLine = {
                from: left_t,
                to: right_t
            }
            const middle_t = lerpLine(middleLine, i);
            ctx.lineTo(middle_t.x, middle_t.y);
            ctx.moveTo(middle_t.x, middle_t.y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    public drawCubic(ctx: Context, color: string = 'black') {
        const line = this.line;
        ctx.beginPath();

        // ctx.moveTo(line.from.x, line.from.y);
        // ctx.lineTo(line.to.x, line.to.y);
        // ctx.strokeStyle = 'gray';
        // ctx.stroke();

        const point1 = this.weightHandler.left.center;

        const point2 = this.weightHandler.right.center;

        this.handler.center = lerp(point1, point2,0.5);


        ctx.beginPath();
        ctx.moveTo(line.from.x, line.from.y);
        for (let i = 0; i < 1; i += 0.01) {
            const tA = lerp(this.line.from, point1, i);
            const tB = lerp(point1, point2, i);
            const tC = lerp(point2, this.line.to, i);
            const tD = lerp(tA, tB, i);
            const tE = lerp(tB, tC, i);
            const tFinal = lerp(tD, tE, i);
            ctx.lineTo(tFinal.x, tFinal.y);
            ctx.moveTo(tFinal.x, tFinal.y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    public debugSpline(ctx: Context) {
        ctx.beginPath();
        ctx.moveTo(this.line.from.x, this.line.from.y);
        ctx.lineTo(this.handler.center.x, this.handler.center.y);
        ctx.strokeStyle = 'pink';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.handler.center.x, this.handler.center.y);
        ctx.lineTo(this.line.to.x, this.line.to.y);
        ctx.strokeStyle = 'pink';
        ctx.stroke();
    }
    public debugCubic(ctx: Context) {
        const point1 = this.weightHandler.left.center;
        const point2 = this.weightHandler.right.center;

        ctx.strokeStyle = 'blue';

        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.stroke();
    }
    public draw(ctx: Context) {

        this.drawType[this.type as keyof DrawType].bind(this)(ctx, 'black');
    }
    public render(ctx: Context): void {
        this.draw(ctx)
        this.debugCubic(ctx);
    }

}