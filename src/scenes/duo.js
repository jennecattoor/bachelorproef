import 'phaser'

let scale;
let timerText;
let interval;
let speedText;
let scoreTextRed;
let scoreTextBlue;
let scoreRed = 0;
let scoreBlue = 0;
let initialTime = 15;
let spawnSpeed = 1000;
let checkMoleSpeed = 2000;
let molesAnimated = [];
let molesUp = [];
let increasedSpeed = false;
let previousMoleRed = false;
let RedMole1, RedMole2, RedMole3, RedMole4, RedMole5, RedMole6, BlueMole1, BlueMole2, BlueMole3, BlueMole4, BlueMole5, BlueMole6;

class Duo extends Phaser.Scene {
    constructor() {
        super("duo");
    }

    preload() {
        this.load.image('background', './src/assets/images/background.jpg');
        this.load.audio('instructions', './src/assets/audio/instructions.wav');
        this.load.image('mask-top', './src/assets/images/mask-top.png');
        this.load.image('mask-bottem', './src/assets/images/mask-bottem.png');
        this.load.image('mole-red', './src/assets/images/mole-red.png');
        this.load.image('mole-blue', './src/assets/images/mole-blue.png');
        this.load.image('hit', './src/assets/images/hit.png');
    }

    create() {
        // Camera fade in
        this.cameras.main.fadeIn(500)

        // Background
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        // Instructions
        let instruction = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 100, `The goal is to eliminate as many moles as possible from the other team`, { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '5rem' }).setOrigin(0.5, 0).setScrollFactor(0);
        this.sound.add('instructions').play();
        setTimeout(() => { instruction.setVisible(false) }, 5000);

        // Point text
        scoreTextRed = this.add.text(30, 30, '0 Points', { fontFamily: 'roadstore, Arial', color: '#fc0000', fontSize: '10rem' });
        scoreTextBlue = this.add.text(this.cameras.main.width - 30, 30, '0 Points', { fontFamily: 'roadstore, Arial', color: '#1932d2', fontSize: '10rem' }).setOrigin(1, 0);

        // Timer
        timerText = this.add.text(this.cameras.main.width / 2, 30, '1:15', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, 0);
        this.time.delayedCall(6000, this.timer, [], this);

        // Speed text
        speedText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, 'They are speeding up!', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, 0).setScrollFactor(0).setVisible(false);

        // Moles
        // Creating the mask for the top
        let maskShapeTop = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-top').setVisible(false).setScale(scale).setScrollFactor(0);
        let maskTop = maskShapeTop.createBitmapMask();

        // Creating the mask for the bottem
        let maskShapeBottem = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mask-bottem').setVisible(false).setScale(scale).setScrollFactor(0);
        let maskBottem = maskShapeBottem.createBitmapMask();

        // Red mole 1
        RedMole1 = this.add.image(window.innerWidth / 3.55, window.innerHeight / 1.88, 'mole-red').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Red mole 2
        RedMole2 = this.add.image(window.innerWidth / 2, window.innerHeight / 1.75, 'mole-red').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Red mole 3
        RedMole3 = this.add.image(window.innerWidth / 1.44, window.innerHeight / 1.75, 'mole-red').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Red mole 4
        RedMole4 = this.add.image(window.innerWidth / 4.18, window.innerHeight / 1.3, 'mole-red').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Red mole 5
        RedMole5 = this.add.image(window.innerWidth / 1.96, window.innerHeight / 1.3, 'mole-red').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Red mole 6
        RedMole6 = this.add.image(window.innerWidth / 1.35, window.innerHeight / 1.27, 'mole-red').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Blue mole 1
        BlueMole1 = this.add.image(window.innerWidth / 3.55, window.innerHeight / 1.88, 'mole-blue').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Blue mole 2
        BlueMole2 = this.add.image(window.innerWidth / 2, window.innerHeight / 1.75, 'mole-blue').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Blue mole 3
        BlueMole3 = this.add.image(window.innerWidth / 1.44, window.innerHeight / 1.75, 'mole-blue').setScale(scale).setScrollFactor(0).setMask(maskTop);

        // Blue mole 4
        BlueMole4 = this.add.image(window.innerWidth / 4.18, window.innerHeight / 1.3, 'mole-blue').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Blue mole 5
        BlueMole5 = this.add.image(window.innerWidth / 1.96, window.innerHeight / 1.3, 'mole-blue').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Blue mole 6
        BlueMole6 = this.add.image(window.innerWidth / 1.35, window.innerHeight / 1.27, 'mole-blue').setScale(scale).setScrollFactor(0).setMask(maskBottem);

        // Spawning moles
        setTimeout(() => { interval = setInterval(() => { this.spawnMole() }, spawnSpeed) }, 5000)

        // Listening to keys
        this.input.keyboard.on('keyup', (e) => this.keyboardInput(e));
    }

    keyboardInput = (event) => {
        if (event.key == 'w') {
            this.hitMole(0)
        }
        if (event.key == 'x') {
            this.hitMole(1)
        }
        if (event.key == 'c') {
            this.hitMole(2)
        }
        if (event.key == 'v') {
            this.hitMole(3)
        }
        if (event.key == 'b') {
            this.hitMole(4)
        }
        if (event.key == 'n') {
            this.hitMole(5)
        }
    }

    hitMole = (holeNr) => {
        const redMoles = [RedMole1, RedMole2, RedMole3, RedMole4, RedMole5, RedMole6]
        const blueMoles = [BlueMole1, BlueMole2, BlueMole3, BlueMole4, BlueMole5, BlueMole6]

        if (molesUp.includes(redMoles[holeNr])) {
            scoreBlue++;
            scoreTextBlue.setText(scoreBlue + ' Points');
            this.moveMoleBack(redMoles[holeNr])
            let hit = this.add.image(redMoles[holeNr].x - 80, redMoles[holeNr].y - 70, 'hit')
            hit.setScale(scale).setScrollFactor(0)
            this.time.delayedCall(300, () => { hit.destroy(); }, [], this);
        }
        if (molesUp.includes(blueMoles[holeNr])) {
            scoreRed++;
            scoreTextRed.setText(scoreRed + ' Points');
            this.moveMoleBack(blueMoles[holeNr])
            let hit = this.add.image(blueMoles[holeNr].x - 80, blueMoles[holeNr].y - 70, 'hit')
            hit.setScale(scale).setScrollFactor(0)
            this.time.delayedCall(300, () => { hit.destroy(); }, [], this);
        }
    }

    moveMoleBack = (moleMoved) => {
        molesUp = molesUp.filter(mole => mole != moleMoved)
        let tween = this.tweens.add({
            y: moleMoved.y + 150,
            targets: moleMoved,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                molesAnimated = molesAnimated.filter(mole => mole != moleMoved)
                tween.remove();
            }
        })
    }

    moveMole = (moleMoved) => {
        let tween = this.tweens.add({
            y: moleMoved.y - 150,
            targets: moleMoved,
            ease: "Power1",
            duration: 250,
            onComplete: () => {
                molesUp.push(moleMoved)
                tween.remove();
            }
        })
        this.time.delayedCall(checkMoleSpeed, () => { this.checkMoleTime(moleMoved); }, [], this);
    }

    checkMoleTime = (mole) => {
        if (molesUp.includes(mole)) {
            this.moveMoleBack(mole)
        }
    }

    spawnMole = () => {
        const redMoles = [RedMole1, RedMole2, RedMole3, RedMole4, RedMole5, RedMole6]
        const blueMoles = [BlueMole1, BlueMole2, BlueMole3, BlueMole4, BlueMole5, BlueMole6]

        let randomHole = Math.floor(Math.random() * 6);
        while (molesAnimated.includes(redMoles[randomHole]) || molesAnimated.includes(blueMoles[randomHole])) {
            randomHole = Math.floor(Math.random() * 6);
            if (molesAnimated.length == 6) {
                return;
            }
        }
        if (previousMoleRed) {
            previousMoleRed = false
            molesAnimated.push(blueMoles[randomHole])
            this.moveMole(blueMoles[randomHole])
        } else {
            previousMoleRed = true
            molesAnimated.push(redMoles[randomHole])
            this.moveMole(redMoles[randomHole])
        }
    }

    timer() {
        let timerInterval = setInterval(() => {
            initialTime -= 1;
            timerText.setText(this.formatTime(initialTime));
            if (initialTime <= 0) {
                clearInterval(timerInterval)
                this.cameras.main.fadeOut(500);
                this.time.delayedCall(500, () => {
                    this.scene.remove()
                    this.scene.start('duoScore', { scoreRed: scoreRed, scoreBlue: scoreBlue })
                }, [], this);
                return
            }
        }, 1000);
    }

    formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var partInSeconds = seconds % 60;
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        return `${minutes}:${partInSeconds}`;
    }

    update() {
        if (initialTime === 45 && increasedSpeed === false) {
            increasedSpeed = true
            clearInterval(interval)
            checkMoleSpeed = 1750
            interval = setInterval(() => { this.spawnMole() }, spawnSpeed - 250)
            speedText.setVisible(true)
        } else if (initialTime === 32) {
            increasedSpeed = false
            speedText.setVisible(false)
        }
    }
}

export default Duo