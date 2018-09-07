this code broadcasts a "game" on a server.
The game is a guessing game.

There are four input boxes, each player gets one.
A random number is chosen between 1 and 25. When the submit button is pressed, feedback is given on guess left in each input. The guesses are compared to a randomly chosen number on the server. A successful guess ends the game, and the players are allowed to restart with a new random number.

The server can only hold one random number at a time, thus if there are multiple clients logged on to the site, the game will still run, but the number will change whenever any client resets or reloads.

This code uses jQuery, express, and body-parser which were installed via npm.

body-parser and expresses are saved dependancies so running

- npm install

on the terminal will allow a new server to run this code. jQuery is included locally under server/public/vendors.