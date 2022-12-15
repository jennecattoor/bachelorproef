import 'phaser'

let scale
let points

class SoloScore extends Phaser.Scene {
    constructor() {
        super("soloScore");
    }

    init(data) {
        points = data.points;
    }

    preload() {
        this.load.audio('one', './src/assets/audio/one.wav');
        this.load.audio('two', './src/assets/audio/two.wav');
        this.load.audio('three', './src/assets/audio/three.wav');
        this.load.audio('four', './src/assets/audio/four.wav');
    }

    create() {
        // Fade in
        this.cameras.main.fadeIn(500);
        // Background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-blurred')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        // Score text
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 75, `You scored ${points} Points`, { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '14rem' }).setOrigin(0.5, 0.5).setScrollFactor(0);

        // Score comment
        let titleSmall = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 75, 'Nice try', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '8.6rem' }).setOrigin(0.5, 0.5).setScrollFactor(0);

        // Score sound and comment
        let one = this.sound.add('one');
        let two = this.sound.add('two');
        let three = this.sound.add('three');
        let four = this.sound.add('four');

        if (points <= 16) {
            one.play();
            titleSmall.setText('Did you even try?');
        } else if (points <= 36) {
            two.play();
            titleSmall.setText('Could be better');
        } else if (points <= 48) {
            three.play();
            titleSmall.setText('Great work');
        } else if (points <= 60) {
            four.play();
            titleSmall.setText('Outstanding');
        }

        // Restarting game
        this.time.delayedCall(7500, () => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                location.reload()
            }, [], this);
        }, [], this);
    }

    update() {

    }
}

export default SoloScore