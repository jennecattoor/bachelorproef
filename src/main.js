import Timer from './modules/Timer.js'
import Note from './modules/Note.js'
import Resize from './modules/Resize.js'
import Background from './modules/Background.js'
import Onboarding from './modules/Onboarding.js'
import notesTiming from './assets/timing.json' assert {type: 'json'}

const canvasNotes = document.querySelector('#canvasNotes');
const ctxNotes = canvasNotes.getContext('2d');
const canvasBackground = document.querySelector('#canvasBackground');
const ctxBackground = canvasBackground.getContext('2d');

const title = document.querySelector('.title');
const text = document.querySelector('.text');
const game = document.querySelector('.game');
const audio = document.querySelector('.audio');
const points = document.querySelector('.points');
const buttonStart = document.querySelector('.button-start');
const gameInformation = document.querySelector('.game-information');
const gameInstructions = document.querySelector('.game-instructions');

const speed = 3;
const columns = 6;
const padding = 16;
const blockHeight = 185;
const totalTime = 119;

let columnWidth;
let currentSong = 9;
let gameActive = false;
let noteIsTouching = [];
let startGameCountdown = 3;
let removeNote = null;
let previousColumn = null;
let currentNote = 0;
let amountOfPlayers = 0;
let pointCount = 0;

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

// buttonStart.addEventListener('click', () => {
//   startGame()
// })

/* START GAME */

const startGame = () => {
  gameActive = true;
  points.innerHTML = '0 Points';

  Resize();
  columnWidth = Math.round(canvasBackground.width / columns);
  Background(columnWidth, columns, colours, padding, blockHeight)

  gameInstructions.classList.add('hidden');
  game.classList.remove('hidden');

  Timer(totalTime);

  audio.src = songs[currentSong].src;

  setInterval(function () {
    if ((audio.currentTime.toFixed(2)) >= (notesTiming[currentNote]) - 5.5) {
      currentNote++
      spawnNote()
    }
  }, 50);
}

/* SPAWN NOTE */

const spawnNote = () => {
  let yPosition = -100;
  let noteAdded = false;
  let randomColumn = Math.floor(Math.random() * columns);
  while (randomColumn === previousColumn) {
    randomColumn = Math.floor(Math.random() * columns);
  }

  previousColumn = randomColumn;

  const drawNote = () => {
    Note(columnWidth, padding, blockHeight, randomColumn, yPosition)
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

/* HANDLE JUMP */

const handleJump = (button) => {
  noteIsTouching.map(number => {
    if (number === button) {
      removeNote = number;
      pointCount++;
      points.innerHTML = pointCount + ' Points';
    }
  })
}

/* END GAME */

const endGame = () => {
  game.classList.add('hidden');
  gameInstructions.classList.remove('hidden')
  canvasBackground.classList.add('hidden');

  title.innerHTML = `Great job!`
  text.innerHTML = `Your team scored <span>${pointCount} points!<span>`
  ctxNotes.clearRect(0, 0, canvasNotes.width, canvasNotes.height)

  ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);

  gameActive = false;
  if (currentSong < songs.length - 1) {
    currentSong++;
  }
  else {
    currentSong = 0;
  }

  setTimeout(() => { resetGame() }, 6000);
}

const resetGame = () => {
  canvasBackground.classList.remove('hidden');
  noteIsTouching = [];
  startGameCountdown = 20;
  previousColumn = null
  removeNote = null;
  pointCount = 0
  currentNote = 0
  amountOfPlayers = 0
  title.innerHTML = `Let's have fun!`
  text.innerHTML = `<span>Take place</span> on one of the coloured squares. A minimum of <span>2 players</span> are required.`
  showOnboarding()
}

/* ONBOARDING */
Resize()
columnWidth = Math.round(canvasBackground.width / columns);
const showOnboarding = () => {
  for (let i = 0; i < columns; i++) {
    Onboarding(columnWidth, padding, blockHeight, i, '#D1DAC9', 'TAKE PLACE')
  }
}
showOnboarding()

const playerReady = (playerColumn) => {
  Onboarding(columnWidth, padding, blockHeight, playerColumn, '#697D43', 'READY')

  amountOfPlayers++;
  if (amountOfPlayers === 2) { gameCountdown(); }
}

const gameCountdown = () => {
  let timerInterval = setInterval(function () {
    title.innerHTML = "Get Ready!";
    text.innerHTML = "We are starting in <span>" + startGameCountdown + " seconds</span>. Feel free to <span>join</span> by taking place on a free square."
    startGameCountdown -= 1;
    if (startGameCountdown < 0) {
      gameExplenation();
      clearInterval(timerInterval);
    }
  }, 1000);
}

const gameExplenation = () => {
  title.innerHTML = "How it works";
  text.innerHTML = "<span>Jump</span> when a note reaches your colour. Gain <span>points</span> with your team"
  setTimeout(() => { shuffleSong() }, 5000);
}

const shuffleSong = () => {
  title.innerHTML = songs[currentSong].name;
  text.innerHTML = "<span>" + songs[currentSong].band + "</span>";
  setTimeout(() => { startGame() }, 5000);
}

/* EventListeners */

audio.addEventListener('ended', () => {
  endGame();
});

window.addEventListener('resize', () => {
  columnWidth = Math.round(canvasBackground.width / columns);
  Resize(columns, columnWidth)
  if (gameActive === true) {
    Background(columnWidth, columns, colours, padding, blockHeight)
  }
  else {
    showOnboarding()
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === "w") {
    if (gameActive === false) {
      playerReady(0)
    } else {
      handleJump(0);
      Background(columnWidth, columns, colours, padding, blockHeight, 0)
    }
  }
  if (e.key === "x") {
    if (gameActive === false) {
      playerReady(1)
    } else {
      handleJump(1);
      Background(columnWidth, columns, colours, padding, blockHeight, 1)
    }
  }
  if (e.key === "c") {
    if (gameActive === false) {
      playerReady(2)
    } else {
      handleJump(2);
      Background(columnWidth, columns, colours, padding, blockHeight, 2)
    }
  }
  if (e.key === "v") {
    if (gameActive === false) {
      playerReady(3)
    } else {
      handleJump(3);
      Background(columnWidth, columns, colours, padding, blockHeight, 3)
    }
  }
  if (e.key === "b") {
    if (gameActive === false) {
      playerReady(4)
    } else {
      handleJump(4);
      Background(columnWidth, columns, colours, padding, blockHeight, 4)
    }
  }
  if (e.key === "n") {
    if (gameActive === false) {
      playerReady(5)
    } else {
      handleJump(5);
      Background(columnWidth, columns, colours, padding, blockHeight, 5)
    }
  }
})