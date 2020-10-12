
const username = document.getElementById("username")
const finalScore = document.getElementById("finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore")
const saveScoreBtn = document.querySelector("#saveScoreBtn")
//localStorage.setItem("highScoresUsers",[])

finalScore.innerText = mostRecentScore;


//let HighScoreUsers = JSON.parse(localStorage.getItem("highScores")) 

let highScoresUsers = [
    {score: 0,
    name : "Patan"}
]
localStorage.setItem("highScores",JSON.stringify(highScoresUsers))


username.addEventListener("keyup", () =>{
    saveScoreBtn.disabled = !username
})


saveScoreBtn.addEventListener("submit", () =>{
    let Score = {
        score: mostRecentScore,
        name : name.value
    }
    localStorage.setItem("highScores",JSON.stringify(HighScoreUsers))
    HighScoreUsers.push(Score)
    
   return console.log(HighScoreUsers)
})

