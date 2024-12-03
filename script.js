// Variables to track time
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// DOM elements
const timeDisplay = document.getElementById("time-display");
const lapsContainer = document.getElementById("laps");

// Utility function to format time
function formatTime(ms) {
  const milliseconds = Math.floor((ms % 1000) / 10); // Keep two decimal places
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 60000) % 60);
  const hours = Math.floor(ms / 3600000);

  return (
    (hours > 0 ? String(hours).padStart(2, "0") + ":" : "") +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    "." +
    String(milliseconds).padStart(2, "0")
  );
}

// Function to start the stopwatch
function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
  }
}

// Function to stop the stopwatch
function stopStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Function to reset the stopwatch
function resetStopwatch() {
  stopStopwatch();
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapsContainer.innerHTML = "";
  localStorage.removeItem("laps"); // Clear laps from localStorage
}

// Function to record lap time
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapsContainer.childElementCount + 1}: ${lapTime}`;
  lapsContainer.appendChild(lapItem);

  // Save lap to localStorage
  saveLapToStorage(lapTime);
}

// Save laps to localStorage
function saveLapToStorage(lapTime) {
  const laps = JSON.parse(localStorage.getItem("laps")) || [];
  laps.push(lapTime);
  localStorage.setItem("laps", JSON.stringify(laps));
}

// Load laps from localStorage
function loadLapsFromStorage() {
  const laps = JSON.parse(localStorage.getItem("laps")) || [];
  laps.forEach((lapTime, index) => {
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${index + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
  });
}

// Event listeners for buttons
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("stop").addEventListener("click", stopStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", recordLap);

// Load laps on page load
window.addEventListener("load", () => {
  loadLapsFromStorage();
});
