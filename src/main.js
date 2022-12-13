import 'phaser'
import Menu from './scenes/menu'
import Game from './scenes/game'

window.addEventListener('resize', function (event) {
  window.location.reload();
});

var config = {
  type: Phaser.AUTO,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#F7E093',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Game, Menu]
};

let game = new Phaser.Game(config);