import 'phaser'
import Menu from './scenes/menu'
import SoloIntro from './scenes/soloIntro'
import DuoIntro from './scenes/duoIntro'
import Duo from './scenes/duo'
import Solo from './scenes/solo'
import SoloScore from './scenes/soloScore'
import DuoScore from './scenes/duoScore'

window.addEventListener('resize', function () {
  window.location.reload();
});

var config = {
  type: Phaser.AUTO,
  width: '100vw',
  height: '100%',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Menu, SoloIntro, DuoIntro, Solo, Duo, SoloScore, DuoScore]
};

new Phaser.Game(config);