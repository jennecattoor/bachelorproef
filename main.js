import './reset.css';
import './style.css';

document.querySelector('#app').innerHTML = `
  <h2 class="timer hidden">02:00</h2>
  <h2 class="points hidden">0 Points</h2>
  <div class="game-instructions">
    <h1 class="text">Press the correct key to play game!</h1>
    <button class="button-start">Start game</button>
  </div>
  <canvas class="canvas hidden" id="canvasNotes"></canvas>
  <canvas class="canvas hidden" id="canvasBackground"></canvas>
  <audio autoplay src="" class="audio" type="audio/mp3"></audio>
`
const canvasBackground = document.querySelector('#canvasBackground');
const ctxBackground = canvasBackground.getContext('2d');
const canvasNotes = document.querySelector('#canvasNotes');
const ctxNotes = canvasNotes.getContext('2d')

const text = document.querySelector('.text');
const audio = document.querySelector('.audio');
const timer = document.querySelector('.timer');
const points = document.querySelector('.points');
const buttonStart = document.querySelector('.button-start');
const gameInstructions = document.querySelector('.game-instructions');


const speed = 3;
const columns = 6;
const totalTime = 120;
const amountOfNotes = 100;

let columnWidth;
let currentSong = 10;
let noteCount = 0;
let pointCount = 0;
let noteIsTouching = [];
let removeNote = null;

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
  { name: `I Want You Back`, band: `The Jackson 5`, src: `./songs/iwantyouback.mp3`, bpm: 98 },
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
  gameBackground();
};

buttonStart.addEventListener('click', () => {
  gameInstructions.classList.add('hidden');
  canvasBackground.classList.remove('hidden');
  canvasNotes.classList.remove('hidden');
  noteCount = 0;
  pointCount = 0;
  startGame();
})

const gameBackground = (number) => {
  ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
  ctxBackground.beginPath();
  for (let i = 1; i < columns; i++) {
    ctxBackground.beginPath();
    ctxBackground.moveTo(columnWidth * i, 0);
    ctxBackground.lineTo(columnWidth * i, canvasBackground.height);
    ctxBackground.closePath();
    ctxBackground.lineWidth = 2;
    ctxBackground.stroke();
  }

  for (let i = 0; i < columns; i++) {
    ctxBackground.fillStyle = colours[i];
    ctxBackground.shadowColor = '#282828';
    ctxBackground.shadowBlur = 8;
    ctxBackground.beginPath();
    if (number === i) {
      ctxBackground.roundRect((columnWidth * i) + 15, canvasBackground.height - 215, columnWidth - 30, 185, [10]);
      // if (removeNote !== null) {
      //   ctxBackground.font = "50px Arial";
      //   ctxBackground.fillText("+1 Point", (columnWidth * i), canvasBackground.height - 215);
      // }
      setTimeout(() => { gameBackground() }, 125);
    }
    else {
      ctxBackground.roundRect((columnWidth * i) + 15, canvasBackground.height - 200, columnWidth - 30, 185, [10]);
    }
    ctxBackground.closePath();
    ctxBackground.fill();
    ctxBackground.shadowBlur = 0;
  }
}

const startTimer = (duration, display) => {
  var timer = duration, minutes, seconds;
  const test = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      clearInterval(test)
    }
  }, 1000);
}

const startGame = () => {
  timer.classList.remove('hidden');
  points.classList.remove('hidden');
  startTimer(totalTime, timer);

  audio.src = songs[currentSong].src;
  const noteFrequency = Math.round((totalTime / (amountOfNotes + 8)) * 1000);

  const countNotes = setInterval(function () {
    if (noteCount < amountOfNotes) {
      noteCount++;
      spawnNote()
    }
    else {
      clearInterval(countNotes);
      setTimeout(() => { endGame() }, 8000)
    }
  }, noteFrequency);
}

const spawnNote = () => {
  let yPosition = -100;
  const randomColumn = Math.floor(Math.random() * columns);

  const drawNote = () => {
    ctxNotes.clearRect((columnWidth * randomColumn) + 15, (yPosition * speed) - 3, columnWidth, 10);
    ctxNotes.beginPath();
    ctxNotes.roundRect((columnWidth * randomColumn) + 15, yPosition * speed, columnWidth - 30, 185, [10]);
    ctxNotes.fillStyle = '#282828';
    ctxNotes.fill();
    ctxNotes.closePath();
    yPosition++;

    if (yPosition * speed <= canvasNotes.height) {
      if (yPosition * speed === canvasNotes.height - 360) {
        noteIsTouching.push(randomColumn);
      }
      else if (removeNote === randomColumn) {
        removeNote = null;
        noteIsTouching.shift();
        ctxNotes.clearRect((columnWidth * randomColumn) + 15, (yPosition * speed) - 3, columnWidth, 200);
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

window.addEventListener('keyup', (e) => {
  if (e.key === "w") {
    handleJump(0);
    gameBackground(0);
  }
  if (e.key === "x") {
    handleJump(1);
    gameBackground(1);
  }
  if (e.key === "c") {
    handleJump(2);
    gameBackground(2);
  }
  if (e.key === "v") {
    handleJump(3);
    gameBackground(3);
  }
  if (e.key === "b") {
    handleJump(4);
    gameBackground(4);
  }
  if (e.key === "n") {
    handleJump(5);
    gameBackground(5);
  }
})

const endGame = () => {
  gameInstructions.classList.remove('hidden')
  canvasBackground.classList.add('hidden')
  canvasNotes.classList.add('hidden')
  ctxNotes.clearRect(0, 0, canvasNotes.width, canvasNotes.height)
  timer.classList.add('hidden');
  text.innerHTML = `You scored ${pointCount} points!`

  if (currentSong <= songs.length) {
    currentSong++;
  }
  else {
    currentSong = 0;
  }
}

handleResize();
window.addEventListener('resize', handleResize);