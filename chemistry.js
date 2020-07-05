$(document).ready(function () {
    start(questionNumber);
  
    window.onload = function (event) {
      display = document.querySelector("#time");
      duration = 600;
      quizTimer(duration,display);
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
      }, 500);
  
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
      question:
        'How much cooler does the air get for every 1 km increase in altitude in the troposphere?',
      choices: ["2 degrees", "6.5 degrees", "8 degrees", "10 degrees"],
      answer: 1,
    },
    {
      question: "Which of the following is produced when electrical discharges pass through oxygen in the air?",
      choices: [
        "Chlorofluorocarbons",
        "Methane",
        "Ozone",
        "Lead compounds",
      ],
      answer: 2,
    },
    {
      question: "What is the source of lead compounds?",
      choices: [
        "Aerosol sprays foams",
        "Exhaust fumes of motor vehicles",
        "Incomplete burning of wood",
        "None of above",
      ],
      answer: 1,
    },
    {
      question: 'The atmosphere is divided into how many layers?',
      choices: [
        "Two",
        "Three",
        "Four",
        "Five",
      ],
      answer: 2,
    },
    {
      question: "How much higher can be the temperature inside a greenhouse as compared to the outside?",
      choices: ["20 °C higher", "10 °C to 15 °C higher", "5 °C higher", "25 °C higher"],
      answer: 1,
    },
    {
      question: "The outer layer of the thermosphere is",
      choices: ["Ionosphere", "Exosphere", "Mesosphere", "Stratosphere"],
      answer: 1,
    },
    {
      question: "Minimum temperature of the troposphere is",
      choices: ["17 °C", "−55 °C", "−5 °C", "1800 °C"],
      answer: 1,
    },
    {
      question: "The temperature of the outer mesosphere is",
      choices: [
        "93 °C",
        "−93 °C",
        "5 °C",
        "5 °C",
      ],
      answer: 1,
    },
    {
      question: "If silk clothes are left in the open air for a week or so, their color fades because of",
      choices: [
        "Sulphur dioxide is converted into sulphur trioxide",
        "Dirt",
        "Carbon monoxide",
        "Nitrogen oxides",
      ],
      answer: 0,
    },
    {
      question: "Height of thermosphere is",
      choices: [
        "50 Km",
        "80 Km",
        "Above 80 Km",
        "30 Km",
      ],
      answer: 2,
    },
  ];
  
  
  var result = [
    {
      image:
        "http://www.reactiongifs.com/r/asm.gif",
      comment: "Awesome!!",
    },
    {
      image:
        "http://www.reactiongifs.com/r/2012/11/naked-gun-facepalm.gif",
      comment: "Can do better!",
    },
    {
      image:
        "http://www.reactiongifs.com/wp-content/uploads/2013/06/empty.gif",
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
      `Your Score is : ${positiveScore - negativeScore},` + "\n" +
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
    } 
    else if (
      totalCorrect <= allQuestions.length * 0.2
    ) {
      optionFinal = 2;
    }
  }
  
  function restart() {
    $("#try-again").click(function () {
      (questionNumber = 0), (totalCorrect = 0), (optionFinal = 0), (positiveScore = 0), (negativeScore = 0);
  
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
      negativeScore = negativeScore + 5;
    }
  }
  
  async function quizTimer(duration,display) {
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
  