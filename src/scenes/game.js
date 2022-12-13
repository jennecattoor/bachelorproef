import 'phaser'

class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {
        this.load.audio('assignment', './src/assets/audio/assignment.wav');
        this.load.image('background', './src/assets/images/background.jpg');
        this.load.image('mask-top', './src/assets/images/mask-top.png');
        this.load.image('mask-bottem', './src/assets/images/mask-bottem.png');
        this.load.image('mole', './src/assets/images/mole.png');
    }

    create() {
        // Fading in camera
        // this.cameras.main.fadeIn(4000);
        // this.add.text(0, 0, 'You need to make sure that the moles cant steal the guitar', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        //Setting the background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        let scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        // Playing the audio
        // let audio = this.sound.add('assignment');
        // audio.play();

        // Creating the mask from the top
        let maskShape1 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-top').setVisible(false);
        maskShape1.setScale(scale).setScrollFactor(0)
        let maskTop = maskShape1.createBitmapMask();

        // Mole 1 (Red)
        let mole1 = this.add.image(window.innerWidth / 3.55, window.innerHeight / 1.88, 'mole');
        mole1.setScale(scale).setScrollFactor(0)
        mole1.setMask(maskTop);

        // Mole 2 (Orange)
        let mole2 = this.add.image(window.innerWidth / 2, window.innerHeight / 1.75, 'mole');
        mole2.setScale(scale).setScrollFactor(0)
        mole2.setMask(maskTop);

        // Mole 3 (Yellow)
        let mole3 = this.add.image(window.innerWidth / 1.44, window.innerHeight / 1.75, 'mole');
        mole3.setScale(scale).setScrollFactor(0)
        mole3.setMask(maskTop);

        // Creating the mask for the bottem
        let maskShape2 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-bottem').setVisible(false);
        maskShape2.setScale(scale).setScrollFactor(0)
        let maskBottem = maskShape2.createBitmapMask();

        // Mole 4 (Green)
        let mole4 = this.add.image(window.innerWidth / 4.18, window.innerHeight / 1.3, 'mole');
        mole4.setScale(scale).setScrollFactor(0)
        mole4.setMask(maskBottem);

        // Mole 5 (Blue)
        let mole5 = this.add.image(window.innerWidth / 1.96, window.innerHeight / 1.3, 'mole');
        mole5.setScale(scale).setScrollFactor(0)
        mole5.setMask(maskBottem);

        // Mole 5 (Blue)
        let mole6 = this.add.image(window.innerWidth / 1.35, window.innerHeight / 1.27, 'mole');
        mole6.setScale(scale).setScrollFactor(0)
        mole6.setMask(maskBottem);

        setTimeout(() => { this.spawnMoles() }, 6000)
    }

    moveMoleBack = (moleNr) => {
        let tween = this.tweens.add({
            y: moleNr.y + 150,
            targets: moleNr,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                tween.remove();
            }
        })
    }

    moveMole = (moleNr) => {
        let tween = this.tweens.add({
            y: moleNr.y - 150,
            targets: moleNr,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                tween.remove();
            }
        })
        setTimeout(() => { this.moveMoleBack(moleNr) }, 3000)
    }

    spawnMoles = () => {
        // setInterval(() => {
        //     let randomMole = Math.floor(Math.random() * 6) + 1;
        //     console.log(randomMole)
        //     this.moveMole('mole' + randomMole)
        // }, 2000)
    }

    update() {
    }
}

export default Game