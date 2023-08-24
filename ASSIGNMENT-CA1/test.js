import fs from 'fs';

// take in already existing elements of scores.json and then parse them into a list
let rawjson = fs.readFileSync('./scores.json');
let scoreList = JSON.parse(rawjson);

// test name and score, edit this to use readfile sync earlier or something
let savingName = "aaron";
let savingScore = 10;

// construct new score object
let newScore = {
    name: savingName,
    score: savingScore
};

// add new object into score list
scoreList.push(newScore);

// stringify score list into a new one
let newScoreList = JSON.stringify(scoreList, null, '\t');

// rewrite everything in score list
fs.writeFileSync('./scores.json', newScoreList);

function save(uname, sscore) {
    // take in already existing elements of scores.json and then parse them into a list
    let scorelist = getScores();
    // construct new score object
    let newScore = {
        name: savingName,
        score: savingScore
    };
    // add new object into score list
    scorelist.push(newScore);
    // stringify score list into a new one
    let newscores = JSON.stringify(scoreList, null, '\t');
    // rewrite everything in score list
    fs.writeFileSync('./scores.json', newscores);

}