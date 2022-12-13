import 'phaser'

let mole1, mole2, mole3, mole4, mole5, mole6;
let spawnSpeed = 2000;
let lives = 3;
let molesUp = [];
let molesAnimated = [];
let scale;
let points = 0

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
        this.load.image('hit', './src/assets/images/hit.png');
        this.load.image('heart', './src/assets/images/heart.png');
    }


    create() {
        // Fading in camera
        this.cameras.main.fadeIn(4000);
        // this.add.text(0, 0, 'You need to make sure that the moles cant steal the guitar', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        //Setting the background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        // Points text
        this.scoreText = this.add.text(20, 20, '0 Points', { fontFamily: 'Arial, Georgia, "Goudy Bookletter 1911", serif', color: '#282828', fontSize: '6rem' });
        this.lives = this.add.text(this.cameras.main.width - 220, 20, '3 Lives', { fontFamily: 'Arial, Georgia, "Goudy Bookletter 1911", serif', color: '#282828', fontSize: '6rem' });

        // Playing the audio
        let audio = this.sound.add('assignment');
        audio.play();

        // Creating the mask from the top
        let maskShapeTop = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-top').setVisible(false);
        maskShapeTop.setScale(scale).setScrollFactor(0)
        let maskTop = maskShapeTop.createBitmapMask();

        // Creating the mask for the bottem
        let maskShapeBottem = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-bottem').setVisible(false);
        maskShapeBottem.setScale(scale).setScrollFactor(0)
        let maskBottem = maskShapeBottem.createBitmapMask();

        // Mole 1 (Red)
        mole1 = this.add.image(window.innerWidth / 3.55, window.innerHeight / 1.88, 'mole');
        mole1.setScale(scale).setScrollFactor(0)
        mole1.setMask(maskTop);

        // Mole 2 (Orange)
        mole2 = this.add.image(window.innerWidth / 2, window.innerHeight / 1.75, 'mole');
        mole2.setScale(scale).setScrollFactor(0)
        mole2.setMask(maskTop);

        // Mole 3 (Yellow)
        mole3 = this.add.image(window.innerWidth / 1.44, window.innerHeight / 1.75, 'mole');
        mole3.setScale(scale).setScrollFactor(0)
        mole3.setMask(maskTop);

        // Mole 4 (Green)
        mole4 = this.add.image(window.innerWidth / 4.18, window.innerHeight / 1.3, 'mole');
        mole4.setScale(scale).setScrollFactor(0)
        mole4.setMask(maskBottem);

        // Mole 5 (Blue)
        mole5 = this.add.image(window.innerWidth / 1.96, window.innerHeight / 1.3, 'mole');
        mole5.setScale(scale).setScrollFactor(0)
        mole5.setMask(maskBottem);

        // Mole 5 (Blue)
        mole6 = this.add.image(window.innerWidth / 1.35, window.innerHeight / 1.27, 'mole');
        mole6.setScale(scale).setScrollFactor(0)
        mole6.setMask(maskBottem);

        setTimeout(() => { this.spawnMoles() }, 3000)

        // Listening to keys
        this.input.keyboard.on('keyup', (e) => this.keyboardInput(e));

    }

    keyboardInput = (event) => {
        if (event.key == 'w') {
            this.hitMole(mole1)
        }
        if (event.key == 'x') {
            this.hitMole(mole2)
        }
        if (event.key == 'c') {
            this.hitMole(mole3)
        }
        if (event.key == 'v') {
            this.hitMole(mole4)
        }
        if (event.key == 'b') {
            this.hitMole(mole5)
        }
        if (event.key == 'n') {
            this.hitMole(mole6)
        }
    }

    hitMole = (moleNr) => {
        if (molesUp.includes(moleNr)) {
            points++;
            this.scoreText.setText(points + ' Points');
            this.moveMoleBack(moleNr)
            let hit = this.add.image(moleNr.x - 80, moleNr.y - 70, 'hit')
            hit.setScale(scale).setScrollFactor(0)
            this.time.delayedCall(300, () => { hit.destroy(); }, [], this);
        }
    }

    moveMoleBack = (moleNr) => {
        molesUp = molesUp.filter(mole => mole != moleNr)
        let tween = this.tweens.add({
            y: moleNr.y + 150,
            targets: moleNr,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                molesAnimated = molesAnimated.filter(mole => mole != moleNr)
                tween.remove();
            }
        })
    }

    moveMole = (moleNr) => {
        molesUp.push(moleNr)
        let tween = this.tweens.add({
            y: moleNr.y - 150,
            targets: moleNr,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                tween.remove();
            }
        })
        this.time.delayedCall(2000, () => { this.checkMoleTime(moleNr); }, [], this);
    }

    checkMoleTime = (moleNr) => {
        if (molesUp.includes(moleNr)) {
            this.moveMoleBack(moleNr)
            lives--;
            this.lives.setText(lives + ' Lives');
            if (lives === 0) {
                this.cameras.main.shake(500);
            }
        }
    }

    spawnMoles = () => {
        const moles = [mole1, mole2, mole3, mole4, mole5, mole6]
        setInterval(() => {
            let randomMole = Math.floor(Math.random() * 6);
            while (molesAnimated.includes(moles[randomMole])) {
                randomMole = Math.floor(Math.random() * 6);
                if (molesAnimated.length === moles.length) {
                    this.cameras.main.shake(500);
                    return
                }
            }
            this.moveMole(moles[randomMole])
            molesAnimated.push(moles[randomMole])
        }, spawnSpeed)
        // game.time.events.loop(Phaser.Timer.SECOND, this.addMonster, this);

    }

    update() {
    }
}

export default Game