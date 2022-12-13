import 'phaser'

let scale
let video

class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        this.load.image('background-blurred', './src/assets/images/background-blurred.jpg');
        this.load.video('intro', './src/assets/video/intro.mp4');
    }

    create() {
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-blurred')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        this.input.keyboard.on('keyup', (e) => {
            if (e.key == 'w') {
                this.startGame();
            }
            if (e.key == 'x') {
                this.scene.start("game")
            }
        });
    }

    startGame() {
        this.cameras.main.fadeOut(1000);
        setTimeout(() => {
            this.cameras.main.fadeIn(200);
            video = this.add.video(this.cameras.main.width / 2, this.cameras.main.height / 2, 'intro');
            video.setScale(scale).setScrollFactor(0)
            video.play(true);
            setTimeout(() => {
                this.cameras.main.fadeOut(100);
                video.destroy()
                this.scene.start("game")
            }, 21000);
        }, 2000);
    }

    update() {

    }
}

export default Menu