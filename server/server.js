// requires
const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
function randomNumber (min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}
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
    number = randomNumber(1, 25);
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
    guesses.push({
        player: 'player 1',
        response: doLogic(objectIn.player1)
    });
    guesses.push({
        player: 'player 2',
        response: doLogic(objectIn.player2)
    });
    guesses.push({
        player: 'player 3',
        response: doLogic(objectIn.player3)
    });
    guesses.push({
        player: 'player 4',
        response: doLogic(objectIn.player4)
    });
}

function doLogic(guess){
    let winner = 'YOU ARE THE WINNER!!!';
    if (guess > number){
        return 'too high!';
    } else if (guess < number) {
        return 'too low!'
    } else if (guess == number) {
        return winner.fontsize(7);
    } else {
        return 'enter and actual number chump }:-('
    }
}