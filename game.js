var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0


function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
};


function playSound(name){
    var buttonClickSound = new Audio(`sounds/${name}.mp3`);
    buttonClickSound.play();
};

function addToSequence() {
    level++
    $("h1").text(`Level ${level}`);

    userClickedPattern = []

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    if (level < 3){
        $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    } else if (level < 6) {
        $(`#${randomChosenColor}`).fadeIn(75).fadeOut(75).fadeIn(75);
    } else {
        $(`#${randomChosenColor}`).fadeIn(50).fadeOut(50).fadeIn(50);
    }
    

    playSound(randomChosenColor);

};

function checkSequence(currentColor){
    if (gamePattern[currentColor] === userClickedPattern[currentColor]){
        console.log('success');

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              addToSequence();
            }, 1000);
        }
        
    } else {
        console.log("Wrong");

        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over! Press P to restart")
    } 
    
};

function startOver(){
        level = 0;
        gamePattern = []
        addToSequence();   
    }


$(".btn").click( function(event){
    var elementClicked = $(event.target);
    var userChosenButton = elementClicked.attr("id");

    userClickedPattern.push(userChosenButton);

    animatePress(userChosenButton);
    playSound(userChosenButton);

    checkSequence(userClickedPattern.length - 1);
});


$(document).keydown(function(event){
    if (event.key === "a"){
        addToSequence();   
    } else if (event.key === "p"){
        startOver();
    }
});




