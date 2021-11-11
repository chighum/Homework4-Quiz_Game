// VARIABLE DECLARATION
var yesPlay = document.querySelector("#startButton");
var leaderBoard = document.querySelector("#scoresButton");
var startGame = document.querySelector("#start-game");
var gameElement = document.querySelector("#game");
var timerElement = document.getElementById("timer");
var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answers");
var answerAElement = document.getElementById("answerA");
var answerBElement = document.getElementById("answerB");
var answerCElement = document.getElementById("answerC");
var answerDElement = document.getElementById("answerD");
// make the answer element hidden when the page is first loaded
answerElement.style.display = "none";
var feedbackElement = document.getElementById("correctIncorrect");
var displayScore = document.getElementById("score");
var userName = document.getElementById("name");
userName.style.display = "none";

var submitNameButton = document.getElementById("submit-name");

var questions = [
  (question1 = {
    question: "Commonly used data types do NOT include:",
    answers: "strings",
    correct: "alerts", // correct
    answer3: "Booleans",
    answer4: "numbers",
  }),
  (question2 = {
    question: "The condition in an if / else statement is enclosed in:",
    answer1: "quotes",
    answer2: "curly brackets",
    correct: "parenthesis", // correct
    answer4: "Square brackets",
  }),
  (question3 = {
    question: "Arrays in Javascript can be used to store:",
    answer1: "numbers and strings",
    answer2: "other arrays",
    answer3: "Booleans",
    correct: "All of the above", // correct
  }),
  (question4 = {
    question:
      "String values must be enclosed in _______ when being assigned to variables",
    answer1: "commas",
    answer2: "curly brackets",
    correct: "quotes", // correct
    answer4: "parentheses",
  }),
  (question5 = {
    question:
      "A very useful tool for development and debugging code by printing content to the debugger:",
    answer1: "JavaScript",
    answer2: "terminal/bash",
    answer3: "for loops",
    correct: "console.log", // correct
  }),
];

// give the user a button to click in order to start the game
// which in turn starts the timer and questions
// clear question and yes/no buttons from screen if they press yes
yesPlay.addEventListener("click", function (event) {
  event.preventDefault();
  startGame.remove();
  startTimer();
  startQuestions();
});

// button on home screen to show high scores
leaderBoard.addEventListener("click", showLeaderBoard);

// 60 second timer that has different messages depending on how much time is left
var timeLeft = 60;
function startTimer() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 10) {
      timerElement.textContent = timeLeft + " seconds left";
      timeLeft--;
    } else if (timeLeft > 1) {
      timerElement.textContent = "Hurry! Only " + timeLeft + " seconds left!";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerElement.textContent = "Hurry! Only " + timeLeft + " second left!";
      timeLeft--;
    } else {
      clearInterval(timeInterval);
      gameElement.remove();
      inputName();
    }
  }, 1000);
}
var i = 0;
var score = 0;

function startQuestions() {
  // refers to the value that corresponds to the question property of the ith question
  questionElement.textContent = questions[i].question;
  // display hidden element as an empty string so it can be filled with answers
  answerElement.style.display = "";
  // refers to the value that corresponds with the answer indexes of the ith question
  answerAElement.textContent = Object.values(questions[i])[1];
  answerBElement.textContent = Object.values(questions[i])[2];
  answerCElement.textContent = Object.values(questions[i])[3];
  answerDElement.textContent = Object.values(questions[i])[4];
  // add one even listener to all the answer buttons and run function called checkCorrect
  answerElement.addEventListener("click", checkCorrect);
}
function checkCorrect(event) {
  // took forever to figure this out --
  // have to remove the event listener otherwise each iteration the click event fires multiple times
  answerElement.removeEventListener("click", checkCorrect);
  // store text content of user click
  var userClick = event.target.textContent;
  // check if user was correct
  if (userClick === questions[i].correct) {
    score = score + 50;
    feedbackElement.textContent = "Correct!";
  } else if (userClick !== questions[i].correct) {
    // otherwise user was incorrect and run the following to reduce time
    feedbackElement.textContent = "Incorrect!";
    timeLeft = timeLeft - 20;
  }
  i++;
  // end the game when the questions run out
  if (i === questions.length) {
    gameElement.remove();
    inputName();
  } else {
    startQuestions();
  }
}

function inputName() {
  // end the game and present option to input name for stat keeping
  displayScore.textContent = "Score: " + score;
  // form for user to input name
  userName.style.display = "";
  submitNameButton.addEventListener("click", function (event) {
    event.preventDefault();
    var userNameInput = document.querySelector("#name-input").value;
    localStorage.setItem("name", userNameInput);
    localStorage.setItem("score", score);
    showLeaderBoard();
  });

  // local storage of name (key) and score (value)
  // getItem - retreive key/value pair from local storage
  // setItem - change key/value pair in local storage
}

function showLeaderBoard() {
  var lastUserName = localStorage.getItem("name");
  var lastScore = localStorage.getItem("score");
  alert(lastUserName + " " + lastScore);
}
