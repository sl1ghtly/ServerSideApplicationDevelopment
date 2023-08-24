import fs from 'fs';

function displayScores() {
    // get scores in scores.json
    let scoreList = getScores();

    // use rankingSorter by "score" and then reverse to show highest on the top
    scoreList.sort(rankingSorter("score"));

    // display scoreList elements
    for (let i = 0; i < 5; i++) {
        console.log(scoreList[i]);
    }
}

// function to get all the questions in questions.json
function getScores() {
    // read json and pare it into a question list
    let json = fs.readFileSync('./scores.json');
    let scores = JSON.parse(json);
    return scores;
}

// extra sorter function to compare between scores
function rankingSorter(key) {
    return function(a, b) {  
        if (a[key] > b[key]) {  
            return -1;  
        } 
        else if (a[key] < b[key]) {  
            return 1;  
        }  
    }  
}

export { displayScores };