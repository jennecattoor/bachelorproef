import 'phaser'

let scale;

class Instructions extends Phaser.Scene {
    constructor() {
        super("instructions");
    }

    preload() {
        this.load.image('background', './src/assets/images/background.jpg');
        this.load.image('VS', './src/assets/images/VS.jpg');
        this.load.image('mole-red', './src/assets/images/mole-red.png');
        this.load.image('mole-blue', './src/assets/images/mole-blue.png');
        this.load.audio('side', './src/assets/audio/side.wav');
    }


    create() {
        this.cameras.main.fadeIn(500)
        // Background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-blurred')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        // Versus
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'VS').setAlpha(.7).setScale(scale).setScrollFactor(0)
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'VS', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '18rem' }).setOrigin(0.5, .5).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, 'Pick a side!', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, 0).setScrollFactor(0);
        // Images of moles
        this.add.image(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2, 'mole-blue').setScale(scale).setScrollFactor(0);
        this.add.image(this.cameras.main.width / 4 * 1, this.cameras.main.height / 2, 'mole-red').setScale(scale).setScrollFactor(0);
        // Mole texts
        this.add.text(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2 - 350, 'Team Blue', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, .5).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 4 * 1, this.cameras.main.height / 2 - 350, 'Team Red', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, .5).setScrollFactor(0);
        // Play sound
        this.sound.add('side').play();

        this.time.delayedCall(5500, () => {
            this.cameras.main.fadeOut(500)
            this.time.delayedCall(500, () => { this.scene.start('duo') }, [], this);
        }, [], this);

    }
}

export default Instructions