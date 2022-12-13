import 'phaser'

class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        this.load.image('background-blurred', './src/assets/images/background-blurred.jpg');
    }

    create() {
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background-blurred')

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursorKeys.left.isDown) {
            this.scene.start("game");
        }
    }
}

export default Menu