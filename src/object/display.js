import Object from '../engine/object.js';

class Display extends Object {
    draw(context) {
        context.font = 'normal normal 16px Verdana';
        context.fillStyle = 'black';
        context.fillText('FPS: ' + this.world.fps, 10, 20);
        context.font = 'normal normal 12px Verdana';
        context.fillStyle = 'blue';
        context.fillText('Use arrow keys to move blue box', 10, 40);
        context.fillStyle = 'green';
        context.fillText('Use WSAD to move green box', 10, 54);
        context.fillStyle = 'cyan';
        context.fillText('Use IKJL to move cyan box', 10, 68);
    }
}

export default Display;
