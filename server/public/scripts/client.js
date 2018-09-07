$(document).ready(onReady);

function onReady() {
    $('#guessBtn').on('click', handleGuessClick);
    //reset button click handler added 
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

    $('#roundsOut').html(keepTrackOfRounds); 
}

let counter = 0;
function keepTrackOfRounds(){
    return counter +=1;
}

function getGuessesFromServer() {
    $.ajax({
        method: 'GET',
        url: '/guess'
    }).then((response) => {
        let el = $('#guessOut');
        let correct = 'YOU ARE THE WINNER!!!';
        let finish = false;
        let stringToAppend = `<h4>Round: ` + counter + `</h4><ul>`;
        for (let answer of response) {
            if (answer.response === correct.fontsize(7)){
                finish = true;
            }
            stringToAppend += `
            <li>${answer.player} : ${answer.response}</li>
            `
        }
        el.append(stringToAppend + '</ul>');
        if (finish) {
            finishGame();
        }
    }).catch( (error) => {
        alert('error',error)
    })
}

function restart(){
    $('#guessOut').empty();
    
    $('#guessBtn').removeAttr('disabled');
    $('#resetBtn').remove();
    //the previous two lines were added to undo all the work done by
    //finishGame
    $('#guessOut').empty();
    $.ajax({
        method: 'POST',
        url: '/init',
        data: {}
    }).then( (response) => {
    });

    $('#PlayerOneIn').val('');
    $('#PlayerTwoIn').val('');
    $('#PlayerThreeIn').val('');
    $('#PlayerFourIn').val('');

    counter = -1;
    $('#roundsOut').html(keepTrackOfRounds); 
}
//finishGame disables the submit guess button and creates a the reset button
//complete the game on your browser for a full demonstration
function finishGame(){
    $('#inputDiv').append(`
    <button id="resetBtn">Reset</button>
    `);
    $('#guessBtn').attr('disabled', 'disabled');
    
}