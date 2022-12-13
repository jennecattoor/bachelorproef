import 'phaser'

let scale
let video

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
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-blurred').setAlpha(.3)
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        let title = this.add.text(this.cameras.main.width / 2, 150, 'Whac-A-Mole', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '14rem' });
        title.setOrigin(0.5, 0).setScrollFactor(0);

        let titleSmall = this.add.text(this.cameras.main.width / 2, 300, 'Wilde Westen Edition', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '8.6rem' });
        titleSmall.setOrigin(0.5, 0).setScrollFactor(0);

        this.add.image(this.cameras.main.width / 2 - 300, this.cameras.main.height / 1.7, 'singleplayer').setScale(.8);
        this.add.image(this.cameras.main.width / 2 + 300, this.cameras.main.height / 1.7, 'multiplayer').setScale(.8);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, 'Smash Red for Single Player', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '4rem' }).setOrigin(0.5, 0).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 150, 'Smash Yellow for 2 players', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '4rem' }).setOrigin(0.5, 0).setScrollFactor(0);

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