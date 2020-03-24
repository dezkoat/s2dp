import World from './engine/world.js';

import Box from './object/box.js';
import Wall from './object/wall.js';
import Display from './object/display.js';

window.onload = () => {
    var world = new World('canvas', 60);
    var box1 = new Box(50, 50, 20, 20, 'rgba(0, 0, 255, 0.5)', 1);
    var box2 = new Box(150, 50, 20, 20, 'rgba(0, 255, 0, 0.5)', 2);
    var box3 = new Box(250, 50, 20, 20, 'rgba(0, 255, 255, 0.5)', 3);
    var display = new Display();

    world.addObject(box1);
    world.addObject(box2);
    world.addObject(box3);
    world.addObject(display);

    // Bottom floor
    for (var i = 0; i < 20; ++i) {
        world.addObject(new Wall(25 + 20 * i, 500, 20, 20, 'rgba(255, 0, 0, 0.5)'));
    }

    // Middle floor
    for (var i = 5; i < 20; ++i) {
        world.addObject(new Wall(25 + 20 * i, 480, 20, 20, 'rgba(255, 0, 0, 0.5)'));
    }

    // Top floor
    for (var i = 10; i < 20; ++i) {
        if (i == 16) continue;
        world.addObject(new Wall(25 + 20 * i, 460, 20, 20, 'rgba(255, 0, 0, 0.5)'));
    }

    // Floating floor
    for (var i = 0; i < 5; ++i) {
        world.addObject(new Wall(25 + 20 * i, 400, 20, 20, 'rgba(255, 0, 0, 0.5)'));
    }

    world.update();
}
