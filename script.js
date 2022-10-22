import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScroeEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScroeEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

const allGameIcons = document.querySelectorAll(".far");
let playerScore = 0;
let computerScore = 0;

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

function displayPlayerChoice(playerChoice) {
  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      playerLizard.classList.add("selected");
      playerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      playerSpock.classList.add("selected");
      playerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

function displayConputerChoice(computerChoice) {
  switch (computerChoice) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      computerLizard.classList.add("selected");
      computerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      computerSpock.classList.add("selected");
      computerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

function onPlayerIconClick(playerChoice) {
  if (computerScore === 10 || playerScore === 10) return;

  allGameIcons.forEach((icon) => icon.classList.remove("selected"));
  displayPlayerChoice(playerChoice);

  let computerChoice = getRandomChoice();
  displayConputerChoice(computerChoice);

  checkResult(playerChoice, computerChoice);
}

function checkResult(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) {
    resultText.textContent = "It's a tie.";
  } else if (choices[playerChoice].defeats.includes(computerChoice)) {
    resultText.textContent = "You Won!";
    playerScore++;
  } else {
    resultText.textContent = "You Lose!";
    computerScore++;
  }

  computerScoreEl.textContent = computerScore;
  playerScoreEl.textContent = playerScore;

  if (computerScore === 10 || playerScore === 10) {
    startConfetti();
    let winner = computerScore === 10 ? "Computer" : "Player";
    resultText.classList.add("win-message");
    resultText.textContent = `${winner} scored 10 points! Press reset to continue.`;
  }
}

function getRandomChoice() {
  const choiceNumber = Math.floor(Math.random() * 5);
  return Object.entries(choices)[choiceNumber][0];
}

function reset() {
  stopConfetti();
  playerScore = 0;
  computerScore = 0;

  allGameIcons.forEach((icon) => icon.classList.remove("selected"));
  resultText.classList.remove("win-message");

  playerChoiceEl.textContent = " --- Choice";
  computerChoiceEl.textContent = " --- Choice";

  computerScoreEl.textContent = computerScore;
  playerScoreEl.textContent = playerScore;

  resultText.textContent = "";
}

window.reset = reset;
window.onPlayerIconClick = onPlayerIconClick;
