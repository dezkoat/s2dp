import Util from './util.js';

class Object {
    constructor() {
        this.world = null;
        this.id = Util.generateUuidv4();
    }

    setWorld(world)  {
        this.world = world;
    }

    getWorld() {
        return this.world;
    }

    step() {
        // noop
    }

    draw(context) {
        // noop
    }
}

export default Object;
