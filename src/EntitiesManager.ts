import { Circle } from 'Circle.js'
import { Spline } from 'Spline.js'
import { Context } from './types.js';

export class EntitiesManager {
    entities: Array<Circle | Spline>
    constructor() {
        this.entities = [];
    }
    register(entity: Circle | Spline) {
        this.entities.push(entity);
    }
    render(ctx: Context) {
        this.entities.forEach(entity => {
            entity.render(ctx)
        });
    }
}