const ctxNotes = canvasNotes.getContext('2d')

let speed = 3

function Note(columnWidth, padding, blockHeight, randomColumn, yPosition) {
    ctxNotes.clearRect((columnWidth * randomColumn) + padding, (yPosition * speed) - 3, columnWidth, 10);
    ctxNotes.beginPath();
    ctxNotes.roundRect((columnWidth * randomColumn) + padding, yPosition * speed, columnWidth - padding * 2, blockHeight, [10]);
    ctxNotes.fillStyle = '#282828';
    ctxNotes.fill();
    ctxNotes.closePath();
}

export default Note