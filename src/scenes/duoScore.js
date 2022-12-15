import 'phaser'

let scale
let scoreRed, scoreBlue
let test = 0

class DuoScore extends Phaser.Scene {
    constructor() {
        super("duoScore");
    }

    init(data) {
        scoreRed = data.scoreRed;
        scoreBlue = data.scoreBlue;
    }

    preload() {
        this.load.audio('redWins', './src/assets/audio/redWins.wav');
        this.load.audio('blueWins', './src/assets/audio/blueWins.wav');
        this.load.audio('tie', './src/assets/audio/tie.wav');
    }

    create() {
        this.cameras.main.fadeIn(500);

        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-blurred')
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)

        // Versus
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'VS').setAlpha(.7).setScale(scale).setScrollFactor(0)
        let winnerText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, '', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, 0).setScrollFactor(0);
        if (scoreRed > scoreBlue) {
            winnerText.setText('Team Red wins!')
            this.sound.add('redWins').play();
            this.add.text(this.cameras.main.width / 4 * 1, this.cameras.main.height / 2 - 180, 'Winner', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, .5).setScrollFactor(0);
        } else if (scoreRed < scoreBlue) {
            this.sound.add('blueWins').play();
            winnerText.setText('Team Blue wins!')
            this.add.text(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2 - 180, 'Winner', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, .5).setScrollFactor(0);
        } else {
            this.sound.add('tie').play();
            winnerText.setText('It\'s a tie!')
        }

        // Images of moles
        this.add.image(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2, 'mole-blue').setScale(scale).setScrollFactor(0);
        this.add.image(this.cameras.main.width / 4 * 1, this.cameras.main.height / 2, 'mole-red').setScale(scale).setScrollFactor(0);

        // Mole texts
        this.add.text(this.cameras.main.width / 4 * 3, this.cameras.main.height / 2 + 180, scoreBlue + ' Points', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, .5).setScrollFactor(0);
        this.add.text(this.cameras.main.width / 4 * 1, this.cameras.main.height / 2 + 180, scoreRed + ' Points', { fontFamily: 'roadstore, Arial', color: '#282828', fontSize: '10rem' }).setOrigin(0.5, .5).setScrollFactor(0);

        this.time.delayedCall(4000, () => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => { location.reload() }, [], this);
        }, [], this);

    }

    update() {
    }
}

export default DuoScore