$(document).ready(function () {
    start(questionNumber);
  
    window.onload = function (event) {
      display = document.querySelector("#time");
      duration = 600;
      quizTimer(duration,display);
      setTimeout(() => {
        end();
      }, 600000);
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
        'The major part of the pancreas is',
      choices: ["Ducted", "Fluid filled", "Ductless", "Non fluid filled"],
      answer: 0,
    },
    {
      question: "A specific messenger molecule synthesized by an endocrine gland is",
      choices: [
        "enzyme",
        "hormone",
        "chemical",
        "activator",
      ],
      answer: 1,
    },
    {
      question: "In positive feedback, the rate of a process",
      choices: [
        "Increases",
        "Remains constant",
        "Changes",
        "Decreases",
      ],
      answer: 0,
    },
    {
      question: 'The hormones secreted by islets of Langerhans are',
      choices: [
        "Estrogen and progesterone",
        "Calcitonin and oxytocin",
        "Insulin and glucagon",
        "Vasopressin and oxytocin",
      ],
      answer: 2,
    },
    {
      question: "A fatty layer secreted by Schwann cells is",
      choices: ["Fatty cover", "Fatty sheath", "Myelin sheath", "Oily sheath"],
      answer: 2,
    },
    {
      question: "Skeletal muscles, thinking, intelligence and emotions are controlled by",
      choices: ["Cerebellum", "Cerebrum", "Hypothalamus", "Thalamus"],
      answer: 1,
    },
    {
      question: "The image of a distant object is formed on",
      choices: ["Rods", "Iris", "Retina", "Eye ball"],
      answer: 2,
    },
    {
      question: "The largest part of the forebrain is",
      choices: [
        "thalamus",
        "cerebrum",
        "hippocampus",
        "cerebellum",
      ],
      answer: 1,
    },
    {
      question: "Glands that have ducts are called",
      choices: [
        "endocrine glands",
        "exocrine glands",
        "ductless glands",
        "non fluid filled",
      ],
      answer: 1,
    },
    {
      question: "When the iris muscles of the eye contracts, the pupil constricts in",
      choices: [
        "dim light",
        "bright light",
        "green colored light",
        "red colored light",
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
  