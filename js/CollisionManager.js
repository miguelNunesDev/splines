var CollisionManager = (function () {
    function CollisionManager() {
        this.collisionQueue = [];
    }
    CollisionManager.prototype.listen = function (collider, collided, f) {
        var _this = this;
        this.collisionQueue.push(function () {
            if (_this.check(collider, collided)) {
                f(collider, collided);
            }
        });
    };
    CollisionManager.prototype.update = function () {
        this.collisionQueue.forEach(function (collision) {
            collision();
        });
    };
    CollisionManager.prototype.check = function (collider, collided) {
        var colliding = {
            x: false,
            y: false
        };
        var collidedSize = {
            w: collided.position.x + collided.size.w,
            h: collided.position.y + collided.size.h
        };
        colliding = {
            x: collider.position.x > collided.position.x
                && collider.position.x < collidedSize.w,
            y: collider.position.y > collided.position.y
                && collider.position.y < collidedSize.h
        };
        if (collider.size) {
            var colliderSize = {
                x: collider.position.x + collider.size.w,
                y: collider.position.y + collider.size.h
            };
            colliding = {
                x: colliderSize.x > collided.position.x
                    && collider.position.x < collidedSize.w,
                y: colliderSize.x > collided.position.y
                    && collider.position.y < collidedSize.h
            };
        }
        return colliding.x && colliding.y;
    };
    return CollisionManager;
}());
export { CollisionManager };
//# sourceMappingURL=CollisionManager.js.map