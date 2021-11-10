// Variables
var timerElement = document.getElementById("timer");
// controls the timer element created in HTML
var questionElement = document.getElementById("question");
// controls the question element created in HTML
var answerElement = document.getElementById("answers");
answerElement.style.display = "none";
// format the answer options into an ordered list
var yesPlay = document.querySelector("#yesButton");
var noPlay = document.querySelector("#noButton");
var startGame = document.querySelector("#start-game");

// give the user a button to click in order to start the game
// which in turn starts the timer and questions
// clear question and yes/no buttons from screen if they press yes
yesPlay.addEventListener("click", function (event) {
  event.preventDefault();
  startGame.remove();
  startTimer();
});

// time also needs to be deducted when the user gets a question wrong
function startTimer() {
  var timeLeft = 60;
  startQuestions();
  answerElement.style.display = "";

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
    } // end the game and present option to input name for stat keeping
    // local storage of name (key) and score (value)
    // getItem - retreive key/value pair from local storage
    // setItem - change key/value pair in local storage
    else {
      clearInterval(timeInterval);
      timerElement.textContent = "";
    }
  }, 1000);
  function startQuestions() {
    questionElement.textContent = question1.question;
    answerElement.children[0].children[0].textContent = question1.answers[0];
    answerElement.children[1].children[0].textContent = question1.answers[1];
    answerElement.children[2].children[0].textContent = question1.answers[2];
    answerElement.children[3].children[0].textContent = question1.answers[3];
  }
}

// Questions
var question1 = {
  question: "Commonly used data types do NOT include:",
  answers: ["strings", "alerts", "Booleans", "numbers"],
  //   answer1: "strings",
  //   answer2: "alerts", // correct
  //   answer3: "Booleans",
  //   answer4: "numbers",
};
console.log(question1.answers[0]);
var question2 = {
  question: "The condition in an if / else statement is enclosed in:",
  answer1: "quotes",
  answer2: "curly brackets",
  answer3: "parenthesis", // correct
  answer4: "Square brackets",
};

var question3 = {
  question: "Arrays in Javascript can be used to store:",
  answer1: "numbers and strings",
  answer2: "other arrays",
  answer3: "Booleans",
  answer4: "All of the above", // correct
};

var question4 = {
  question:
    "String values must be enclosed in _______ when being assigned to variables",
  answer1: "commas",
  answer2: "curly brackets",
  answer3: "quotes", // correct
  answer4: "parentheses",
};

var questionn5 = {
  question:
    "A very useful tool for development and debugging code by printing content to the debugger:",
  answer1: "JavaScript",
  answer2: "terminal/bash",
  answer3: "for loops",
  answer4: "console.log", // correct
};
