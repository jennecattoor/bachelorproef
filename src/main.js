import 'phaser'
import Menu from './scenes/menu'
import Game from './scenes/game'
import Points from './scenes/points'

window.addEventListener('resize', function (event) {
  window.location.reload();
});

var config = {
  type: Phaser.AUTO,
  width: '100vw',
  height: '100%',
  backgroundColor: '#F7E093',
  margin: 'none',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Menu, Game, Points]
};

let game = new Phaser.Game(config);