'use strict';

const choices = document.querySelectorAll('.choice');
const restart = document.querySelector('#restart');
const score = document.querySelector('#score');
const result = document.querySelector('#result');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
}

//play game
function play(e) {
  restart.style.display = 'inline-block'
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

//event listener
var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener(touchEvent, clearModal);
restart.addEventListener('click', restartGame);

//computer choice
function getComputerChoice() {
  const random = Math.random()
  if (random < 0.34) {
    return 'rock'
  } else if (random <= 0.67) {
    return 'paper'
  } else {
    return 'scissors'
  }
}

//get winner
function getWinner(p, c) {
  if (p === c) {
    return 'draw'
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer'
    } else {
      return 'player'
    }
  } else if (p === 'paper') {
    if (c === 'rock') {
      return 'player'
    } else {
      return 'computer'
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer'
    } else {
      return 'player'
    }
  }
}

//show winner
function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    scoreboard.player++;
    result.innerHTML =
      `<h1 class= 'text-win'>You win!</h1>
      <i class = 'fas fa-hand-${computerChoice} fa-10x'></i>
      <p>Computer chose <u><strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></u></p>
      `;
  } else if (winner === 'computer') {
    scoreboard.computer++;
    result.innerHTML =
      `<h1 class= 'text-lose'>You lost!</h1>
      <i class = 'fas fa-hand-${computerChoice} fa-10x'></i>
      <p>Computer chose <u><strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></u></p>
      `;
  } else {
    result.innerHTML =
      `<h1>It's a Draw!</h1>
      <i class = 'fas fa-hand-${computerChoice} fa-10x'></i>
      <p>Computer chose <u><strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></u></p>
      `;
  }
  score.innerHTML =
    `<p>Player: ${scoreboard.player}
    <p>Computer: ${scoreboard.computer}`
  modal.style.display = 'block';
}

function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none'
  }
}

function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
  <p>Player: 0
  <p>Computer: 0
  `
}