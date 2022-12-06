const canvasNotes = document.querySelector('#canvasNotes');
const canvasBackground = document.querySelector('#canvasBackground');

function Resize(columns, columnWidth) {
    canvasBackground.width = window.innerWidth;
    canvasBackground.height = window.innerHeight;
    canvasNotes.width = window.innerWidth;
    canvasNotes.height = window.innerHeight;
    columnWidth = Math.round(canvasBackground.width / columns);
};

export default Resize