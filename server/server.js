// requires
const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const createRandomNumber = require('./modules/random-number-generator.js');
let number;
// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded( {extended: true} ));// needed for post for JQ ajax
// global

let guesses;

app.listen(port, () => {
    console.log('server is up on', port); 
});

app.post('/init', (req, res) => {
    number = createRandomNumber(1, 25);
    res.sendStatus(200);
});

app.get('/guess', (req, res) => {
    console.log('sending, the answer is', number);
    res.send(guesses);
});

app.post('/guess', (req, res) => {
    configureGuesses(req.body);
    res.sendStatus(200);
});

function configureGuesses(objectIn){
    guesses = [];
    let botGuess = createRandomNumber(1, 25);
    let botResponse = 'the bot guessed ' + botGuess + ':';
    if (botGuess === number) {
        botResponse = 'You puny humans are no match for my machine intelligence!';
        botResponse = botResponse.fontsize(7);
    }
    guesses.push({
        player: 'player 1: ',
        response: doLogic(objectIn.player1)
    });
    guesses.push({
        player: 'player 2: ',
        response: doLogic(objectIn.player2)
    });
    guesses.push({
        player: 'player 3: ',
        response: doLogic(objectIn.player3)
    });
    guesses.push({
        player: 'player 4: ',
        response: doLogic(objectIn.player4)
    });
    guesses.push({
        player: botResponse,
        response: doBotLogic(botGuess)
    });
}

function doLogic(guess){
    let winner = 'YOU ARE THE WINNER!!!';
    if (guess > number){
        return 'your number is too high!';
    } else if (guess < number) {
        return 'your number is too low!'
    } else if (guess == number) {
        return winner.fontsize(7);
    } else {
        return 'enter and actual number chump }:-('
    }
}
function doBotLogic(guess){
    let winner = 'I AM THE WINNER!!!';
    if (guess > number){
        return 'my number is too high!';
    } else if (guess < number) {
        return 'my number is too low!'
    } else if (guess == number) {
        return winner.fontsize(7);
    } else {
        return 'enter and actual number chump }:-('
    }
}