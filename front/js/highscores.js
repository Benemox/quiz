let HighScoreUsers = JSON.parse(localStorage.getItem("highScores")) 



fetch("http://localhost:5500/newPregunta")
console.log(`${HighScoreUsers.length}`)
function BuildAQ(){
    let ranking = document.getElementById("ranking");
    //Texto de la pregunta
   
    //Respuestas
    for (let i = 0; i < HighScoreUsers.length ; i++) {
        
        
        let position = document.createElement("p");
       
        position.innerText = `${HighScoreUsers[i].name} ${HighScoreUsers[i].score} `;
        
        position.className = "username"
       
        ranking.appendChild(position);
    }
}
BuildAQ()

    