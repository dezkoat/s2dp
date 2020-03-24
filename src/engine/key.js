class Key {
    constructor() {
        this.keyDown = {};

        window.onkeydown = e => {
            this.keyDown[e.key] = 1;
        }

        window.onkeyup = e => {
            this.keyDown[e.key] = 0;
        }
    }

    isDown(key) {
        return key in this.keyDown && this.keyDown[key] === 1;
    }

    isUp(key) {
        return !(key in this.keyDown) || this.keyDown[key] === 0;
    }
}

export default Key;