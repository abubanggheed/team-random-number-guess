$(document).ready(onReady);

function onReady() {
    $('#guessBtn').on('click', handleGuessClick);
    $('#inputDiv').on('click', '#resetBtn', restart);
    restart();
}

function handleGuessClick() {
    let objectToSend = {
        player1: $('#PlayerOneIn').val(),
        player2: $('#PlayerTwoIn').val(),
        player3: $('#PlayerThreeIn').val(),
        player4: $('#PlayerFourIn').val()
    }
    $.ajax({
        method: 'POST',
        url: '/guess',
        data: objectToSend
    }).then((response) => {
        getGuessesFromServer();
    });
}

function getGuessesFromServer() {
    $.ajax({
        method: 'GET',
        url: '/guess'
    }).then((response) => {
        let el = $('#guessOut');
        el.empty();
        let finish = false;
        for (let answer of response) {
            if (answer.response === 'you got it!'){
                finish = true;
            }
            el.append(`
        <li>${answer.player}: ${answer.response}</li>
        `);
        }
        if (finish) {
            finishGame();
        }
    }).catch( (error) => {
        alert('error',error)
    })
}

function restart(){
    $('#guessBtn').removeAttr('disabled');
    $('#resetBtn').remove();
    $('#guessOut').empty();
    $.ajax({
        method: 'POST',
        url: '/init',
        data: {}
    }).then( (response) => {
    });
}

function finishGame(){
    $('#inputDiv').append(`
    <button id="resetBtn">Reset</button>
    `);
    $('#guessBtn').attr('disabled', 'disabled');
}