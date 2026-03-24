const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const addEntryBtn = document.getElementById('addEntryBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importInput = document.getElementById('importInput');
const entriesList = document.getElementById('entriesList');
const resultDisplay = document.getElementById('resultDisplay');
const winnerText = document.querySelector('.winner-text');

let entries = JSON.parse(localStorage.getItem('roulette_entries')) || [
    { name: "Anime 1", weight: 20, color: "#ff4d4d", id: Date.now() },
    { name: "Anime 2", weight: 20, color: "#4d94ff", id: Date.now() + 1 }
];

let isSpinning = false;
let currentRotation = 0;
let heldKeys = new Set();

window.onkeydown = (e) => { 
    heldKeys.add(e.key.toLowerCase());
};
window.onkeyup = (e) => { 
    heldKeys.delete(e.key.toLowerCase());
};

function saveToStorage() {
    localStorage.setItem('roulette_entries', JSON.stringify(entries));
}

function drawWheel() {
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const totalWeight = entries.reduce((acc, entry) => acc + parseFloat(entry.weight || 0), 0);
    let startAngle = currentRotation;
    entries.forEach((entry) => {
        const weight = parseFloat(entry.weight || 0);
        if (weight <= 0) return;
        const sliceAngle = (weight / totalWeight) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.fillStyle = entry.color;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.font = "bold 18px Arial";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 4;
        ctx.strokeText(entry.name, radius - 20, 10);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(entry.name, radius - 20, 10);
        ctx.restore();
        startAngle += sliceAngle;
    });
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#1a1a1a";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
}

function spin() {
    if (isSpinning || entries.length === 0) return;
    isSpinning = true;
    resultDisplay.classList.add('hidden');
    const totalSpinTime = 5000;
    const baseSpins = 10 * 2 * Math.PI;
    let targetRotation;
    let rigIndex = -1;
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for(let i=0; i<alphabet.length; i++) {
        if(heldKeys.has(alphabet[i])) {
            rigIndex = i;
            break;
        }
    }
    if (rigIndex >= 0 && rigIndex < entries.length) {
        const totalWeight = entries.reduce((acc, entry) => acc + parseFloat(entry.weight || 0), 0);
        let angleBefore = 0;
        for (let i = 0; i < rigIndex; i++) {
            angleBefore += (parseFloat(entries[i].weight) / totalWeight) * 2 * Math.PI;
        }
        const sliceAngle = (parseFloat(entries[rigIndex].weight) / totalWeight) * 2 * Math.PI;
        const randomWithinSlice = angleBefore + (Math.random() * (sliceAngle * 0.8) + (sliceAngle * 0.1));
        const pointer = 1.5 * Math.PI;
        let neededRotation = (pointer - randomWithinSlice) % (2 * Math.PI);
        if (neededRotation < 0) neededRotation += 2 * Math.PI;
        targetRotation = Math.ceil(currentRotation / (2 * Math.PI)) * (2 * Math.PI) + baseSpins + neededRotation;
    } else {
        targetRotation = currentRotation + (10 + Math.random() * 5) * 2 * Math.PI;
    }
    const initialRotation = currentRotation;
    const startTime = performance.now();
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / totalSpinTime, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        currentRotation = initialRotation + (targetRotation - initialRotation) * ease;
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            showWinner();
        }
    }
    requestAnimationFrame(animate);
}

function showWinner() {
    const totalWeight = entries.reduce((acc, entry) => acc + parseFloat(entry.weight || 0), 0);
    const pointerAngle = 1.5 * Math.PI; 
    let winner = null;
    let tempStart = currentRotation;
    entries.forEach((entry) => {
        const sliceAngle = (parseFloat(entry.weight) / totalWeight) * 2 * Math.PI;
        const start = (tempStart % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const end = ( (tempStart + sliceAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        if (start < end) {
            if (pointerAngle >= start && pointerAngle <= end) winner = entry;
        } else {
            if (pointerAngle >= start || pointerAngle <= end) winner = entry;
        }
        tempStart += sliceAngle;
    });
    if (winner) {
        winnerText.textContent = winner.name;
        winnerText.style.color = winner.color;
        resultDisplay.classList.remove('hidden');
    }
}

function renderEntries() {
    entriesList.innerHTML = "";
    const totalWeight = entries.reduce((acc, entry) => acc + parseFloat(entry.weight || 0), 0);
    entries.forEach((entry, index) => {
        const proba = totalWeight > 0 ? ((entry.weight / totalWeight) * 100).toFixed(1) : 0;
        const div = document.createElement('div');
        div.className = "entry-item";
        div.innerHTML = `
            <div class="move-btns">
                <button onclick="moveEntry(${index}, -1)">^</button>
                <button onclick="moveEntry(${index}, 1)">v</button>
            </div>
            <input type="color" value="${entry.color}" onchange="updateEntry(${entry.id}, 'color', this.value)">
            <input type="text" value="${entry.name}" placeholder="Nom" onchange="updateEntry(${entry.id}, 'name', this.value)">
            <div class="weight-box">
                <input type="number" value="${entry.weight}" placeholder="Poids" onchange="updateEntry(${entry.id}, 'weight', this.value)">
                <span>${proba}%</span>
            </div>
            <button class="remove-btn" onclick="removeEntry(${entry.id})">X</button>
        `;
        entriesList.appendChild(div);
    });
    drawWheel();
}

window.moveEntry = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= entries.length) return;
    const item = entries.splice(index, 1)[0];
    entries.splice(newIndex, 0, item);
    renderEntries();
    saveToStorage();
};

window.updateEntry = (id, field, value) => {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;
    if (field === 'weight') value = parseFloat(value) || 1;
    entry[field] = value;
    if (field === 'weight') {
        const totalWeight = entries.reduce((acc, e) => acc + parseFloat(e.weight || 0), 0);
        const spans = entriesList.querySelectorAll('.weight-box span');
        entries.forEach((e, idx) => {
            const proba = totalWeight > 0 ? ((e.weight / totalWeight) * 100).toFixed(1) : 0;
            if (spans[idx]) spans[idx].innerText = `${proba}%`;
        });
    }
    drawWheel();
    saveToStorage();
};

window.removeEntry = (id) => {
    entries = entries.filter(e => e.id !== id);
    renderEntries();
    saveToStorage();
};

addEntryBtn.onclick = () => {
    const colors = ["#ff4d4d", "#4d94ff", "#47ff72", "#fffa4d", "#ff4df0", "#4dfff5"];
    entries.push({
        name: `Anime ${entries.length + 1}`,
        weight: 10,
        color: colors[entries.length % colors.length],
        id: Date.now() + Math.random()
    });
    renderEntries();
    saveToStorage();
};

exportBtn.onclick = () => {
    const totalWeight = entries.reduce((acc, entry) => acc + parseFloat(entry.weight || 0), 0);
    let content = "CONFIG DE ROULETTE\n====================\n\n";
    entries.forEach((entry, i) => {
        const proba = ((entry.weight / totalWeight) * 100).toFixed(2);
        content += `Position: ${i + 1}\nNom: ${entry.name}\nCouleur: ${entry.color}\nProbabilite: ${proba}%\nPoids: ${entry.weight}\n--------------------\n`;
    });
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `config_roulette.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

importBtn.onclick = () => importInput.click();
importInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const text = ev.target.result;
        const blocks = text.split("--------------------");
        const newEntries = [];
        blocks.forEach(block => {
            const lines = block.split("\n");
            let name = "", color = "", weight = 10;
            lines.forEach(line => {
                if(line.startsWith("Nom: ")) name = line.replace("Nom: ", "").trim();
                if(line.startsWith("Couleur: ")) color = line.replace("Couleur: ", "").trim();
                if(line.startsWith("Poids: ")) weight = parseFloat(line.replace("Poids: ", "").trim()) || 10;
            });
            if(name && color) newEntries.push({ name, color, weight, id: Date.now() + Math.random() });
        });
        if (newEntries.length > 0) {
            entries = newEntries;
            renderEntries();
            saveToStorage();
        }
    };
    reader.readAsText(file);
    importInput.value = "";
};

spinBtn.onclick = spin;
renderEntries();
