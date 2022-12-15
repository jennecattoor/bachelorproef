import 'phaser'

let scale;

class Duo extends Phaser.Scene {
    constructor() {
        super("duo");
    }

    preload() {
        this.load.image('background', './src/assets/images/background.jpg');

    }


    create() {
        this.cameras.main.fadeIn(500)
        // Background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

    }
}

export default Duo