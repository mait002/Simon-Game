// Pattern of clicks by User
var userClickPattern = [];

// Pattern of button clicks by game
var gamePattern = [];

// Button colors
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).on("keydown", function() {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})




// Next button to be clicked
function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    animatePress(randomChosenColour);
    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();
    
}


// Button clicked by User
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    animatePress(userChosenColor);
    var audio = new Audio("./sounds/" + userChosenColor + ".mp3");
    audio.play();
    checkAnswer(userClickPattern.length - 1);
});

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () { $("." + currentColor).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
            userClickPattern = [];
        }
    } else {
        console.log("wrong");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over") }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
        userClickPattern = [];
    }
    
}