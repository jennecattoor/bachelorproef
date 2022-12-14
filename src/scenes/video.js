import 'phaser'

let scale
let video
let startGame = false

class Video extends Phaser.Scene {
    constructor() {
        super("video");
    }

    create() {
        this.cameras.main.fadeIn(1000);
        video = this.add.video(this.cameras.main.width / 2, this.cameras.main.height / 2, 'intro', false);
        let scaleX = this.cameras.main.width / video.width
        let scaleY = this.cameras.main.height / video.height
        scale = Math.max(scaleX, scaleY)
        video.setScale(scale).setScrollFactor(0)
        video.play(true);

        setTimeout(() => { video.destroy() }, 20500);

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
                setTimeout(() => { this.scene.start("solo") }, 500);
            }
        }
    }
}

export default Video