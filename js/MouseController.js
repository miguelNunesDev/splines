import { View } from "./View.js";
import { MouseState, Vector } from "./types.js";
var MouseController = (function () {
    function MouseController(canvas) {
        this.state = MouseState.L_UP;
        this.distance;
        this.position = new Vector(0, 0);
        this.actions = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        };
        this.initListeners(canvas);
    }
    MouseController.prototype.initListeners = function (canvas) {
        var _this = this;
        canvas.addEventListener('mousedown', function () {
            _this.state = MouseState.L_DOWN;
            _this.actions[MouseState.L_DOWN].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mouseleave', function () {
            _this.state = MouseState.L_UP;
            _this.actions[MouseState.L_UP].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mouseup', function () {
            _this.state = MouseState.L_UP;
            _this.actions[MouseState.L_UP].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mousemove', function (e) {
            _this.lastPosition = _this.lastPosition || _this.position;
            _this.position = {
                x: e.clientX - View.getPosition().x,
                y: e.clientY - View.getPosition().y
            };
            _this.debug.center = _this.position;
            _this.debug.position = Vector.sub(_this.position, _this.debug.radius);
            requestAnimationFrame(function () {
                var distance = {
                    x: _this.position.x - _this.lastPosition.x,
                    y: _this.position.y - _this.lastPosition.y,
                };
                _this.lastPosition = _this.position;
                _this.distance = distance;
            });
        });
    };
    MouseController.prototype.addAction = function (f, type) {
        this.actions[type].push(f);
    };
    return MouseController;
}());
export { MouseController };
//# sourceMappingURL=MouseController.js.map