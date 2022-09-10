var computerSequence = []
var userSequence = []
var options = ['blue', 'green', 'red', 'yellow']
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $('h1').text("Level " + level);
        nextLevel();
        started = true;
    }
})

function nextLevel() {
    level++;
    $('h1').text('Level ' + level)
    var idx = Math.floor(Math.random() * 4)
    computerSequence.push(options[idx])
    animateButton(options[idx])
    playSound(options[idx])
    //console.log(computerSequence)
}


$('button').click(function (e) {
        trackPattern(e.target)
        playSound(e.target.id)
        animateButton(e.target.id)
        checkAnswer(userSequence.length - 1)
})

function checkAnswer(currLevel) {
    if (userSequence[currLevel] === computerSequence[currLevel]) {
        //console.log('succes')
        
        if (userSequence.length == computerSequence.length) {
            setTimeout(function () {
                nextLevel()
            }, 1000)
        }
        return;
    }
    var audio = new Audio('sounds/wrong.mp3')
    audio.play()
    $('body').addClass('game-over')
    $('h1').text('Game Over press any key to restart')
    setTimeout(() => {
        $('body').removeClass('game-over')
    }, 300)
    startOver()
    $(document).keypress(function () {
        if (!started) {
            $('h1').text("Level " + level);
            nextLevel();
            started = true;
        }
    })
}

function startOver() {
    level = 0;
    userSequence = []
    computerSequence = []
    started = false;
}

function trackPattern(buttonClicked) {
    var userChoosenColor = $(buttonClicked).attr('id');
    userSequence.push(userChoosenColor)
}

function animateButton (choosenButton) {
    $('#' + choosenButton).addClass('pressed');
    setTimeout(function () {
        $('#' + choosenButton).removeClass('pressed');
    }, 200)
}

function playSound (choosenButton) {
    var audio = new Audio('sounds/' + choosenButton + '.mp3')
    audio.play()
}

