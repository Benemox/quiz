let HighScoreUsers = JSON.parse(localStorage.getItem("highScores")) 

// console.log(`${HighScoreUsers.length}`)
// function BuildAQ(HighScoreUsers){
//     let ranking = document.getElementById("ranking");
//     //Texto de la pregunta
   
//     //Respuestas
//     for (let i = 0; i < HighScoreUsers.length ; i++) {
//         //Contenedor de Preguntas
//         let Ranking = document.createElement("div");
//         console.log(Ranking)
//         //Botones con las opciones
//         let inputs = document.createElement("p");
//         console.log(inputs)
//         //texto de las preguntas 
//         inputs.innerText = `${HighScoreUsers[i].name} ${HighScoreUsers[i].score} `;
//         //atributos botones 
//         console.log(inputs)
//         //Se añade al contenedor
//         Ranking.appendChild(inputs);
//         console.log(Ranking)
//         ranking.appendChild(AnswersContainer);
//     }
// }
// BuildAQ()