// VARIABLE DECLARATION
// 1st page - option to play or show leaderboard
var startGame = document.getElementById("start-game");
var yesPlay = document.getElementById("start-button");
var leaderBoard = document.getElementById("scores-button");

// 2nd page - multiple choice quiz game
var gameElement = document.getElementById("game");
var timerElement = document.getElementById("timer");
var timeInterval;
var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answers");
var answerAElement = document.getElementById("answerA");
var answerBElement = document.getElementById("answerB");
var answerCElement = document.getElementById("answerC");
var answerDElement = document.getElementById("answerD");
// make the answer element hidden when the page is first loaded
answerElement.style.display = "none";
var feedbackElement = document.getElementById("correct-incorrect");

// 3rd page - show score and option to input name
var nameScoreElement = document.getElementById("name-score");
var displayScore = document.getElementById("score");
var userName = document.getElementById("name");
nameScoreElement.style.display = "none";
userName.style.display = "none";
var submitNameButton = document.getElementById("submit-name");
var nameInput = document.getElementById("name-input");

// 4th page - leaderboard
var highScores = document.getElementById("high-scores");
highScores.style.display = "none";
var highScoreList = document.getElementById("score-list");
var homeButton = document.getElementById("home-button");

// get score history from local storage and store as an array in scoreHistory
var scoreHistory = JSON.parse(localStorage.getItem("high-scores")) || [];

// question set declared as objects inside an array
// can call question string value using questions[i].question
// can call answers string value using Object.values(questions[i][#]); # = 1-4
// can check for correct using questions[i].correct
var questions = [
  (question1 = {
    question: "Commonly used data types do NOT include:",
    answer1: "strings",
    correct: "alerts",
    answer3: "Booleans",
    answer4: "numbers",
  }),
  (question2 = {
    question: "The condition in an if / else statement is enclosed in:",
    answer1: "quotes",
    answer2: "curly brackets",
    correct: "parenthesis",
    answer4: "Square brackets",
  }),
  (question3 = {
    question: "Arrays in Javascript can be used to store:",
    answer1: "numbers and strings",
    answer2: "other arrays",
    answer3: "Booleans",
    correct: "All of the above",
  }),
  (question4 = {
    question:
      "String values must be enclosed in _______ when being assigned to variables",
    correct: "quotes",
    answer2: "commas",
    answer3: "curly brackets",
    answer4: "parentheses",
  }),
  (question5 = {
    question:
      "A very useful tool for development and debugging code by printing content to the debugger:",
    answer1: "JavaScript",
    answer2: "terminal/bash",
    answer3: "for loops",
    correct: "console.log",
  }),
];

// Variables for iterating over time and questions
var i;
var score;
var timeLeft;
var gameOver = false;

// give the user a button to click in order to start the game
// which in turn starts the timer and questions
// clear question and yes/no buttons from screen if they press yes
yesPlay.addEventListener("click", function () {
  startGame.style.display = "none";
  gameOver = false;
  i = 0;
  score = 0;
  timeLeft = 60;
  startTimer();
  startQuestions();
});

// button on home screen to show high scores
leaderBoard.addEventListener("click", function () {
  renderScores();
  showLeaderBoard();
});

// 60 second timer that has different messages depending on how much time is left
function startTimer() {
  gameElement.style.display = "";
  timeInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft > 10) {
      timerElement.textContent = timeLeft + " seconds left";
    } else if (timeLeft > 5) {
      timerElement.style.fontWeight = "bold";
      timerElement.textContent = "Hurry! Only " + timeLeft + " seconds left!";
    } else if (timeLeft > 3) {
      timerElement.style.fontWeight = "bold";
      timerElement.style.fontStyle = "italic";
      timerElement.textContent = "Hurry! Only " + timeLeft + " seconds left!";
    } else if (timeLeft > 1) {
      timerElement.style.fontWeight = "bold";
      timerElement.style.fontStyle = "italic";
      timerElement.style.fontSize = "30px";
      timerElement.textContent = "Hurry! Only " + timeLeft + " seconds left!";
    } else if (timeLeft === 1) {
      timerElement.style.fontWeight = "bold";
      timerElement.style.fontStyle = "italic";
      timerElement.style.fontSize = "30px";
      timerElement.textContent = "Hurry! Only " + timeLeft + " second left!";
    }
    if (timeLeft >= 0) {
      // if the questions run out and time is left clear the time interval and show input for stat keeping
      if (gameOver && timeLeft > 0) {
        inputName();
        clearInterval(timeInterval);
        gameElement.style.display = "none";
      }
    }
    // end the game when the timer runs out and give option to input name for stat keeping
    if (timeLeft === 0) {
      inputName();
      clearInterval(timeInterval);
      gameElement.style.display = "none";
    }
  }, 1000);
}

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
  // check if user was correct and add points to score
  if (userClick === questions[i].correct) {
    score = score + 50;
    feedbackElement.style.color = "green";
    feedbackElement.style.fontWeight = "bold";
    feedbackElement.style.fontStyle = "normal";
    feedbackElement.textContent = "Correct!";
  } else {
    // otherwise user was incorrect and reduce time
    feedbackElement.style.color = "red";
    feedbackElement.style.fontWeight = "normal";
    feedbackElement.style.fontStyle = "italic";
    feedbackElement.textContent = "Incorrect!";
    timeLeft = timeLeft - 10;
  }
  i++;
  // if there are still questions remaining, loop back to startQuestions function with the next index #
  if (i < questions.length) {
    startQuestions();
  } // end the game when the questions run out and set gameOver = true to end the game in the startTimer function
  else {
    gameOver = true;
    gameElement.style.display = "none";
  }
}

function inputName() {
  // end the game and present option to input name for stat keeping
  displayScore.textContent = "Score: " + score;
  // form for user to input name
  nameScoreElement.style.display = "";
  userName.style.display = "";
  submitNameButton.addEventListener("click", saveScores);
  // store value of user name input
}

// add the most recent score to local storage as an object
function saveScores() {
  submitNameButton.removeEventListener("click", saveScores);
  var userNameInput = nameInput.value;
  nameInput.value = "";
  var userNameScore = { name: userNameInput, score: score };
  scoreHistory.push(userNameScore);
  localStorage.setItem("high-scores", JSON.stringify(scoreHistory));
  renderScores();
  showLeaderBoard();
}

function renderScores() {
  highScoreList.textContent = "";
  for (var x = 0; x < scoreHistory.length; x++) {
    // var singleScoreHistory = scoreHistory[x];
    var listItem = document.createElement("li");
    listItem.setAttribute("data-index", x);
    listItem.textContent =
      scoreHistory[x].name + " --- " + scoreHistory[x].score;
    highScoreList.appendChild(listItem);
    scoreHistory.sort(function (a, b) {
      return b - a;
    });
  }
}

function showLeaderBoard() {
  nameScoreElement.style.display = "none";
  startGame.style.display = "none";
  highScores.style.display = "";
}

homeButton.addEventListener("click", function () {
  startGame.style.display = "";
  highScores.style.display = "none";
});
