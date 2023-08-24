var scoreList = [{ 
    "name": "John", 
    "score": 432 
},
{
    "name": "Joe",
    "score": 125
},
{
    "name": "Zoe",
    "score": 320}
    ,
{
    "name": "Ziggy",
    "score": 532
},
{
    "name": "Dave",
    "score": 211
},
{
    "name": "Sarah",
    "score": 621
},
{
    "name": "Alex",
    "score": 320
}];


scoreList.sort(rankingSorter("score"));


for (let i = 0; i < 5; i++) {
    console.log(scoreList[i]);
}


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

