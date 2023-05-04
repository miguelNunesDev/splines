class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    static add(p1: Vector, p2: Vector): Vector;
    static add(p1: Vector, p2: number): Vector;
    static add(p1: Vector, p2: Vector | number): Vector {
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

    }
    static sub(p1: Vector, p2: Vector): Vector;
    static sub(p1: Vector, p2: number): Vector;
    static sub(p1: Vector, p2: Vector | number): Vector {
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
    }
    static mult(p1: Vector, p2: Vector): Vector;
    static mult(p1: Vector, p2: number): Vector;
    static mult(p1: Vector, p2: Vector | number): Vector {
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
    }
    static div(p1: Vector, p2: Vector): Vector;
    static div(p1: Vector, p2: number): Vector;
    static div(p1: Vector, p2: Vector | number): Vector {
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
    }
    static mod(p1: Vector, p2: Vector): Vector;
    static mod(p1: Vector, p2: number): Vector;
    static mod(p1: Vector, p2: Vector | number): Vector {
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
    }
}
class Size {
    w: number;
    h: number;
    constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
    }

    static add(p1: Size, p2: Size) {
        return {
            w: p1.w + p2.w,
            h: p1.h + p2.h,
        };
    }
    static sub(p1: Size, p2: Size) {
        return {
            w: p1.w - p2.w,
            h: p1.h - p2.h,
        };
    }
    static mult(p1: Size, p2: Size) {
        return {
            w: p1.w * p2.w,
            h: p1.h * p2.h,
        };
    }
    static div(p1: Size, p2: Size) {
        return {
            w: p1.w / p2.w,
            h: p1.h / p2.h,
        };
    }
    static mod(p1: Size, p2: Size) {
        return {
            w: p1.w % p2.w,
            h: p1.h % p2.h,
        };
    }
}

type Line = {
    from: Vector,
    to: Vector
}
enum MouseState {
    L_UP,
    L_DOWN,
    R_UP,
    R_DOWN,
    MOVE
}
type Context = CanvasRenderingContext2D;
type Canvas = HTMLCanvasElement;

export {
    Vector,
    Line,
    MouseState,
    Context,
    Canvas,
    Size
}