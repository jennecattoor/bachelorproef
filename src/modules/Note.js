const ctxNotes = canvasNotes.getContext('2d')

const speed = 3;
let previousColumn = null;

const Note = (columns, columnWidth, padding, blockHeight,) => {
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

export default Note