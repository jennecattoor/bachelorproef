import Timer from './modules/Timer.js'
import Note from './modules/Note.js'
import Resize from './modules/Resize.js'
import Background from './modules/Background.js'
import Onboarding from './modules/Onboarding.js'
import Songs from './assets/songs.json' assert {type: 'json'}

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
const gameInstructions = document.querySelector('.game-instructions');

const speed = 3;
const columns = 6;
const padding = 16;
const blockHeight = 185;
const totalTime = 119;

let columnWidth;
let currentSong = 0;
let noteIsTouching = [];
let startGameCountdown = 3;
let removeNote = null;
let currentNote = 0;
let amountOfPlayers = 0;
let pointCount = 0;
let columnsPlaying = [];
let currentPlayer = 0;

const colours = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

buttonStart.addEventListener('click', () => {
  startGame()
})

/* START GAME */

const startGame = () => {
  points.innerHTML = '0 Points';

  gameInstructions.classList.add('hidden');
  game.classList.remove('hidden');

  Resize();
  Background(columnWidth, columns, colours, padding, blockHeight)

  Timer(totalTime);

  // shuffleArray(columnsPlaying);

  audio.src = Songs[currentSong].src;

  const interval = setInterval(function () {
    if ((audio.currentTime.toFixed(2)) >= (Songs[currentSong].timings[currentNote]) - 5.5) {
      currentNote++
      spawnNote()
    }
    if (currentNote >= Songs[currentSong].timings.length) {
      clearInterval(interval);
    }
  }, 50);
}

/* SPAWN NOTE */
const spawnNote = () => {
  let yPosition = -100;
  let noteAdded = false;

  let column = columnsPlaying[currentPlayer]
  currentPlayer++
  if (currentPlayer > columnsPlaying.length) {
    currentPlayer = 0
  }

  const drawNote = () => {
    Note(columnWidth, padding, blockHeight, column, yPosition)
    yPosition++;

    if (yPosition * speed <= canvasNotes.height) {
      if (noteAdded == false && yPosition * speed >= canvasNotes.height - 130 * speed) {
        noteAdded = true
        noteIsTouching.push(column);
      }
      else if (removeNote === column) {
        removeNote = null;
        noteIsTouching.shift();
        ctxNotes.clearRect((columnWidth * column) + padding, (yPosition * speed) - 3, columnWidth, blockHeight);
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

  if (currentSong < Songs.length - 1) {
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
  title.innerHTML = Songs[currentSong].name;
  text.innerHTML = "<span>" + Songs[currentSong].band + "</span>";
  setTimeout(() => { startGame() }, 5000);
}

/* EventListeners */

audio.addEventListener('ended', () => {
  endGame();
});

window.addEventListener('resize', () => {
  columnWidth = Math.round(canvasBackground.width / columns);
  Resize(columns, columnWidth)
  if (!game.classList.contains('hidden')) {
    Background(columnWidth, columns, colours, padding, blockHeight)
  }
  else {
    showOnboarding()
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === "w") {
    if (game.classList.contains('hidden')) {
      if (!columnsPlaying.includes(0)) {
        playerReady(0)
        columnsPlaying.push(0)
      }
    } else {
      handleJump(0);
      Background(columnWidth, columns, colours, padding, blockHeight, 0)
    }
  }
  if (e.key === "x") {
    if (game.classList.contains('hidden')) {
      if (!columnsPlaying.includes(1)) {
        playerReady(1)
        columnsPlaying.push(1)
      }
    } else {
      handleJump(1);
      Background(columnWidth, columns, colours, padding, blockHeight, 1)
    }
  }
  if (e.key === "c") {
    if (game.classList.contains('hidden')) {
      if (!columnsPlaying.includes(2)) {
        playerReady(2)
        columnsPlaying.push(2)
      }
    } else {
      handleJump(2);
      Background(columnWidth, columns, colours, padding, blockHeight, 2)
    }
  }
  if (e.key === "v") {
    if (game.classList.contains('hidden')) {
      if (!columnsPlaying.includes(3)) {
        playerReady(3)
        columnsPlaying.push(3)
      }
    } else {
      handleJump(3);
      Background(columnWidth, columns, colours, padding, blockHeight, 3)
    }
  }
  if (e.key === "b") {
    if (game.classList.contains('hidden')) {
      if (!columnsPlaying.includes(2)) {
        playerReady(4)
        columnsPlaying.push(4)
        console.log('added')
      }
    } else {
      handleJump(4);
      Background(columnWidth, columns, colours, padding, blockHeight, 4)
    }
  }
  if (e.key === "n") {
    if (game.classList.contains('hidden')) {
      if (!columnsPlaying.includes(5)) {
        playerReady(5)
        columnsPlaying.push(5)
      }
    } else {
      handleJump(5);
      Background(columnWidth, columns, colours, padding, blockHeight, 5)
    }
  }
})