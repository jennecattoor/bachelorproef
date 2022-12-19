import 'phaser'

let scale

class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        this.load.image('duo', './../assets/images/duo/duo.png');
        this.load.image('solo', './../assets/images/solo/solo.png');
        this.load.audio('music-menu', './../assets/audio/music/music-menu.mp3');
        this.load.image('background-blurred', './../assets/images/background-blurred.jpg');
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

        // Title
        this.add.text(this.cameras.main.width / 2, this.cameras.main.width / 10, 'Whac-A-Mole', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '12rem' }).setScale(scale).setOrigin(0.5, 0).setScrollFactor(0);

        // Subtitle
        this.add.text(this.cameras.main.width / 2, this.cameras.main.width / 6, 'Wilde Westen Edition', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '7.4rem' }).setScale(scale).setOrigin(0.5, 0).setScrollFactor(0);

        // Buttons with images
        this.add.image(this.cameras.main.width / 4 * 1.25, this.cameras.main.height / 1.75, 'solo').setScale(scale);
        this.add.image(this.cameras.main.width / 4 * 2.75, this.cameras.main.height / 1.75, 'duo').setScale(scale);

        // Showing instructions text
        this.add.text(this.cameras.main.width / 4 * 1.25, this.cameras.main.height / 1.35, 'Smash Red for Single Player', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '3rem' }).setScale(scale).setOrigin(0.5, 0.5).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 4 * 2.75, this.cameras.main.height / 1.35, 'Smash Yellow for 2 players', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '3rem' }).setScale(scale).setOrigin(0.5, 0.5).setScrollFactor(0);

        // Playing music
        let backgroundMusic = this.sound.add('music-menu', { volume: 0.4 });
        backgroundMusic.setLoop(true);
        backgroundMusic.play()

        // Listening to key input
        this.input.keyboard.on('keyup', (e) => {
            if (e.key == 'w') {
                this.tweens.add({
                    targets: backgroundMusic,
                    volume: 0,
                    duration: 600
                });
                this.cameras.main.fadeOut(800);
                this.time.delayedCall(1000, () => {
                    this.scene.remove()
                    this.scene.start("soloIntro")
                }
                    , [], this);
            }
            if (e.key == 'c') {
                this.tweens.add({
                    targets: backgroundMusic,
                    volume: 0,
                    duration: 600
                });
                this.cameras.main.fadeOut(800);
                this.time.delayedCall(1000, () => {
                    this.scene.remove()
                    this.scene.start("duoIntro")
                }, [], this);
            }
        });
    }
}

export default Menu