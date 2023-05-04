import { Vector, Line } from "./types";

class Helper {
    static lerp(from: Vector, to: Vector, interval: number) {
        return {
            x: (1 - interval) * from.x + interval * to.x,
            y: (1 - interval) * from.y + interval * to.y,
        };
    }
}
const lerp = (from: Vector, to: Vector, interval: number) => {
    return {
        x: (1 - interval) * from.x + interval * to.x,
        y: (1 - interval) * from.y + interval * to.y,
    };
}
const lerpLine = (line: Line, interval: number) => {
    return {
        x: (1 - interval) * line.from.x + interval * line.to.x,
        y: (1 - interval) * line.from.y + interval * line.to.y,
    };
}

export { lerp,lerpLine, Helper };