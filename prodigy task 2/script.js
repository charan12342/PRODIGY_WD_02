// Stopwatch variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

// DOM elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Function to format the time (HH:MM:SS)
function formatTime(time) {
    let totalSeconds = Math.floor(time / 1000);
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let hours = Math.floor(totalSeconds / 3600);

    // Pad with leading zeros
    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Function to update the display every second
function updateDisplay() {
    // Calculate elapsed time from the original startTime minus the offset (elapsedTime)
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Start/Pause Functionality
function startPauseStopwatch() {
    if (isRunning) {
        // PAUSE logic
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        isRunning = false;
        lapBtn.disabled = true; 
    } else {
        // START logic
        // Set startTime by subtracting the already elapsed time from the current time
        startTime = Date.now() - elapsedTime;
        // Update the display every 1000 milliseconds (1 second)
        timerInterval = setInterval(updateDisplay, 1000);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
        lapBtn.disabled = false;
    }
}

// Reset Functionality
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapList.innerHTML = '<h2>Lap Times</h2>'; // Clear lap list
    lapBtn.disabled = true;
}

// Lap Time Functionality
function recordLapTime() {
    if (isRunning) {
        lapCounter++;
        const lapTime = formatTime(elapsedTime);

        // Create new list item
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${lapTime}</span>`;
        
        // Insert the new lap time after the "Lap Times" header
        lapList.insertBefore(listItem, lapList.children[1]);
    }
}

// Event Listeners
startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLapTime);

// Initial state
lapBtn.disabled = true;