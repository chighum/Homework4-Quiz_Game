// Timer
// declare variable timerElement = document.getElementbyId("x")

function timer() {
  var timeLeft = 60;

  var timeInterbal = setInterval(function () {
    if (timeLeft > 10) {
      timerElement.textContent = timeLeft + "seconds left";
      timeLeft--;
    } else if (timeLeft > 1) {
      timerElement.textContent = "Hurry! Only " + timeLeft + "seconds left!";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerElement.textContent = "Hurry! Only " + timeLeft + "second left!";
      timeLeft--;
    } // end the game and present option to input name for stat keeping
  });
}

// Questions
// Commonly used data types do NOT include:
// strings
// alerts // correct
// Booleans
// numbers

// The condition in an if / else statement is enclosed in:
// quotes
// curly brackets
// parenthesis // correct
// Ssuare brackets

// Arrays in Javascript can be used to store:
// numbers and strings
// other arrays
// Booleans
// All of the above // correct

// String values must be enclosed in _______ when being assigned to variables
// commas
// curly brackets
// quotes // correct
// parentheses

// A very useful tool for development and debugging code by printing content to the debugger
// JavaScript
// terminal/bash
// for loops
// console.log // correct
