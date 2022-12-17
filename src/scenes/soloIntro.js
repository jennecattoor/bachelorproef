import 'phaser'

let scale
let video
let startGame = false

class SoloIntro extends Phaser.Scene {
    constructor() {
        super("soloIntro");
    }

    preload() {
        this.load.image('smashorange', './../assets/images/orange.png');
        this.load.video('intro', './../assets/video/intro.mp4');
    }

    create() {
        // Fade in
        this.cameras.main.fadeIn(1000);

        // Adding video
        video = this.add.video(this.cameras.main.width / 2, this.cameras.main.height / 2, 'intro', false);
        let scaleX = this.cameras.main.width / video.width
        let scaleY = this.cameras.main.height / video.height
        scale = Math.max(scaleX, scaleY)
        video.setScale(scale).setScrollFactor(0)
        video.play(true);

        // Adding skip instructions
        this.add.image(150, 150, 'smashorange').setScale(.5).setScrollFactor(0);

        // Destroying video after 20 seconds
        this.time.delayedCall(20500, () => { video.destroy() }, [], this);

        // Listening to key input
        this.input.keyboard.on('keyup', (e) => {
            if (e.key == 'x') {
                video.destroy()
            }
        });
    }

    update() {
        if (video.active == false) {
            if (startGame == false) {
                startGame = true
                this.cameras.main.fadeOut(500);
                setTimeout(() => {
                    this.scene.start("solo")
                }, 500);
            }
        }
    }
}

export default SoloIntro