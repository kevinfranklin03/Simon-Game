let buttonColours = ["red", "blue", "green", "yellow"]; //array 1
let gamePattern = []; //array 2
let userClickedPattern = []; //array3
let started = false;
let level = 0;

/* keypress events from the user */

$(document).on("keypress", ()=>{
    if(!started) { // if not started this line executes (started = true) // only works if started = false
        $("#level-title").text("Level " + level); // current level text
        nextSequence();
        started = true; // change false to true after 1 time
    }
});

/* When user clicks*/

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id"); //gets then value of the button which was clicked and stores in array 3
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour); //to make sound after user clicks the button
    animatePress(userChosenColour); // to animate after user clicks the button
    checkAnswer(userClickedPattern.length - 1); //!!! 
});


/* to match answers */

function checkAnswer(currentLevel) { 
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //checks each elements from both arrays
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length) { // checks length of both arrays

            setTimeout(()=>{
                nextSequence(); // if true nextSequence() runs after 1 sec
            }, 1000);
        }
    }   
         else {

            console.log("wrong");

            playSound("wrong");
            $("body").addClass("game-over");

            setTimeout(()=>{
                $("body").removeClass("game-over")
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart")
            startOver(); // to start again
        }
        
}

function nextSequence() {

    userClickedPattern = []; // after every time u answer correctly this array sets to be empty and starts again

    level++; // increment after every time when user clicks

    $("#level-title").text('Level ' + level); // change current level text

    let randomNumber = Math.floor(Math.random() * 4); //generate a random number from 0 - 3
    // console.log(randomNumber);

    let randomChosenColour = buttonColours[randomNumber]; //choose random color from the array 1
    //console.log(randomChosenColour);
    gamePattern.push(randomChosenColour)//random pattern generated here in array 2
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //to make flash effect

    playSound(randomChosenColour); // call playSound after random colour generates
}    
//console.log(gamePattern);


/* To play audio*/

function playSound(name) { 
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

/* To make grey bg effect for 1 sec*/

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(()=>{
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}


/*restart the game */
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}