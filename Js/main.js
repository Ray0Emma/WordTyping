window.addEventListener("load", init);

// Globals
const levels = {
  easy: 5,
  medium: 3,
  hard: 1,
};

// To chnage level
const currentLevel = levels.easy;

let time = 5;
let score = 0;
let isPlay;

// DOM Elements
const seconds = document.querySelector("#seconds");
const currentWord = document.querySelector("#current-word");
const wordInput = document.querySelector("#word-input");
const message = document.querySelector("#message");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");
const tryAgain = document.querySelector("#tryAgain");

// Initialize Game
function init() {
  seconds.innerHTML = currentLevel;
  // Load word form array
  $(function () {
    $.ajax({
      dataType: "json",
      url: "http://myjson.dit.upm.es/api/bins/fmvx",
      cache: false,
      success: function (data, status) {
        showWord(data.data);
        // console.log(data.data);
      },
      error: function (xhr, textStatus, error) {
        console.log(xhr);
        console.log(textStatus);
        console.log(error);
      },
    });
  });
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}
// Start match
function startMatch() {
  if (matchWords()) {
    isPlay = true;
    time = currentLevel + 1;
    $(function () {
      $.ajax({
        dataType: "json",
        url: "http://myjson.dit.upm.es/api/bins/fmvx",
        cache: false,
        success: function (data, status) {
          showWord(data.data);
          // console.log(data.data);
        },
        error: function (xhr, textStatus, error) {
          console.log(xhr);
          console.log(textStatus);
          console.log(error);
        },
      });
    });
    wordInput.value = "";
    score++;
  }
  scoreDisplay.innerHTML = score;
}
// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = '<span class="text-success">You did it!!!<span>';
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick and show random word
function showWord(myWords) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * myWords.length);
  // Output random word
  currentWord.innerHTML = myWords[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game Over
    isPlay = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlay && time === 0) {
    wordInput.classList = "d-none";
    message.innerHTML = '<span class="text-danger">Game Over!!!<span>';
    tryAgain.classList = "btn btn-warning";
  }
}

// Refrech the page
tryAgain.onclick = function refrech() {
  window.location.reload();
};
