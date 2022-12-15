import 'phaser'

let scale

class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        this.load.image('background-blurred', './src/assets/images/background-blurred.jpg');
        this.load.image('singleplayer', './src/assets/images/single.png');
        this.load.image('multiplayer', './src/assets/images/two.png');
        this.load.video('intro', './src/assets/video/intro.mp4');
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
        let title = this.add.text(this.cameras.main.width / 2, 150, 'Whac-A-Mole', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '14rem' });
        title.setOrigin(0.5, 0).setScrollFactor(0);

        // Subtitle
        let subtitle = this.add.text(this.cameras.main.width / 2, 300, 'Wilde Westen Edition', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '8.6rem' });
        subtitle.setOrigin(0.5, 0).setScrollFactor(0);

        // Buttons with images
        this.add.image(this.cameras.main.width / 2 - 300, this.cameras.main.height / 2, 'singleplayer').setScale(.8);
        this.add.image(this.cameras.main.width / 2 + 300, this.cameras.main.height / 2, 'multiplayer').setScale(.8);

        // Showing instructions text
        this.add.text(this.cameras.main.width / 2 - 300, this.cameras.main.height - 100, 'Smash Red for Single Player', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '4rem' }).setOrigin(0.5, 0.5).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 2 + 300, this.cameras.main.height - 100, 'Smash Yellow for 2 players', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '4rem' }).setOrigin(0.5, 0.5).setScrollFactor(0);

        // Listening to key input
        this.input.keyboard.on('keyup', (e) => {
            if (e.key == 'w') {
                this.cameras.main.fadeOut(500);
                this.time.delayedCall(500, () => {
                    this.scene.remove()
                    this.scene.start("soloIntro")
                }
                    , [], this);
            }
            if (e.key == 'c') {
                this.cameras.main.fadeOut(500);
                this.time.delayedCall(500, () => {
                    this.scene.remove()
                    this.scene.start("duoIntro")
                }, [], this);
            }
        });
    }
}

export default Menu