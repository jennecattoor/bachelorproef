const timerSelector = document.querySelector('.timer');

const Timer = (duration) => {
    let timer = duration, minutes, seconds;
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerSelector.innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            clearInterval(interval)
        }
    }, 1000);
}

export default Timer