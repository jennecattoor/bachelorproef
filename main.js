import './reset.css';
import './style.css';

const speed = 10
const totalJumps = 180
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

document.querySelector('#app').innerHTML = `
  <div class="grid">
    <div class="grid-column" id="column1">
      <div class="square" id="square1"></div>
    </div>
    <div class="grid-column" id="column2">
      <div class="square" id="square2"></div>
    </div>
    <div class="grid-column" id="column3">
      <div class="square" id="square3"></div>
    </div>
    <div class="grid-column" id="column4">
      <div class="square" id="square4"></div>
    </div>
    <div class="grid-column" id="column5">
      <div class="square" id="square5"></div>
    </div>
    <div class="grid-column" id="column6">
      <div class="square" id="square6"></div>
    </div>
  </div>
`
const column1 = document.querySelector(`.grid-column#column1`)
const note = document.createElement(`div`)
note.classList.add(`note`)
column1.appendChild(note);