import { Size } from "./types";

export class CollisionManager {
    collisionQueue: Array<Function>
    constructor() {
        this.collisionQueue = [];
    }
    listen(collider: any, collided: any, f: Function) {
        this.collisionQueue.push(() => {
            if (this.check(collider, collided)) {
                f(collider, collided);
            }
        });
    }
    update() {
        this.collisionQueue.forEach(collision => {
            collision();
        });
    }
    check(collider: any, collided: any): boolean {
        let colliding = {
            x: false,
            y: false
        };
        const collidedSize: Size = {
            w: collided.position.x + collided.size.w,
            h: collided.position.y + collided.size.h
        }

        colliding = {
            x: collider.position.x > collided.position.x
                && collider.position.x < collidedSize.w,
            y: collider.position.y > collided.position.y
                && collider.position.y < collidedSize.h
        }

        if (collider.size) {
            const colliderSize = {
                x: collider.position.x + collider.size.w,
                y: collider.position.y + collider.size.h
            }
            colliding = {
                x: colliderSize.x > collided.position.x
                    && collider.position.x < collidedSize.w,
                y: colliderSize.x > collided.position.y
                    && collider.position.y < collidedSize.h
            }
        }
        return colliding.x && colliding.y;
    }
}