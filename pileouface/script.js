const coin = document.getElementById('coin');
const flipBtn = document.getElementById('flipBtn');
const resultDisplay = document.getElementById('resultDisplay');
const winnerText = document.querySelector('.winner-text');

let isSpinning = false;
let currentRotation = 0;
let heldKeys = new Set();

window.addEventListener('keydown', (e) => { 
    heldKeys.add(e.key.toLowerCase());
});

window.addEventListener('keyup', (e) => { 
    heldKeys.delete(e.key.toLowerCase());
});

function flip() {
    if (isSpinning) return;
    isSpinning = true;
    resultDisplay.classList.add('hidden');

    const coinContainer = document.querySelector('.coin-container');
    coinContainer.classList.remove('tossing');
    void coinContainer.offsetWidth; // Trigger reflow
    coinContainer.classList.add('tossing');
    
    // Choose outcome
    let outcome = Math.random() < 0.5 ? 'pile' : 'face';
    
    // Rigging check
    if (heldKeys.has('p')) {
        outcome = 'pile';
    } else if (heldKeys.has('f')) {
        outcome = 'face';
    }
    
    // Rotation logic
    const extraSpins = 5 + Math.floor(Math.random() * 5); 
    let targetRotation = extraSpins * 360;
    
    if (outcome === 'pile') {
        targetRotation += 180;
    } else {
        targetRotation += 0;
    }
    
    const baseRotation = Math.ceil(currentRotation / 360) * 360;
    const finalRotation = baseRotation + targetRotation;
    
    coin.style.transform = `rotateX(${finalRotation}deg)`;
    currentRotation = finalRotation;
    
    setTimeout(() => {
        isSpinning = false;
        coinContainer.classList.remove('tossing');
        showResult(outcome);
    }, 3000); 
}

function showResult(outcome) {
    winnerText.textContent = outcome;
    winnerText.style.color = outcome === 'face' ? '#fff' : '#fbc02d'; // Golden for Pile, White for Face
    resultDisplay.classList.remove('hidden');
}

flipBtn.onclick = flip;
