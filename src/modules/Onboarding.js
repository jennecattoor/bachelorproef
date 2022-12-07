const canvasBackground = document.querySelector('#canvasBackground');
const ctxBackground = canvasBackground.getContext('2d');

function Background(columnWidth, padding, blockHeight, i, fillStyle, text) {
    ctxBackground.fillStyle = fillStyle;
    ctxBackground.beginPath();
    ctxBackground.roundRect((columnWidth * i) + padding, canvasBackground.height - 200, columnWidth - padding * 2, blockHeight, [10]);
    ctxBackground.closePath();
    ctxBackground.fill();
    ctxBackground.fillStyle = 'white';
    ctxBackground.textAlign = "center";
    ctxBackground.font = "1.6rem Arial Black";
    ctxBackground.fillText(text, (columnWidth * i + (columnWidth / 2)), canvasBackground.height - 100);
}

export default Background