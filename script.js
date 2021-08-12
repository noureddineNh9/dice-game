const Rice = document.querySelector('.rice-container');
const p1Box = document.querySelector('.player1-box');
const p2Box = document.querySelector('.player2-box');
const roleRiceBtn = document.querySelector('#roleRice-btn');
const newGameBtn = document.querySelector('#newGame-btn');
const holdBtn = document.querySelector('#hold-btn');

const currentScoreP1 = document.querySelector('#current-score-p1');
const totalScoreP1 = document.querySelector('#total-score-p1');
const currentScoreP2 = document.querySelector('#current-score-p2');
const totalScoreP2 = document.querySelector('#total-score-p2');

const riceNumber = Number(Rice.getAttribute('data-number'));

const p1_infos = {
  currentScore: 0,
  totalScore: 0,
  currentScoreBox: currentScoreP1,
  totalScoreBox: totalScoreP1,
};

const p2_infos = {
  currentScore: 0,
  totalScore: 0,
  currentScoreBox: currentScoreP2,
  totalScoreBox: totalScoreP2,
};

const RoleRice = function () {
  if (!gameOver) {
    const randomNumber = Math.floor(Math.random() * 5 + 1);

    Rice.innerHTML = `
        <img id="rice" src="./images/dice-${randomNumber}.png" alt="image" />
    `;

    if (randomNumber === 1) {
      currentPlayer.currentScore = 0;
      currentPlayer.currentScoreBox.textContent = currentPlayer.currentScore;
      Hold();
    } else {
      currentPlayer.currentScore += randomNumber;
      currentPlayer.currentScoreBox.textContent = currentPlayer.currentScore;
    }
  }
};

const changePlayer = function () {
  currentPlayer = currentPlayer === p1_infos ? p2_infos : p1_infos;
  p2Box.classList.toggle('active');
  p1Box.classList.toggle('active');
};

const CurrentPalyerWin = function () {
  gameOver = true;
  if (currentPlayer === p1_infos) {
    p1Box.classList.add('win');
  } else {
    p2Box.classList.add('win');
  }
};

const Hold = function () {
  if (!gameOver) {
    //Rice.innerHTML = '';
    currentPlayer.totalScore += currentPlayer.currentScore;
    currentPlayer.totalScoreBox.textContent = currentPlayer.totalScore;
    currentPlayer.currentScore = 0;
    currentPlayer.currentScoreBox.textContent = 0;

    if (currentPlayer.totalScore >= 30) {
      CurrentPalyerWin();
    } else {
      changePlayer();
    }
  }
};

const NewGame = function () {
  gameOver = false;
  p1Box.classList.remove('win');
  p2Box.classList.remove('win');

  p1Box.classList.add('active');
  p2Box.classList.remove('active');
  currentPlayer = p1_infos;

  p1_infos.currentScore = 0;
  p1_infos.totalScore = 0;
  p1_infos.currentScoreBox.textContent = 0;
  p1_infos.totalScoreBox.textContent = 0;

  p2_infos.currentScore = 0;
  p2_infos.totalScore = 0;
  p2_infos.currentScoreBox.textContent = 0;
  p2_infos.totalScoreBox.textContent = 0;
};

NewGame();

var currentPlayer = p1_infos;
var gameOver = false;

roleRiceBtn.addEventListener('click', RoleRice);
holdBtn.addEventListener('click', Hold);
newGameBtn.addEventListener('click', NewGame);
