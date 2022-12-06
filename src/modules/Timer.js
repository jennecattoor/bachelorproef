const timer = document.querySelector('.timer');

const Timer = (duration, display) => {
    let timer = duration, minutes, seconds;
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

export default Timer