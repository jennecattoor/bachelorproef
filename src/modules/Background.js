const canvasBackground = document.querySelector('#canvasBackground');
const ctxBackground = canvasBackground.getContext('2d');

function Background(columnWidth, columns, colours, padding, blockHeight, jump) {
    ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
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
        if (jump === i) {
            ctxBackground.roundRect((columnWidth * i) + padding, canvasBackground.height - 215, columnWidth - padding * 2, blockHeight, [10]);
            // if (removeNote !== null) {
            //     ctxBackground.font = "50px Arial";
            //     ctxBackground.fillText("+1 Point", (columnWidth * i), canvasBackground.height - 215);
            // }
            setTimeout(() => { Background(columnWidth, columns, colours, padding, blockHeight) }, 125);
        }
        else {
            ctxBackground.roundRect((columnWidth * i) + padding, canvasBackground.height - 200, columnWidth - padding * 2, blockHeight, [10]);
        }
        ctxBackground.closePath();
        ctxBackground.fill();
        ctxBackground.shadowBlur = 0;
    }
}

export default Background