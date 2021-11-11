// Variables
var timerElement = document.getElementById("timer");
// controls the timer element created in HTML
var questionElement = document.getElementById("question");
// controls the question element created in HTML
var answerElement = document.getElementById("answers");
var answerAElement = document.getElementById("answerA");
var answerBElement = document.getElementById("answerB");
var answerCElement = document.getElementById("answerC");
var answerDElement = document.getElementById("answerD");
answerElement.style.display = "none";
var feedbackElement = document.getElementById("correctIncorrect");
// format the answer options into an ordered list
var yesPlay = document.querySelector("#yesButton");
var noPlay = document.querySelector("#noButton");
var startGame = document.querySelector("#start-game");
var gameElement = document.querySelector("#game");

var questions = [
  (question1 = {
    question: "Commonly used data types do NOT include:",
    answer1: "strings",
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
});
// time also needs to be deducted when the user gets a question wrong

var timeLeft = 60;
function startTimer() {
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
    } else {
      clearInterval(timeInterval);
      timerElement.textContent = "";
      gameElement.remove();
      inputName();
    }
  }, 1000);
}
var i = 0;
function startQuestions() {
  questionElement.textContent = questions[i].question;
  answerAElement.textContent = Object.values(questions[i])[1];
  answerBElement.textContent = Object.values(questions[i])[2];
  answerCElement.textContent = Object.values(questions[i])[3];
  answerDElement.textContent = Object.values(questions[i])[4];
  answerElement.addEventListener("click", function (event) {
    var userClick = event.target.textContent; // store text content of user click
    console.log(userClick);
    if (userClick === questions[i].correct) {
      // check if user was correct
      feedbackElement.textContent = "Correct!";
      i++;
      startQuestions();
    } else if (i < 5) {
      // otherwise user was incorrect and run the following to reduce time
      feedbackElement.textContent = "Incorrect!";
      timeLeft = timeLeft - 10;
      i++;
      startQuestions();
    } else {
      inputName();
    }
  });

  // declare variable = value of user click
  //   var userClick =
  //   // if user clicked correct (questions[i].correct) then run first if
  //   if () {

  //   function inputName() {
  //     // end the game and present option to input name for stat keeping
  //     // local storage of name (key) and score (value)
  //     // getItem - retreive key/value pair from local storage
  //     // setItem - change key/value pair in local storage
  //   }
}
