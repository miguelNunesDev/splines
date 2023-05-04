var Helper = (function () {
    function Helper() {
    }
    Helper.lerp = function (from, to, interval) {
        return {
            x: (1 - interval) * from.x + interval * to.x,
            y: (1 - interval) * from.y + interval * to.y,
        };
    };
    return Helper;
}());
var lerp = function (from, to, interval) {
    return {
        x: (1 - interval) * from.x + interval * to.x,
        y: (1 - interval) * from.y + interval * to.y,
    };
};
var lerpLine = function (line, interval) {
    return {
        x: (1 - interval) * line.from.x + interval * line.to.x,
        y: (1 - interval) * line.from.y + interval * line.to.y,
    };
};
export { lerp, lerpLine, Helper };
//# sourceMappingURL=Helper.js.map