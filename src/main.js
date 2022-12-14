import 'phaser'
import Menu from './scenes/menu'
import Video from './scenes/video'
import Duo from './scenes/duo'
import Solo from './scenes/solo'
import Points from './scenes/points'

window.addEventListener('resize', function () {
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
  scene: [Menu, Video, Solo, Duo, Points]
};

new Phaser.Game(config);