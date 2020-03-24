import Key from "./key.js";
import Mouse from "./mouse.js";

class World {
    constructor(canvasId, fps) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.fpsLimit = fps;
        this.fpsInterval = 1000 / this.fpsLimit;
        this.fps = 0;
        this.frameCount = 0;
        this.prevTimestamp = Date.now();
        this.updateBinded = this.update.bind(this);

        this.objectMap = {};
        this.objectIdMapByTypeMap = {};

        this.key = new Key();
        this.mouse = new Mouse(this.canvas);
    }

    async update() {
        requestAnimationFrame(this.updateBinded);

        var curTimestamp = Date.now();
        var elapsed = curTimestamp - this.prevTimestamp;
        if (elapsed < this.fpsInterval) {
            return;
        }

        if (curTimestamp % 1000 < (this.prevTimestamp + elapsed % this.fpsInterval) % 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
        }

        this.prevTimestamp = curTimestamp - (elapsed % this.fpsInterval);
        ++this.frameCount;

        await this.step();
        this.draw();
    }

    async step() {
        var promiseList = Object.values(this.objectMap).map(object => new Promise(resolve => resolve(object.step())));
        await Promise.all(promiseList);
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);this.context.fillStyle = 'red';
        this.context.fillText(this.frameCount, 50, 50);
        Object.values(this.objectMap).forEach(object => {
            this.context.save();
            object.draw.bind(object)(this.context)
            this.context.restore();
        });
    }

    addObject(object) {
        object.setWorld(this);
        this.objectMap[object.id] = object;

        if (!(object.constructor.name in this.objectIdMapByTypeMap)) {
            this.objectIdMapByTypeMap[object.constructor.name] = {};
        }

        this.objectIdMapByTypeMap[object.constructor.name][object.id] = 1;
    }

    removeObject(object) {
        delete this.objectMap[object.id];
        delete this.objectIdMapByTypeMap[object.constructor.name][object.id];
        object.setWorld(null);
    }

    getObjectListByType(type) {
        var objectIdMap = this.objectIdMapByTypeMap[type.name];
        return Object.keys(objectIdMap).map(objectId => this.objectMap[objectId]);
    }
}

export default World;
