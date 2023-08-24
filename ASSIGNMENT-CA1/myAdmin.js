import readLineSync from 'readline-sync';
import fs from 'fs';
import chalk from 'chalk';

// function to add a question
function add() {
    // get all info required
    let questionList = getAllQuestions();
    let newQuestion = readLineSync.question(chalk.blueBright("Add Question: "));
    let addA = readLineSync.question(chalk.blueBright("(A): "));
    let addB = readLineSync.question(chalk.blueBright("(B): "));
    let addC = readLineSync.question(chalk.blueBright("(C): "));
    let addD = readLineSync.question(chalk.blueBright("(D): "));
    let addCorrect = readLineSync.question(chalk.blueBright("(Choose Correct Answer (A, B, C, D)): "));
    // create a question object
    let newContent = {
        question: newQuestion,
        content: [
            addA,
            addB,
            addC,
            addD
        ],
        correct: addCorrect.toLowerCase()
    }
    // add object into question list
    questionList.push(newContent);
    // stringify list of question objects
    let thisNew = JSON.stringify(questionList, null, '\t');
    // rewrite everything in questions.json
    fs.writeFileSync('./questions.json', thisNew);

}

// function to delete a question using index
function del() {
    // get questions list + index to delete
    let questionList = getAllQuestions();
    let index = parseInt(readLineSync.question(chalk.redBright("There are " + questionList.length + ". Choose from 1-" + questionList.length + ": ")));
    console.log();
    // if index is bigger than 1 and less than lenght of question list
    if (index >= 1 && index <= questionList.length) {
        // delete 1 element at index - 1
        questionList.splice(index - 1, 1);
        // stringify list of question objects
        let deletedQuestions = JSON.stringify(questionList, null, '\t');
        // rewrite everything in questions.json
        fs.writeFileSync('./questions.json', deletedQuestions);
    }
    else {
        console.log(chalk.redBright("Question does not exist! "));
    }
}

// function to edit a question using index
function edit() {
    // get questions list + index to edit
    let questionList = getAllQuestions();
    let index = parseInt(readLineSync.question(chalk.yellowBright("There are " + questionList.length + ". Choose from 1-" + questionList.length + ": ")));
    console.log();
    // if index is bigger than 1 and less than lenght of question list
    if (index >= 1 && index <= questionList.length) {
        // get info to edit question and edit the element in the question list
        console.log(chalk.yellowBright("Question: " + questionList[index - 1].question));
        let editQuestion = readLineSync.question(chalk.yellowBright("Edit Question To: "));
        questionList[index - 1].question = editQuestion;
        for (let i = 0; i < 4; i++) {
            console.log(chalk.yellowBright("(A" + (i + 1) +") " + questionList[index - 1].content[i]));
            let ei = readLineSync.question(chalk.yellowBright("Edit (A" + (i + 1) + ") To: "));
            questionList[index - 1].content[i] = ei;
        }
        console.log(chalk.yellowBright("Correct Option: " + questionList[index - 1].correct));
        let editCorrect = readLineSync.question(chalk.yellowBright("Edit Option To: "));
        questionList[index - 1].correct = editCorrect.toLowerCase();
        // stringify list of question objects
        let editedQuestions = JSON.stringify(questionList, null, '\t');
        // rewrite everything in questions.json
        fs.writeFileSync('./questions.json', editedQuestions);
    }
    else {
        console.log(chalk.redBright("Question does not exist! "));
    }

}

// function to view a question using the index
function view() {
    // get questions list + index to view
    let questionList = getAllQuestions();
    let index = parseInt(readLineSync.question(chalk.yellowBright("There are " + questionList.length + ". Choose from 1-" + questionList.length + ": ")));
    console.log();
    // if index is bigger than 1 and less than lenght of question list
    if (index >= 1 && index <= questionList.length) {
        // display info
        console.log(chalk.yellowBright("Question: " + questionList[index - 1].question));
        for (let i = 0; i < 4; i++) {
            console.log(chalk.yellowBright("(A" + (i + 1) + ") " + questionList[index - 1].content[i]));
        }
        console.log(chalk.yellowBright("Correct Answer: " + questionList[index - 1].correct));
    }
    else {
        console.log(chalk.redBright("Question does not exist! "));
    }

}

// function to get all the questions in questions.json
function getAllQuestions() {
    // read json and pare it into a question list
    let rawjson = fs.readFileSync('./questions.json');
    let questions = JSON.parse(rawjson);
    return questions;
}

export { add, del, edit, view };