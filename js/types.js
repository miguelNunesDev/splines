var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.add = function (p1, p2) {
        if (typeof p2 === "number") {
            return {
                x: p1.x + p2,
                y: p1.y + p2,
            };
        }
        return {
            x: p1.x + p2.x,
            y: p1.y + p2.y,
        };
    };
    Vector.sub = function (p1, p2) {
        if (typeof p2 === "number") {
            return {
                x: p1.x - p2,
                y: p1.y - p2,
            };
        }
        return {
            x: p1.x - p2.x,
            y: p1.y - p2.y,
        };
    };
    Vector.mult = function (p1, p2) {
        if (typeof p2 === "number") {
            return {
                x: p1.x * p2,
                y: p1.y * p2,
            };
        }
        return {
            x: p1.x * p2.x,
            y: p1.y * p2.y,
        };
    };
    Vector.div = function (p1, p2) {
        if (typeof p2 === "number") {
            return {
                x: p1.x / p2,
                y: p1.y / p2,
            };
        }
        return {
            x: p1.x / p2.x,
            y: p1.y / p2.y,
        };
    };
    Vector.mod = function (p1, p2) {
        if (typeof p2 === "number") {
            return {
                x: p1.x % p2,
                y: p1.y % p2,
            };
        }
        return {
            x: p1.x % p2.x,
            y: p1.y % p2.y,
        };
    };
    return Vector;
}());
var Size = (function () {
    function Size(w, h) {
        this.w = w;
        this.h = h;
    }
    Size.add = function (p1, p2) {
        return {
            w: p1.w + p2.w,
            h: p1.h + p2.h,
        };
    };
    Size.sub = function (p1, p2) {
        return {
            w: p1.w - p2.w,
            h: p1.h - p2.h,
        };
    };
    Size.mult = function (p1, p2) {
        return {
            w: p1.w * p2.w,
            h: p1.h * p2.h,
        };
    };
    Size.div = function (p1, p2) {
        return {
            w: p1.w / p2.w,
            h: p1.h / p2.h,
        };
    };
    Size.mod = function (p1, p2) {
        return {
            w: p1.w % p2.w,
            h: p1.h % p2.h,
        };
    };
    return Size;
}());
var MouseState;
(function (MouseState) {
    MouseState[MouseState["L_UP"] = 0] = "L_UP";
    MouseState[MouseState["L_DOWN"] = 1] = "L_DOWN";
    MouseState[MouseState["R_UP"] = 2] = "R_UP";
    MouseState[MouseState["R_DOWN"] = 3] = "R_DOWN";
    MouseState[MouseState["MOVE"] = 4] = "MOVE";
})(MouseState || (MouseState = {}));
export { Vector, MouseState, Size };
//# sourceMappingURL=types.js.map