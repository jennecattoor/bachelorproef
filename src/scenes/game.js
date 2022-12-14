import 'phaser'

let mole1, mole2, mole3, mole4, mole5, mole6;
let spawnSpeed = 2000;
let lives = 3;
let molesUp = [];
let molesAnimated = [];
let scale;
let points = 0
let interval
let increasedSpeed = false
let speedText
let heartOne, heartTwo, heartThree;

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

        //Setting the background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)


        // Instruction text
        let instruction = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 100, 'You need to make sure that the moles cant steal the guitar', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '5rem' }).setOrigin(0.5, 0).setScrollFactor(0);
        setTimeout(() => { instruction.setVisible(false) }, 4500);

        // Points text
        this.scoreText = this.add.text(20, 20, '0 Points', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '8rem' });

        // Show the hearts
        heartOne = this.add.image(this.cameras.main.width - 400 + 0, 100, 'heart').setScale(0.5).setScrollFactor(0)
        heartTwo = this.add.image(this.cameras.main.width - 400 + 150, 100, 'heart').setScale(0.5).setScrollFactor(0)
        heartThree = this.add.image(this.cameras.main.width - 400 + 300, 100, 'heart').setScale(0.5).setScrollFactor(0)

        // Speed text
        speedText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 400, 'They are getting faster!', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, 0).setScrollFactor(0).setVisible(false);

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

        setTimeout(() => { interval = setInterval(() => { this.spawnMole() }, spawnSpeed) }, 5000)

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

    showHearts = (lives) => {
        console.log(lives)
        if (lives == 2) {
            this.tweens.add({
                scale: 0,
                targets: heartOne,
                ease: "Power1",
                duration: 250,
                onComplete: () => {
                    heartOne.destroy()
                }
            })
        }
        if (lives == 1) {
            this.tweens.add({
                scale: 0,
                targets: heartTwo,
                ease: "Power1",
                duration: 250,
                onComplete: () => {
                    heartOne.destroy()
                }
            })
        }
        if (lives == 0) {
            this.tweens.add({
                scale: 0,
                targets: heartThree,
                ease: "Power1",
                duration: 250,
                onComplete: () => {
                    heartOne.destroy()
                }
            })
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
        let tween = this.tweens.add({
            y: moleNr.y - 150,
            targets: moleNr,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                molesUp.push(moleNr)
                tween.remove();
            }
        })
        this.time.delayedCall(2000, () => { this.checkMoleTime(moleNr); }, [], this);
    }

    checkMoleTime = (moleNr) => {
        if (molesUp.includes(moleNr)) {
            this.moveMoleBack(moleNr)
            lives--;
            this.showHearts(lives)
            if (lives === 0) {
                this.cameras.main.shake(500);
                this.cameras.main.fadeOut(500);
                setTimeout(() => { this.scene.start('points', { points: points }) }, 500);
            }
        }
    }

    spawnMole = () => {
        const moles = [mole1, mole2, mole3, mole4, mole5, mole6]
        let randomMole = Math.floor(Math.random() * 6);
        while (molesAnimated.includes(moles[randomMole])) {
            randomMole = Math.floor(Math.random() * 6);
        }
        this.moveMole(moles[randomMole])
        molesAnimated.push(moles[randomMole])
    }

    update() {
        if (points === 12 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed - 300)
            speedText.setVisible(true)
        } else if (points === 13) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
        if (points === 24 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed - 500)
            speedText.setVisible(true)
        } else if (points === 25) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
        if (points === 36 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed - 800)
            speedText.setVisible(true)
        } else if (points === 37) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
        if (points === 48 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed - 1000)
            speedText.setVisible(true)
        } else if (points === 49) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
    }
}

export default Game