// Materiais
const materials = [
  { type: 'papel', image: '../img/papel_quiz.jpg' },
  { type: 'plastico', image: '../img/plastico1.png' },
  { type: 'plastico', image: '../img/plastico.jpg' },
  { type: 'metal', image: '../img/metal.avif' }
];

let currentMaterial = null;
let score = 0;
let lives = 3;
let timeLeft = 60;
let timerInterval;

// Elementos DOM
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const materialDiv = document.getElementById("material");
const bins = document.querySelectorAll(".bin");
const scoreSpan = document.getElementById("score");
const livesSpan = document.getElementById("lives");
const timerSpan = document.getElementById("timer");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");



// Eventos de botões
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

// Início do jogo
function startGame() {
  score = 0;
  lives = 3;
  timeLeft = 60;
  scoreSpan.textContent = score;
  livesSpan.textContent = lives;
  timerSpan.textContent = timeLeft;

  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  gameScreen.style.display = "block";

  loadMaterial();
  startTimer();
}

// Fim de jogo
function endGame() {
  clearInterval(timerInterval);
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "block";
  finalScore.textContent = score;
}

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Carregar material aleatório
function loadMaterial() {
  const randomIndex = Math.floor(Math.random() * materials.length);
  currentMaterial = materials[randomIndex];
  materialDiv.style.backgroundImage = `url('${currentMaterial.image}')`;
}

// Drag & Drop
materialDiv.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", currentMaterial.type);
});

bins.forEach(bin => {
  bin.addEventListener("dragover", (e) => {
    e.preventDefault();
    bin.style.borderColor = "#00c853";
  });

  bin.addEventListener("dragleave", () => {
    bin.style.borderColor = "#444";
  });

  bin.addEventListener("drop", (e) => {
    e.preventDefault();
    bin.style.borderColor = "#444";

    const droppedType = e.dataTransfer.getData("text/plain");
    const binType = bin.getAttribute("data-type");

    if (droppedType === binType) {
      score++;
      scoreSpan.textContent = score;
      showFeedback("✅ Acertou!", true);
    } else {
      lives--;
      livesSpan.textContent = lives;
      showFeedback("❌ Errou!", false);

      if (lives <= 0) {
        endGame();
        return;
      }
    }

    setTimeout(() => {
      showFeedback("");
      loadMaterial();
    }, 800);
  });
});

// Feedback com animação + som
function showFeedback(message, positive = true) {
  feedback.textContent = message;
  feedback.style.color = positive ? "green" : "red";
  feedback.style.transform = "scale(1.3)";

  if (positive) soundCorrect.play();
  else soundWrong.play();

  setTimeout(() => {
    feedback.style.transform = "scale(1)";
  }, 300);
}
