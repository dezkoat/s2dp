import Object from '../engine/object.js';

import Wall from './wall.js';

class Box extends Object {
    constructor(x, y, width, height, color, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.vy = 0;
        this.vx = 0;
        this.jump = false;

        if (type == 1) {
            this.keyLeft = 'ArrowLeft';
            this.keyRight = 'ArrowRight';
            this.keyJump = 'ArrowUp';
        } else if (type == 2) {
            this.keyLeft = 'a';
            this.keyRight = 'd';
            this.keyJump = 'w';
        } else {
            this.keyLeft = 'j';
            this.keyRight = 'l';
            this.keyJump = 'i';
        }
    }

    step() {
        if (this.world.key.isDown(this.keyLeft)) {
            this.vx = Math.max(this.vx - 0.5, -4);
        } else if (this.world.key.isDown(this.keyRight)) {
            this.vx = Math.min(this.vx + 0.5, 4);
        } else if (Math.abs(this.vx) >= 0.2) {
            this.vx = this.vx > 0 ? this.vx -= 0.2 : this.vx += 0.2;
        } else {
            this.vx = 0;
        }

        this.vy = Math.min(this.vy + 0.8, 20);

        if (this.jump) {
            this.vy = -15;
            this.jump = false;
        }

        var boxList = this.world.getObjectListByType(Box);
        var wallList = this.world.getObjectListByType(Wall);
        boxList.forEach(box => {
            // Do not treat ownself as wall
            if (box.id == this.id) return;

            // Treat other boxes the same way as wall
            wallList.push(box);
        })

        wallList.forEach(wall => {
            // Calculate bounding box for boxes and walls
            var bw = this.x - this.width / 2;
            var bn = this.y - this.height / 2;
            var be = this.x + this.width / 2;
            var bs = this.y + this.height / 2;

            var ww = wall.x - wall.width / 2;
            var wn = wall.y - wall.height / 2;
            var we = wall.x + wall.width / 2;
            var ws = wall.y + wall.height / 2;

            // Out of boundary box, skip
            if (we < bw + this.vx) return;
            if (ww > be + this.vx) return;
            if (ws < bn + this.vy) return;
            if (wn > bs + this.vy) return;

            // Vertical collision check
            if (be > ww && bw < we) {
                // Wall above box
                if (this.vy < 0 && bn + this.vy <= ws && bs + this.vy > ws) {
                    this.y = ws + this.height / 2;
                    this.vy = 0;
                }

                // Wall below box
                if (this.vy > 0 && bs + this.vy >= wn) {
                    this.y = wn - this.height / 2;
                    this.vy = 0;

                    // Jump using space, a wall/box must be below
                    if (this.world.key.isDown(this.keyJump)) {
                        this.jump = true;
                    }
                }
            }

            // Horizontal collision check
            if (bs > wn && bn < ws) {
                // Wall left of box
                if (this.vx < 0 && bw + this.vx <= we) {
                    this.x = we + this.width / 2;
                    this.vx = 0;
                }

                // Wall right of box
                if (this.vx > 0 && be + this.vx >= ww) {
                    this.x = ww - this.width / 2;
                    this.vx = 0;
                }
            }
        });

        this.x += Math.floor(this.vx);
        this.y += Math.floor(this.vy);
    }

    draw(context) {
        context.fillStyle = this.color;
        context.translate(this.x, this.y);
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
}

export default Box;
