import readLineSync from 'readline-sync';
import fs from 'fs';
import chalk from 'chalk';
import * as myMenu from './myMenu.js'
import * as myAdmin from './myAdmin.js'
import * as myGame from './myGame.js'

var defaultMenuChoice;

// default menu with while loop
while (defaultMenuChoice !== '0') {
    myMenu.welcomeMenu();
    defaultMenuChoice = readLineSync.question(chalk.blueBright("Select Option? (1, 2, 3, 0): "));
    switch (defaultMenuChoice.toLowerCase()) {
        case '1':
            playGame();
            break;
        case '2':
            adminGame();
            break;
        case '3':
            viewScores();
            break;
        case '0':
            console.log(chalk.redBright("Exiting the Game! "));
            break;
        default:
            console.log(chalk.redBright("Not a valid option! "));
            break;
    }
}
function playGame() {
    // play the game, 15 random questions from 51 base
    // update score, exit if wrong answer, lifelines
    myGame.playPointiareGame();
}
function adminGame() {
    // add, delete, edit and view questions (and exit or say wrong choice)
    myMenu.adminMenu();
    let adminMenuChoice = readLineSync.question(chalk.blueBright("Select Option? (1, 2, 3, 4, 0): "));
    switch (adminMenuChoice.toLowerCase()) {
        case '1':
            // add a question
            myAdmin.add();
            break;
        case '2':
            // delete a question id
            myAdmin.del();
            break;
        case '3':
            // edit a question via id
            myAdmin.edit();
            break;
        case '4':
            // view a question via id
            myAdmin.view();
            break;
        case '0':
            console.log(chalk.redBright("Exiting admin mode! "));
            break;
        default:
            console.log(chalk.redBright("Not a valid option! "));
            break;
    }
}
function viewScores() {
    // read scores.text remove last element, sort by score while splitting and reverse to show highest to lowest
    let scoresLines = fs.readFileSync("scores.txt").toString().split("\n");
    scoresLines.pop();
    scoresLines.sort((a, b) => a.split(" | ")[1] - b.split(" | ")[1]);
    scoresLines.reverse();
    console.log();
    console.log(chalk.cyanBright("Showing Top Five Scores: "));
    for (let i = 0; i < 5; i++) {
        let parts = scoresLines[i].split(" | ");
        console.log(chalk.magentaBright("Name: " + parts[0] + "\t|\tScore: " + parts[1]));
    }
}