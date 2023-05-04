import { Size, Vector } from "./types.js";
var Circle = (function () {
    function Circle(center, radius, parent, color) {
        var DOC = document;
        DOC.view.entities.register(this);
        this.color = color || 'rend';
        this._center = center;
        this.radius = radius || 5;
        this.size = new Size(radius * 2, radius * 2);
        this.parent = parent;
    }
    Object.defineProperty(Circle.prototype, "position", {
        get: function () {
            return Vector.sub(this._center, this.radius);
        },
        set: function (pos) {
            this._position = pos;
            this._center = Vector.add(pos, this.radius);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "center", {
        get: function () {
            return this._center;
        },
        set: function (pos) {
            this._center = pos;
            this._position = Vector.sub(pos, this.radius);
        },
        enumerable: false,
        configurable: true
    });
    Circle.prototype.render = function (ctx, color) {
        if (color === void 0) { color = this.color; }
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
    };
    return Circle;
}());
export { Circle };
//# sourceMappingURL=Circle.js.map