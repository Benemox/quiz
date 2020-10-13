
const username = document.getElementById("username")
const finalScore = document.getElementById("finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore")
const saveScoreBtn = document.querySelector("#saveScoreBtn")
//localStorage.setItem("highScoresUsers",[])
console.log(saveScoreBtn)

finalScore.innerText = mostRecentScore;


let HighScoreUsers = JSON.parse(localStorage.getItem("highScores")) || []




username.addEventListener("keyup", () =>{
    saveScoreBtn.disabled = !username
})


saveScoreBtn.addEventListener('submit', function(evt){ 
    evt.preventDefault();
    console.log(mostRecentScore)
    console.log(name.value)
    let Score = {
        score: mostRecentScore,
        name : username.value
    }
    console.log(Score)
    localStorage.setItem("highScores",JSON.stringify(HighScoreUsers))
    HighScoreUsers.push(Score)
})

