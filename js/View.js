import { MouseState } from "./types.js";
import { MouseController } from './MouseController.js';
import { EntitiesManager } from "./EntitiesManager.js";
import { CollisionManager } from "./CollisionManager.js";
var View = (function () {
    function View(canvasID) {
        this.canvas = document.querySelector(canvasID);
        this.context = this.canvas.getContext('2d');
        this.delta;
        this.lastTime;
        this.now;
        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.ui = document.querySelector('#ui-delta');
        this.pos = { x: 0, y: 0 };
        this.entities = new EntitiesManager();
        this.collision = new CollisionManager();
        this.mouse = new MouseController(this.canvas);
        this.initMouse();
    }
    View.getPosition = function () {
        var Doc = document;
        var rect = Doc.querySelector('canvas').getBoundingClientRect();
        return { x: rect.left, y: rect.top };
    };
    View.prototype.queueRender = function (f) {
        this.renderQueue.push(f);
    };
    View.prototype.initMouse = function () {
        this.mouse.addAction(function () {
        }, MouseState.L_DOWN);
    };
    View.prototype.getDelta = function () {
        this.now = new Date().getTime();
        if (!this.lastTime) {
            this.lastTime = this.now;
        }
        var elapsed = this.now - this.lastTime;
        if (elapsed > this.interval) {
            this.lastTime = this.now;
        }
        this.delta = elapsed / this.fps;
        return this.delta;
    };
    View.prototype.lerp = function (from, to, interval) {
        return {
            x: (1 - interval) * from.x + interval * to.x,
            y: (1 - interval) * from.y + interval * to.y,
        };
    };
    View.prototype.update = function () {
        var _this = this;
        window.requestAnimationFrame(function () {
            var dt = _this.getDelta();
            _this.ui.innerHTML = "x: ".concat(_this.mouse.position.x, " y: ").concat(_this.mouse.position.y);
            _this.collision.update();
            _this.render();
            _this.update();
        });
    };
    View.prototype.clear = function () {
        this.context.clearRect(0, 0, 800, 600);
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, 800, 600);
    };
    View.prototype.render = function () {
        this.clear();
        this.entities.render(this.context);
    };
    View.prototype.init = function () {
        var ctx = this.context;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
    };
    return View;
}());
export { View };
//# sourceMappingURL=View.js.map