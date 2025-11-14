// script_timer.js
// TIMER
const targetDate = new Date("2026-04-01T00:00:00+02:00").getTime();
const timer = document.getElementById("timer");

function updateTimer() {
  const now = Date.now();
  const diff = targetDate - now;
  if (diff <= 0) {
    timer.textContent = "C'est sorti !!!";
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  timer.textContent = `${d}j ${h}h ${m}m ${s}s`;
}

setInterval(updateTimer, 1000);
updateTimer();