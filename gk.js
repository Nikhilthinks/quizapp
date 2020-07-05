$(document).ready(function () {
  start(questionNumber);

  window.onload = function (event) {
    display = document.querySelector("#time");
    duration = 600;
    quizTimer(duration, display);
    setTimeout(() => {
      end();
    }, 600200);
  };

  $(".submit-answer").on("click", function (event) {
    var userAnswer = parseInt($(this).attr("id"));
    answerCheck(userAnswer);

    setTimeout(function () {
      $(".submit-answer").removeClass("correctStyle incorrectStyle");
      start(questionNumber);
    }, 800);

    questionNumber++;
  });
});

var questionNumber = 0,
  totalCorrect = 0,
  optionFinal = 0,
  positiveScore = 0,
  negativeScore = 0;

var allQuestions = [
  {
    question: "Who invented AC current?",
    choices: ["Nikola Tesla", "Ankur Warikoo", "Modi Ji", "Edison"],
    answer: 0,
  },
  {
    question: "The change in the focal length of human eye is caused due to",
    choices: ["Ciliary muscles", "Pupil", "Cornea", "Iris"],
    answer: 0,
  },
  {
    question:
      "When the iris muscles of the eye contracts, the pupil constricts in",
    choices: [
      "dim light",
      "bright light",
      "green colored light",
      "red colored light",
    ],
    answer: 1,
  },
  {
    question: " The persistence of vision for human eye is",
    choices: [
      "1/10th of a second",
      "1/16th of a second",
      "1/6th of a second",
      "1/18th of a second",
    ],
    answer: 1,
  },
  {
    question: "The largest part of the forebrain is",
    choices: ["thalamus", "cerebrum", "hippocampus", "cerebellum"],
    answer: 1,
  },
  {
    question:
      "The phenomena of light responsible for the working of the human eye is",
    choices: [
      "Reflection",
      "Refraction",
      "Power of accommodation",
      "Persistence of vision",
    ],
    answer: 1,
  },
  {
    question: "Minimum temperature of the troposphere is",
    choices: ["17 °C", "−55 °C", "−5 °C", "1800 °C"],
    answer: 1,
  },
  {
    question:
      "The colored light that refracts most while passing through a prism is",
    choices: ["Yellow", "Violet", "Blue", "Red"],
    answer: 1,
  },
  {
    question: "The amount of light entering the human eye is controlled by",
    choices: ["Ciliary muscles", "Pupil", "Cornea", "Iris"],
    answer: 1,
  },
  {
    question:
      "The part of the eyes refracts light entering the eye from external objects?",
    choices: ["Lens", "Cornea", "Iris", "Pupil"],
    answer: 1,
  },
];

var result = [
  {
    image: "http://www.reactiongifs.com/r/asm.gif",
    comment: "Awesome!!",
  },
  {
    image: "http://www.reactiongifs.com/r/2012/11/naked-gun-facepalm.gif",
    comment: "Can do better!",
  },
  {
    image: "http://www.reactiongifs.com/wp-content/uploads/2013/06/empty.gif",
    comment: "Better luck next time!",
  },
];

// continue with next question or end
var start = function (questionNumber) {
  $("h2").hide().fadeIn(400);

  if (questionNumber !== allQuestions.length) {
    question(questionNumber);
  } else {
    end();
  }
};

// show question and possible answers
function question(questionNum) {
  $("h2").text(allQuestions[questionNum].question);

  $.each(allQuestions[questionNum].choices, function (i, answers) {
    $("#" + i).html(answers);
  });
}

function end() {
  finalImage();
  $("ul").hide();
  $("h2").text(
    `Your Score is : ${positiveScore - negativeScore},` +
      "\n" +
      "\n You marked " +
      totalCorrect +
      " answers correct out of " +
      allQuestions.length +
      ". " +
      result[optionFinal].comment
  );
  $("#image")
    .html("<img src=" + result[optionFinal].image + ' alt="">')
    .fadeIn(1000);
  $("#try-again-container").show();

  restart();
}

// result image according to correct answers
function finalImage() {
  if (
    totalCorrect <= allQuestions.length &&
    totalCorrect >= allQuestions.length * 0.7
  ) {
    optionFinal = 0;
  } else if (
    totalCorrect <= allQuestions.length * 0.6 &&
    totalCorrect >= allQuestions.length * 0.2
  ) {
    optionFinal = 1;
  } else if (totalCorrect <= allQuestions.length * 0.2) {
    optionFinal = 2;
  }
}

function restart() {
  $("#try-again").click(function () {
    (questionNumber = 0),
      (totalCorrect = 0),
      (optionFinal = 0),
      (positiveScore = 0),
      (negativeScore = 0);

    start(questionNumber);
    $("#image").hide();
    $("#try-again-container").hide();
    $("ul").fadeIn(400);

    quizTimer();
  });
}

function answerCheck(userAnswer) {
  var correctAnswer = allQuestions[questionNumber].answer;

  if (userAnswer === correctAnswer) {
    $("#" + userAnswer).addClass("correctStyle");
    totalCorrect++;
    positiveScore = positiveScore + 20;
  } else {
    $("#" + userAnswer).addClass("incorrectStyle");
    $("#" + correctAnswer).addClass("correctStyle");
    negativeScore = negativeScore + 5;
  }
}

async function quizTimer(duration, display) {
  var time = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--time < 0) {
      time = duration;
    }
  }, 1000);
}
