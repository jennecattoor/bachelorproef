import './reset.css';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="game-instructions hidden">
    <h1>Press the button when a note reaches it!!</h1>
    <button class="button-start">Start game</button>
  </div>
  <canvas class="" id="canvas"></canvas>
`
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const buttonStart = document.querySelector('.button-start')
const gameInstructions = document.querySelector('.game-instructions')

const speed = 10
const columns = 6
const totalJumps = 180

let columnWidth;

const colours = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']

const songs = [
  { name: `Take On Me`, band: `a-ha`, src: `./public/songs/takeonme.mp3`, bpm: 84 },
  { name: `Hold the Line`, band: `TOTO`, src: ``, bpm: 97 },
  { name: `Your Love`, band: `The Outfield`, src: ``, bpm: 130 },
  { name: `I'm Still Standing`, band: `The Outfield`, src: ``, bpm: 88 },
  { name: `Midnight City`, band: `M83`, src: ``, bpm: 105 },
  { name: `Dancing Queen`, band: `ABBA`, src: ``, bpm: 101 },
  { name: `I Wanne Dance with Somebody`, band: `Whitney Houston`, src: ``, bpm: 119 },
  { name: `Got My Mind Set On You`, band: `George Harrison`, src: ``, bpm: 149 },
  { name: `I'm Gonne Be`, band: `The Proclaimers`, src: ``, bpm: 118 },
  { name: `September`, band: `Earth, Wind & Fire`, src: ``, bpm: 126 },
  { name: `I Want You Back`, band: `The Jackson 5`, src: ``, bpm: 98 },
  { name: `Help!`, band: `The Beatles`, src: ``, bpm: 95 },
  { name: `Don't Stop Me Now`, band: `Queen`, src: ``, bpm: 156 },
  { name: `Great Balls Of Fire`, band: `Jerry Lee Lewis`, src: ``, bpm: 79 },
  { name: `You're The One That I Want`, band: `John Travolta, Olivia Newton-John`, src: ``, bpm: 107 },
  { name: `Serotonin`, band: `Tom Walker`, src: ``, bpm: 164 }]

const handleResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columnWidth = Math.round(canvas.width / columns);
  gameSetup()
};

buttonStart.addEventListener('click', () => {
  // gameInstructions.classList.add('hidden')
  canvas.classList.remove('hidden')
})

const gameSetup = () => {
  ctx.beginPath();
  for (let i = 1; i < columns; i++) {
    ctx.beginPath();
    ctx.moveTo(columnWidth * i, 0);
    ctx.lineTo(columnWidth * i, canvas.height);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  for (let i = 0; i < columns; i++) {
    ctx.fillStyle = colours[i];
    ctx.beginPath();
    ctx.roundRect((columnWidth * i) + 15, canvas.height - 200, columnWidth - 30, 185, [10]);
    ctx.fill();
  }
}
handleResize();
window.addEventListener('resize', handleResize);
