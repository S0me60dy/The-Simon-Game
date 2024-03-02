var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var levelCounter = 0;

$(document).on("keydown", function() {
    if (!started) {
  
      $("h1").text("Level " + levelCounter);
      nextSequence();
      started = true;
    }
  });

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    pressAnimation(userChosenColour);
    console.log(userClickedPattern.length - 1);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 100);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
    userClickedPattern = [];
    levelCounter++;
    $("h1").text("Level " + levelCounter);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
}

function pressAnimation(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
      }, 100);
}

function startOver(){
  started = false;
  gamePattern = [];
  levelCounter = 0;
}
