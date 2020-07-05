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
        'The probability of getting exactly one head in tossing a pair of coins is',
      choices: ["0", "1", "1/2", "1/3"],
      answer: 2,
    },
    {
      question: "The probability of getting a spade card from a well shuffled deck of 52 cards is",
      choices: [
        "1/13",
        "1/4",
        "12/13",
        "3/4",
      ],
      answer: 1,
    },
    {
      question: "In 2014, 200 workers received pays on hourly basis from $15/hour to $25/hour according to the difficulty of assigned tasks. The largest possible amount paid to the workers for 8 working hours is",
      choices: [
        "$215",
        "$165",
        "$200",
        "$170",
      ],
      answer: 2,
    },
    {
      question: 'In 2018, 200 workers received pays on hourly basis from $15/hour to $25/hour according to the difficulty of assigned tasks. The least possible amount paid to the workers for 10 working hours is',
      choices: [
        "$180",
        "$150",
        "$140",
        "$110",
      ],
      answer: 1,
    },
    {
      question: "An engineering test consist of 100 questions. 2 points are awarded for correct answer and 1 point is deducted for wrongly answered questions. Ana attempted 85 questions and her total score was above 160. The minimum number of correct answers are",
      choices: ["85", "86", "88", "82"],
      answer: 3,
    },
    {
      question: "By expressing the sin 125° in terms of trigonometrical ratios, the answer will be",
      choices: ["sin 65° = 0.9128", "sin 55° = 0.8192", "sin 70° = 0.5384", "sin 72° = 0.1982"],
      answer: 1,
    },
    {
      question: "The sin P of triangle PQR with respect to P is calculated as",
      choices: ["QR/PQ", "QR/PR", "PQ/PR", "PR/PQ"],
      answer: 1,
    },
    {
      question: "By expressing the cos 113° in terms of trigonometrical ratios, the answer will be",
      choices: [
        "− cos 76° = -0.7093",
        "− cos 65° = -0.4258",
        "− cos 67° = -0.3907",
        "− cos 62° = -0.8520",
      ],
      answer: 2,
    },
    {
      question: "If the sine is 0.896 then the value of acute angle is",
      choices: [
        "78°",
        "72°",
        "63.64°",
        "65°",
      ],
      answer: 1,
    },
    {
      question: "By solving the following xy^8⁄xy^4",
      choices: [
        "y^-4",
        "1/y^-4",
        "1/y^4",
        "1/y^y-3",
      ],
      answer: 1,
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
  