import Timer from './modules/Timer.js'
// import Note from './modules/Note.js'
// import Resize from './modules/Resize.js'
import Background from './modules/Background.js'
import notesTiming from './assets/timing.json' assert {type: 'json'}

const canvasNotes = document.querySelector('#canvasNotes');
const ctxNotes = canvasNotes.getContext('2d');
const canvasBackground = document.querySelector('#canvasBackground');
const ctxBackground = canvasBackground.getContext('2d');

const text = document.querySelector('.text');
const game = document.querySelector('.game');
const audio = document.querySelector('.audio');
const timer = document.querySelector('.timer');
const points = document.querySelector('.points');
const buttonStart = document.querySelector('.button-start');
const gameInformation = document.querySelector('.game-information');
const gameInstructions = document.querySelector('.game-instructions');

const speed = 3;
const columns = 6;
const padding = 16;
const blockHeight = 185;
const totalTime = 119;

let currentNote = 0
let columnWidth;
let currentSong = 9;
let pointCount = 0;
let noteIsTouching = [];
let removeNote = null;
let previousColumn = null;

const colours = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

const songs = [
  { name: `Take On Me`, band: `a-ha`, src: `./songs/takeonme.mp3`, bpm: 84 },
  { name: `Hold the Line`, band: `TOTO`, src: `./songs/holdtheline.mp3`, bpm: 97 },
  { name: `Your Love`, band: `The Outfield`, src: `./songs/yourlove.mp3`, bpm: 130 },
  { name: `I'm Still Standing`, band: `Elton John`, src: `./songs/imstillstanding.mp3`, bpm: 88 },
  { name: `Dancing Queen`, band: `ABBA`, src: `./songs/dancingqueen.mp3`, bpm: 101 },
  { name: `I Wanne Dance with Somebody`, band: `Whitney Houston`, src: `./songs/iwannedance.mp3`, bpm: 119 },
  { name: `Got My Mind Set On You`, band: `George Harrison`, src: `./songs/gotmymind.mp3`, bpm: 149 },
  { name: `I'm Gonne Be`, band: `The Proclaimers`, src: `./songs/imgonnebe.mp3`, bpm: 118 },
  { name: `September`, band: `Earth, Wind & Fire`, src: `./songs/september.mp3`, bpm: 126 },
  { name: `I Want You Back`, band: `The Jackson 5`, src: `./songs/iwantyouback.mp3`, notes: 'assets/iwantyouback.json' },
  { name: `Help!`, band: `The Beatles`, src: `./songs/help.mp3`, bpm: 95 },
  { name: `Don't Stop Me Now`, band: `Queen`, src: `./songs/dontstopmenow.mp3`, bpm: 156 },
  { name: `Great Balls Of Fire`, band: `Jerry Lee Lewis`, src: `./songs/greatballsoffire.mp3`, bpm: 79 },
  { name: `You're The One That I Want`, band: `John Travolta, Olivia Newton-John`, src: `./songs/theonethatiwant.mp3`, bpm: 107 }];

const handleResize = () => {
  canvasBackground.width = window.innerWidth;
  canvasBackground.height = window.innerHeight;
  canvasNotes.width = window.innerWidth;
  canvasNotes.height = window.innerHeight;
  columnWidth = Math.round(canvasBackground.width / columns);
  Background(columnWidth, columns, colours, padding, blockHeight)
};

buttonStart.addEventListener('click', () => {
  noteIsTouching = [];
  points.innerHTML = '0 Points';
  pointCount = 0;
  handleResize();
  startGame()
})

const startGame = () => {
  gameInstructions.classList.add('hidden');
  game.classList.remove('hidden');
  gameInformation.classList.remove('hidden');

  Timer(totalTime, timer);

  audio.src = songs[currentSong].src;

  setInterval(function () {
    if ((audio.currentTime.toFixed(2)) >= (notesTiming[currentNote]) - 5.5) {
      currentNote++
      spawnNote()
    }
  }, 50);
}

const spawnNote = () => {
  let yPosition = -100;
  let noteAdded = false;
  let randomColumn = Math.floor(Math.random() * columns);
  while (randomColumn === previousColumn) {
    randomColumn = Math.floor(Math.random() * columns);
  }

  previousColumn = randomColumn;

  const drawNote = () => {
    ctxNotes.clearRect((columnWidth * randomColumn) + padding, (yPosition * speed) - 3, columnWidth, 10);
    ctxNotes.beginPath();
    ctxNotes.roundRect((columnWidth * randomColumn) + padding, yPosition * speed, columnWidth - padding * 2, blockHeight, [10]);
    ctxNotes.fillStyle = '#282828';
    ctxNotes.fill();
    ctxNotes.closePath();
    yPosition++;

    if (yPosition * speed <= canvasNotes.height) {
      if (noteAdded == false && yPosition * speed >= canvasNotes.height - 130 * speed) {
        noteAdded = true
        noteIsTouching.push(randomColumn);
      }
      else if (removeNote === randomColumn) {
        removeNote = null;
        noteIsTouching.shift();
        ctxNotes.clearRect((columnWidth * randomColumn) + padding, (yPosition * speed) - 3, columnWidth, blockHeight);
        return
      }
      requestAnimationFrame(drawNote);
    }
    else {
      noteIsTouching.shift();
    }
  }

  drawNote()
}

const addPoints = () => {
  pointCount++;
  points.innerHTML = pointCount + ' Points';
}

const handleJump = (button) => {
  noteIsTouching.map(number => {
    if (number === button) {
      addPoints();
      removeNote = number;
    }
  })
}

audio.addEventListener('ended', () => {
  endGame();
});

const endGame = () => {
  game.classList.add('hidden');
  gameInformation.classList.add('hidden');
  gameInstructions.classList.remove('hidden')

  text.innerHTML = `You scored ${pointCount} points!`
  ctxNotes.clearRect(0, 0, canvasNotes.width, canvasNotes.height)

  if (currentSong < songs.length - 1) {
    currentSong++;
  }
  else {
    currentSong = 0;
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('keyup', (e) => {
  if (e.key === "w") {
    handleJump(0);
    Background(columnWidth, columns, colours, padding, blockHeight, 0)
  }
  if (e.key === "x") {
    handleJump(1);
    Background(columnWidth, columns, colours, padding, blockHeight, 1)
  }
  if (e.key === "c") {
    handleJump(2);
    Background(columnWidth, columns, colours, padding, blockHeight, 2)
  }
  if (e.key === "v") {
    handleJump(3);
    Background(columnWidth, columns, colours, padding, blockHeight, 3)
  }
  if (e.key === "b") {
    handleJump(4);
    Background(columnWidth, columns, colours, padding, blockHeight, 4)
  }
  if (e.key === "n") {
    handleJump(5);
    Background(columnWidth, columns, colours, padding, blockHeight, 5)
  }
})