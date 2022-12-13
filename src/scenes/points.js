import 'phaser'

class Points extends Phaser.Scene {
    constructor() {
        super("points");
    }

    preload() {
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-blurred')

    }

    create() {

    }

    update() {

    }
}

export default Points