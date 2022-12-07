const canvasNotes = document.querySelector('#canvasNotes');
const canvasBackground = document.querySelector('#canvasBackground');

function Resize() {
    canvasBackground.width = window.innerWidth;
    canvasBackground.height = window.innerHeight;
    canvasNotes.width = window.innerWidth;
    canvasNotes.height = window.innerHeight;
};

export default Resize