// ===== TIMER =====
const targetDate = new Date("2026-01-02T16:00:00+01:00").getTime();

const timer = document.getElementById("timer");

function updateTimer() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    timer.textContent = "C'est sorti !!!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timer.textContent = `${days}j ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateTimer, 1000);
updateTimer();

// ===== DVD LOGO qui rebondit =====
const dvd = document.getElementById("dvd");
let x = 100, y = 100;
let dx = 3, dy = 3;
let angle = 0;

function animate() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const dvdWidth = dvd.offsetWidth;
  const dvdHeight = dvd.offsetHeight;

  x += dx;
  y += dy;

  if (x <= 0 || x + dvdWidth >= screenWidth) {
    dx *= -1;
  }
  if (y <= 0 || y + dvdHeight >= screenHeight) {
    dy *= -1;
  }

  angle += 5; // fait tourner comme un item Minecraft
  dvd.style.transform = `translate(${x}px, ${y}px) rotateY(${angle}deg)`;

  requestAnimationFrame(animate);
}

animate();