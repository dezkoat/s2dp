class Mouse {
    constructor(canvas) {
        this.buttonDown = {};
        this.cursorPosition = {
            x: 0,
            y: 0,
        };

        canvas.onmousemove = e => {
            this.cursorPosition = {
                x: e.offsetX,
                y: e.offsetY,
            }
        }

        canvas.onmousedown = e => {
            this.buttonDown[e.button] = 1;
        }

        canvas.onmouseup = e => {
            this.buttonDown[e.button] = 0;
        }
    }

    isDown(button) {
        return button in this.buttonDown && this.buttonDown[button] === 1;
    }

    isUp(button) {
        return !(button in this.buttonDown) || this.buttonDown[button] === 0;
    }
}

export default Mouse;