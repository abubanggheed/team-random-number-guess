$(document).ready(onReady);

function onReady() {
    console.log('ready');
    $('#guessBtn').on('click', handleGuessClick);
    restart();
}

function handleGuessClick() {
    let objectToSend = {
        player1: $('#PlayerOneIn').val(),
        player2: $('#PlayerTwoIn').val(),
        player3: $('#PlayerThreeIn').val(),
        player4: $('#PlayerFourIn').val()
    }
    console.log(objectToSend);
    $.ajax({
        method: 'POST',
        url: '/guess',
        data: objectToSend
    }).then((response) => {
        console.log('back from server with response', response);
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
        for (let answer of response) {
            el.append(`
        <li> player${answer.player}: ${answer.response}</li>
        `);
        }
    }).catch( (error) => {
        alert('error',error)
    })
}

function restart(){
    $.ajax({
        method: 'POST',
        url: '/init',
        data: {}
    }).then( (response) => {
        console.log(response);
    })
}