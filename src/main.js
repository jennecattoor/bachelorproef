import 'phaser'
import Menu from './scenes/menu'
import Game from './scenes/game'
import Points from './scenes/points'
import Video from './scenes/video'

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
  scene: [Game, Menu, Video, Points]
};

let game = new Phaser.Game(config);