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
export {};
//# sourceMappingURL=Math.js.map