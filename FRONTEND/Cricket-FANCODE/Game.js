// Local tracking states
let playerName = "";
let playerScore = 0;
let computerScore = 0;
let activeStumpAsset = "🪘"; 

// Active DOM components reference mappings
const setupArea = document.getElementById("setup-area");
const setupButtons = document.getElementById("setup-buttons");
const gameArea = document.getElementById("game-area");
const playerNameInput = document.getElementById("player-name-input");
const startGameBtn = document.getElementById("start-game-btn");
const homeResetBtn = document.getElementById("home-reset-btn");
const displayPlayerName = document.getElementById("display-player-name");
const playerLiveScore = document.getElementById("player-score");
const computerLiveScore = document.getElementById("computer-score");
const roundResultDiv = document.getElementById("round-result");
const welcomeMessage = document.getElementById("welcome-message");
const resetGameBtn = document.getElementById("reset-game-btn");

// Control layer popups objects mapping
const modal = document.getElementById("game-modal");
const modalBody = document.getElementById("modal-body-content");
const closeModalBtn = document.querySelector(".close-modal");

// Window Initialization checks
window.onload = function() {
    const savedName = localStorage.getItem("cricket_playerName");
    if (savedName) {
        playerName = savedName;
        playerScore = parseInt(localStorage.getItem("cricket_playerScore")) || 0;
        computerScore = parseInt(localStorage.getItem("cricket_computerScore")) || 0;
        initGameView();
    }
    
    // Process profile customized layout items if existing
    const savedBg = localStorage.getItem("cricket_custom_bg");
    if (savedBg) document.body.style.backgroundImage = `url('${savedBg}')`;
    
    const savedStump = localStorage.getItem("cricket_custom_stump");
    if (savedStump) {
        activeStumpAsset = savedStump;
        document.getElementById("stump-rendering-target").textContent = activeStumpAsset;
    }
};

// Wire up start controls
startGameBtn.addEventListener("click", initializeSessionSetup);
homeResetBtn.addEventListener("click", clearSearchSessionInput);
playerNameInput.addEventListener("keypress", (e) => { if (e.key === 'Enter') initializeSessionSetup(); });

function initializeSessionSetup() {
    const enteredName = playerNameInput.value.trim();
    if (enteredName === "") {
        alert("Please enter a valid profile handle entry to play!");
        return;
    }
    
    playerName = enteredName;
    playerScore = 0;
    computerScore = 0;
    
    localStorage.setItem("cricket_playerName", playerName);
    commitSessionScores();
    initGameView();
}

function clearSearchSessionInput() {
    playerNameInput.value = "";
}

function initGameView() {
    setupArea.style.display = "none";
    setupButtons.style.display = "none";
    gameArea.style.display = "block";
    displayPlayerName.textContent = playerName;
    welcomeMessage.textContent = `Welcome to the crease, ${playerName}!`;
    updateScoreBoardDisplay();
}

// Active Play Logic Engine Matrix
function playRound(playerChoice) {
    const choices = ['bat', 'ball', 'stump'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let resultMessage = "";
    
    if (playerChoice === computerChoice) {
        resultMessage = `It's a tie! Both chose ${playerChoice.toUpperCase()}. 🤝`;
    } else if (
        (playerChoice === 'bat' && computerChoice === 'ball') ||
        (playerChoice === 'ball' && computerChoice === 'stump') ||
        (playerChoice === 'stump' && computerChoice === 'bat')
    ) {
        playerScore++;
        resultMessage = `You won this delivery! Your ${playerChoice.toUpperCase()} beats Computer's ${computerChoice.toUpperCase()}. 🔥`;
        commitSessionScores();
        syncLeaderboardScores(playerName, playerScore);
    } else {
        computerScore++;
        resultMessage = `Computer wins this delivery! ${computerChoice.toUpperCase()} beats your ${playerChoice.toUpperCase()}. 😮`;
        commitSessionScores();
    }
    
    roundResultDiv.innerHTML = `You chose <strong>${playerChoice.toUpperCase()}</strong> | Computer chose <strong>${computerChoice.toUpperCase()}</strong> <br><br> ${resultMessage}`;
    updateScoreBoardDisplay();
}

function commitSessionScores() {
    localStorage.setItem("cricket_playerScore", playerScore);
    localStorage.setItem("cricket_computerScore", computerScore);
}

function updateScoreBoardDisplay() {
    playerLiveScore.textContent = playerScore;
    computerLiveScore.textContent = computerScore;
}

// Gameplay Clear Loop Controls
resetGameBtn.addEventListener("click", function() {
    localStorage.removeItem("cricket_playerName");
    localStorage.removeItem("cricket_playerScore");
    localStorage.removeItem("cricket_computerScore");
    playerScore = 0;
    computerScore = 0;
    playerNameInput.value = "";
    roundResultDiv.textContent = "";
    gameArea.style.display = "none";
    setupArea.style.display = "flex";
    setupButtons.style.display = "block";
});

// --- Modal Action Pipeline Controller logic ---
function renderModalContainer(innerMarkup) {
    modalBody.innerHTML = innerMarkup;
    modal.style.display = "block";
}

closeModalBtn.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Button Link Action 1: About Modals
document.getElementById("about-link").addEventListener("click", (e) => {
    e.preventDefault();
    renderModalContainer(`
        <h2>About Cricket FanCode</h2>
        <p>Welcome to Hand Cricket Simulator Edition! This game transforms playground hand-cricket into a strategic digital experience.</p>
        <p><strong>Game Rules Breakdown Matrix:</strong></p>
        <ul>
            <li><strong>🏏 Bat beats ⚾ Ball:</strong> The batsman punches through the gap to hit runs.</li>
            <li><strong>⚾ Ball beats 🪵 Stump:</strong> The bowler tracks inside lines to break the target.</li>
            <li><strong>🪵 Stump beats 🏏 Bat:</strong> The defense stands ground to stump out aggressive batters.</li>
        </ul>
    `);
});

// Button Link Action 2: Sharing Link Engine
document.getElementById("share-link").addEventListener("click", (e) => {
    e.preventDefault();
    if (navigator.share) {
        navigator.share({
            title: 'Cricket FanCode Engine',
            text: 'Come check out my cricket scorecard scores on this tactical simulator field!',
            url: window.location.href
        }).catch(console.error);
    } else {
        renderModalContainer(`
            <h2>Share Match Pitch</h2>
            <p>Copy this match field reference link below to challenge friends:</p>
            <input type="text" value="${window.location.href}" readonly style="width:90%; padding:8px; font-size:14px; border-radius:4px; border:1px solid #ccc;">
        `);
    }
});

// Button Link Action 3: Leaderboards Array Processor Matrix
function syncLeaderboardScores(profileId, points) {
    let currentRegistry = JSON.parse(localStorage.getItem("fancode_ranks")) || {};
    if (!currentRegistry[profileId] || currentRegistry[profileId] < points) {
        currentRegistry[profileId] = points;
        localStorage.setItem("fancode_ranks", JSON.stringify(currentRegistry));
    }
}

document.getElementById("leaderboard-link").addEventListener("click", (e) => {
    e.preventDefault();
    let registry = JSON.parse(localStorage.getItem("fancode_ranks")) || {};
    let sortedData = Object.entries(registry).sort((x, y) => y[1] - x[1]);
    
    let tableLayoutContent = sortedData.map(([profile, peakScore], order) => `
        <tr>
            <td>${order + 1}</td>
            <td>${profile} ${profile === playerName ? '<strong>(You)</strong>' : ''}</td>
            <td><strong>${peakScore} Runs</strong></td>
        </tr>
    `).join("");

    renderModalContainer(`
        <h2>Leaderboard Ranking Matrix</h2>
        <table class="leaderboard-table">
            <thead>
                <tr><th>Rank Position</th><th>Player Profile</th><th>Top Record Run Counts</th></tr>
            </thead>
            <tbody>
                ${tableLayoutContent || '<tr><td colspan="3" style="text-align:center;">No match matches registered on this browser yet. Get out there and score!</td></tr>'}
            </tbody>
        </table>
    `);
});

// Button Link Action 4: How Game Works
document.getElementById("how-it-works-link").addEventListener("click", (e) => {
    e.preventDefault();
    renderModalContainer(`
        <h2>How Game Works</h2>
        <p>1. Type your profile handle into the search field dashboard and select <strong>Start</strong>.</p>
        <p>2. The application hides the search input box and renders your active interactive stadium pitch score tracker boards automatically.</p>
        <p>3. Tap any of the big interactive graphic layout action cards (BAT, BALL, STUMP) to execute your tactical selection dynamically against automated random computational defensive strategies.</p>
    `);
});

// Button Link Action 5: Dynamic Settings Configurations Controller
document.getElementById("settings-link").addEventListener("click", (e) => {
    e.preventDefault();
    renderModalContainer(`
        <h2>System Pitch Preferences Panel</h2>
        <hr>
        <div class="settings-row">
            <label><strong>Field Atmosphere Wallpaper:</strong></label>
            <select id="bg-selector" onchange="applyLiveThemeAsset(this.value)">
                <option value="download5.jpg">Dharamshala Field Green Tint Tint</option>
                <option value="download2.jpg">Clean White Core Stadium View</option>
                <option value="download3.jpg">FanCode Logo Overlay Field</option>
            </select>
        </div>
        <div class="settings-row">
            <label><strong>Custom Defensive Wicket Asset:</strong></label>
            <select id="stump-selector" onchange="applyLiveStumpIconAsset(this.value)">
                <option value="🪘" ${activeStumpAsset === '🪘' ? 'selected' : ''}>African Djembe Block (🪘)</option>
                <option value="🪵" ${activeStumpAsset === '🪵' ? 'selected' : ''}>Classic Wooden Log Timber (🪵)</option>
                <option value="🚧" ${activeStumpAsset === '🚧' ? 'selected' : ''}>High Vis Electric Safety Wickets (🚧)</option>
            </select>
        </div>
    `);
    document.getElementById("bg-selector").value = localStorage.getItem("cricket_custom_bg") || "download5.jpg";
});

// Auxiliary preferences tracking hooks called inside dynamic context injections 
window.applyLiveThemeAsset = function(assetPath) {
    document.body.style.backgroundImage = `url('${assetPath}')`;
    localStorage.setItem("cricket_custom_bg", assetPath);
};

window.applyLiveStumpIconAsset = function(iconChar) {
    activeStumpAsset = iconChar;
    document.getElementById("stump-rendering-target").textContent = iconChar;
    localStorage.setItem("cricket_custom_stump", iconChar);
};

// Button Link Action 6 & 7: Footers Placeholders Handlers
document.getElementById("advertising-link").addEventListener("click", (e) => { e.preventDefault(); renderModalContainer("<h2>Advertising System</h2><p>FanCode Ad placement slots dashboard configurations details would reside within this container frame.</p>"); });
document.getElementById("privacy-link").addEventListener("click", (e) => { e.preventDefault(); renderModalContainer("<h2>Privacy Terms Policy</h2><p>Data handling protocols, user session profile state allocations rules documentation guidelines information.</p>"); });
document.getElementById("terms-link").addEventListener("click", (e) => { e.preventDefault(); renderModalContainer("<h2>Terms of Service Agreement</h2><p>End user licensing agreements details statements documentation frameworks specifications details.</p>"); });