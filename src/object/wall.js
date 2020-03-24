import Object from '../engine/object.js';
import Box from './box.js';

class Wall extends Object {
    constructor(x, y, width, height, color) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.rot = 0;
        this.mouse = false;

        this.dir = 0;
    }

    step() {
        var box = this.world.getObjectListByType(Box)[0];
        this.dir = Math.atan((box.y - this.y) / (box.x - this.x));
    }

    draw(context) {
        context.fillStyle = this.color;
        context.translate(this.x, this.y);
        context.rotate(this.dir);
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
}

export default Wall;