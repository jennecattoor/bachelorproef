import 'phaser'

let music;
let scale;
let interval;
let speedText;
let lives = 3;
let points = 0;
let spawnSpeed = 2000;
let molesUp = [];
let molesAnimated = [];
let increasedSpeed = false;
let heartOne, heartTwo, heartThree;
let mole1, mole2, mole3, mole4, mole5, mole6;

class Solo extends Phaser.Scene {
    constructor() {
        super("solo");
    }

    preload() {
        this.load.image('hit', './../assets/images/hit.png');
        this.load.image('mole', './../assets/images/solo/mole.png');
        this.load.image('heart', './../assets/images/solo/heart.png');
        this.load.image('mask-top', './../assets/images/mask-top.png');
        this.load.image('background', './../assets/images/background.jpg');
        this.load.image('mask-bottem', './../assets/images/mask-bottem.png');
        this.load.audio('assignment', './../assets/audio/solo/assignment.mp3');
        this.load.audio('music-solo', './../assets/audio/music/music-solo.mp3');
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
        let instruction = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 100, `You need to make sure that the moles can't steal the music-solo`, { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '5rem' }).setOrigin(0.5, 0).setScrollFactor(0);
        setTimeout(() => { instruction.setVisible(false) }, 4500);

        // Points text
        this.scoreText = this.add.text(30, 30, '0 Points', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' });

        // Show the hearts
        heartOne = this.add.image(this.cameras.main.width - 400 + 0, 100, 'heart').setScale(0.5).setScrollFactor(0)
        heartTwo = this.add.image(this.cameras.main.width - 400 + 150, 100, 'heart').setScale(0.5).setScrollFactor(0)
        heartThree = this.add.image(this.cameras.main.width - 400 + 300, 100, 'heart').setScale(0.5).setScrollFactor(0)

        // Speed text
        speedText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, 'They are speeding up!', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, 0).setScrollFactor(0).setVisible(false);

        // Playing the audio
        let audio = this.sound.add('assignment');
        audio.play();

        // Playing music
        music = this.sound.add('music-solo', { volume: 0.8 });
        music.play()

        // Creating the mask from the top
        let maskShapeTop = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-top').setVisible(false);
        maskShapeTop.setScale(scale).setScrollFactor(0)
        let maskTop = maskShapeTop.createBitmapMask();

        // Creating the mask for the bottem
        let maskShapeBottem = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-bottem').setVisible(false);
        maskShapeBottem.setScale(scale).setScrollFactor(0)
        let maskBottem = maskShapeBottem.createBitmapMask();

        // Mole 1 (Red hole)
        mole1 = this.add.image(window.innerWidth / 3.55, window.innerHeight / 1.88, 'mole').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Mole 2 (Orange hole)
        mole2 = this.add.image(window.innerWidth / 2, window.innerHeight / 1.75, 'mole').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Mole 3 (Yellow hole)
        mole3 = this.add.image(window.innerWidth / 1.44, window.innerHeight / 1.75, 'mole').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Mole 4 (Green hole)
        mole4 = this.add.image(window.innerWidth / 4.18, window.innerHeight / 1.3, 'mole').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Mole 5 (Blue hole)
        mole5 = this.add.image(window.innerWidth / 1.96, window.innerHeight / 1.3, 'mole').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Mole 6 (Purple hole)
        mole6 = this.add.image(window.innerWidth / 1.35, window.innerHeight / 1.27, 'mole').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Setting up interval after 5 seconds
        this.time.delayedCall(5000, () => { interval = setInterval(() => { this.spawnMole() }, spawnSpeed) }, [], this);

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
            y: moleNr.y + this.cameras.main.height / 9,
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
            y: moleNr.y - this.cameras.main.height / 9,
            targets: moleNr,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                molesUp.push(moleNr)
                tween.remove();
            }
        })
        this.time.delayedCall(spawnSpeed, () => { this.checkMoleTime(moleNr); }, [], this);
    }

    checkMoleTime = (moleNr) => {
        if (molesUp.includes(moleNr)) {
            this.moveMoleBack(moleNr)
            lives--;
            this.showHearts(lives)
            if (lives === 0) {
                clearInterval(interval)
                this.cameras.main.fadeOut(500);
                this.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 600
                });
                this.time.delayedCall(700, () => { this.scene.start('soloScore', { points: points }) }, [], this);
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
            spawnSpeed = 1750
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed)
            speedText.setVisible(true)
        } else if (points === 13) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
        if (points === 24 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            spawnSpeed = 1500
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed)
            speedText.setVisible(true)
        } else if (points === 25) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
        if (points === 36 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            spawnSpeed = 1250
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed)
            speedText.setVisible(true)
        } else if (points === 37) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
        if (points === 48 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            spawnSpeed = 1000
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed)
            speedText.setVisible(true)
        } else if (points === 49) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
        if (points === 64 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            spawnSpeed = 750
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed)
            speedText.setVisible(true)
        } else if (points === 65) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
    }
}

export default Solo