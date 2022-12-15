import 'phaser'
import Menu from './scenes/menu'
import Video from './scenes/video'
import Instructions from './scenes/instructions'
import Duo from './scenes/duo'
import Solo from './scenes/solo'
import Points from './scenes/points'
import Results from './scenes/results'

window.addEventListener('resize', function () {
  window.location.reload();
});

var config = {
  type: Phaser.AUTO,
  width: '100vw',
  height: '100%',
  backgroundColor: '#000000',
  margin: 'none',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Menu, Video, Solo, Instructions, Duo, Points, Results]
};

new Phaser.Game(config);