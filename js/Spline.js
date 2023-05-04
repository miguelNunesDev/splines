import { Circle } from "./Circle.js";
import { lerp, lerpLine } from "./Helper.js";
import { Vector } from "./types.js";
var Spline = (function () {
    function Spline(from, to, type) {
        if (type === void 0) { type = 'bezier'; }
        var DOC = document;
        DOC.view.entities.register(this);
        this.position = from;
        this.line = { from: from, to: to };
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
        };
        this.type = type;
        this.drawType = {
            bezier: this.drawCubic,
            cubic: this.drawBezier
        };
    }
    Spline.prototype.toLocal = function (v) {
    };
    Spline.prototype.drawBezier = function (ctx, color) {
        if (color === void 0) { color = 'black'; }
        var line = this.line;
        ctx.beginPath();
        ctx.moveTo(line.from.x, line.from.y);
        ctx.lineTo(line.to.x, line.to.y);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        var leftLine = {
            from: this.line.from,
            to: this.handler.center
        };
        var rigthLine = {
            from: this.handler.center,
            to: this.line.to
        };
        ctx.beginPath();
        ctx.moveTo(line.from.x, line.from.y);
        for (var i = 0; i < 1; i += 0.01) {
            var left_t = lerpLine(leftLine, i);
            var right_t = lerpLine(rigthLine, i);
            var middleLine = {
                from: left_t,
                to: right_t
            };
            var middle_t = lerpLine(middleLine, i);
            ctx.lineTo(middle_t.x, middle_t.y);
            ctx.moveTo(middle_t.x, middle_t.y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    };
    Spline.prototype.drawCubic = function (ctx, color) {
        if (color === void 0) { color = 'black'; }
        var line = this.line;
        ctx.beginPath();
        var point1 = this.weightHandler.left.center;
        var point2 = this.weightHandler.right.center;
        this.handler.center = lerp(point1, point2, 0.5);
        ctx.beginPath();
        ctx.moveTo(line.from.x, line.from.y);
        for (var i = 0; i < 1; i += 0.01) {
            var tA = lerp(this.line.from, point1, i);
            var tB = lerp(point1, point2, i);
            var tC = lerp(point2, this.line.to, i);
            var tD = lerp(tA, tB, i);
            var tE = lerp(tB, tC, i);
            var tFinal = lerp(tD, tE, i);
            ctx.lineTo(tFinal.x, tFinal.y);
            ctx.moveTo(tFinal.x, tFinal.y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    };
    Spline.prototype.debugSpline = function (ctx) {
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
    };
    Spline.prototype.debugCubic = function (ctx) {
        var point1 = this.weightHandler.left.center;
        var point2 = this.weightHandler.right.center;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.stroke();
    };
    Spline.prototype.draw = function (ctx) {
        this.drawType[this.type].bind(this)(ctx, 'black');
    };
    Spline.prototype.render = function (ctx) {
        this.draw(ctx);
        this.debugCubic(ctx);
    };
    return Spline;
}());
export { Spline };
//# sourceMappingURL=Spline.js.map