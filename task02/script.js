let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.querySelector('.time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.querySelector('.lap-list');

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    timeDisplay.textContent = formattedTime;
}

function formatTime(time) {
    // Format time as HH:MM:SS
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
    }
});

pauseButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapList.appendChild(lapItem);
    }
});