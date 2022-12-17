import 'phaser'

let scale;

class DuoIntro extends Phaser.Scene {
    constructor() {
        super("duoIntro");
    }

    preload() {
        this.load.image('VS', './../assets/images/duo/VS.jpg');
        this.load.audio('side', './../assets/audio/duo/side.mp3');
        this.load.image('background', './../assets/images/background.jpg');
        this.load.image('team-red', './../assets/images/duo/team-red.png');
        this.load.image('team-blue', './../assets/images/duo/team-blue.png');
    }


    create() {
        // FAde in
        this.cameras.main.fadeIn(500)

        // Background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-blurred')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        // Versus
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'VS').setAlpha(.6).setScale(scale).setScrollFactor(0)
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'VS', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '16rem' }).setScale(scale).setOrigin(0.5, .5).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, 'Pick a side!', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '7rem' }).setScale(scale).setOrigin(0.5, 0).setScrollFactor(0);

        // Images of moles
        this.add.image(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2, 'team-blue').setScale(scale).setScrollFactor(0);
        this.add.image(this.cameras.main.width / 4 * 1, this.cameras.main.height / 2, 'team-red').setScale(scale).setScrollFactor(0);

        // Mole texts
        this.add.text(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2 - 350, 'Team Blue', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '7rem' }).setScale(scale).setOrigin(0.5, .5).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 4 * 1, this.cameras.main.height / 2 - 350, 'Team Red', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '7rem' }).setScale(scale).setOrigin(0.5, .5).setScrollFactor(0);

        // Play sound
        this.sound.add('side').play();

        // Start game
        this.time.delayedCall(5500, () => {
            this.cameras.main.fadeOut(500)
            this.time.delayedCall(500, () => {
                this.scene.remove()
                this.scene.start('duo')
            }, [], this);
        }, [], this);

    }
}

export default DuoIntro