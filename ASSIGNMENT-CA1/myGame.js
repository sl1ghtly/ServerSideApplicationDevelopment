import readLineSync from 'readline-sync';
import fs from 'fs';
import chalk from 'chalk';

var raw = fs.readFileSync('questions.json');
var questions = JSON.parse(raw);

// function to actually play the game
function playPointiareGame() {
    // generate nums, get player name, set variables to default
    let nums = generateFifteenNumbers();
    console.log();
    let playerName = readLineSync.question(chalk.blueBright("Enter your Player name: "));
    console.log();
    let currentScore = 0;
    let qNum = 0;
    let lifeLines = 3;
    // while loop to show questions
    while(qNum < nums.length) {
        console.log(chalk.cyanBright(questions[nums[qNum]].question));
        console.log(chalk.blueBright("(A) " + questions[nums[qNum]].content[0]));
        console.log(chalk.blueBright("(B) " + questions[nums[qNum]].content[1]));
        console.log(chalk.blueBright("(C) " + questions[nums[qNum]].content[2]));
        console.log(chalk.blueBright("(D) " + questions[nums[qNum]].content[3]));
        console.log(chalk.yellowBright("(H) HELPLINE "));
        console.log(chalk.greenBright("Current Score: " + currentScore));
        let gameMenuChoice = readLineSync.question(chalk.blueBright("Select Option? (A, B, C, D, H): "));
        // if menu choice is correct then give point and increment question Number
        if (gameMenuChoice.toLowerCase() == questions[nums[qNum]].correct) {
            console.log();
            console.log(chalk.greenBright("You Selected the Correct Answer! "));
            currentScore++;
            qNum++;
        }
        // if menu choice is helpline
        else if (gameMenuChoice.toLowerCase() == 'h') {
            // show answer, increment question, score and decerement lifelines
            if (lifeLines > 0) {
                console.log(chalk.yellowBright("You have used a Helpline! "));
                console.log(chalk.yellowBright("Correct Answer: " + questions[nums[qNum]].correct.toUpperCase()));
                console.log();
                lifeLines--;
                currentScore++;
                qNum++;
            }
            else {
                console.log(chalk.yellowBright("You are out of Lifelines! "));
                console.log();
            }
        }
        // if you answer wrong, get kicked out of the game
        else {
            console.log();
            console.log(chalk.redBright("You have selected the wrong answer! Exiting Game! "));
            addScore(playerName, currentScore);
            return;
        }
    }
    addScore(playerName, currentScore);
}

// function to generate 15 random numbers and return them as a list
function generateFifteenNumbers() {
    let fifteenNumbersRandom = [];
    while(fifteenNumbersRandom.length < 15) {
        let ranNum = Math.floor(Math.random() * questions.length) + 1;
        if (fifteenNumbersRandom.indexOf(ranNum) === -1) fifteenNumbersRandom.push(ranNum);
    }
    return fifteenNumbersRandom;
}

function addScore(pName, cScore) {
    // function to save the score into scores.txt
    fs.appendFileSync("scores.txt", pName + " | " + cScore + "\n");
    console.log(chalk.greenBright("Successfully saved score to file! "));
}

export { playPointiareGame }