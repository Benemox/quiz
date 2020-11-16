
// CONST
let QuestionsData
const question = document.getElementById("question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const questionCounterText = document.getElementById("questionCounter")
const scoreA = document.querySelector("#score")
// console.log(question)
// console.log(choices)
// console.log(questionCounterText)
let currentQuestion = {
}
let acceptingAnswer = false;
let scrore = 0;
let questionCounter = 0;
let availableQuestion ;

  async function Ppruebas(){
  let datos = await fetch("http://localhost:8800/datos69")
  availableQuestion = await datos.json();
  availableQuestion= Object.values(availableQuestion).sort(() => Math.random() - 0.5);
 }
 
const Correct_bonus = 10;
const Max_question = 5;
 

//////////////////////////////////////NEW QUESTION REQUEST////////////////////////////////////////////7
/////////////////////////////////////////////////////////////////////////////////////////////////////////
getNewQuestion = () => {

    if(availableQuestion.length === 0 || questionCounter >= Max_question ){
        localStorage.setItem("mostRecentScore",score)

        return window.location.assign("end.html")
        
    }
    console.log(availableQuestion)
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${Max_question}`

   currentQuestion=availableQuestion[0]
   console.log(currentQuestion)
   question.innerText = currentQuestion.question

   choices.map(choice =>{
       const number =choice.dataset["number"];
       choice.innerText = currentQuestion[`choice${number}`]
   })
   availableQuestion.shift(1);
   acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswer)return; 
        acceptingAnswer = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]
            console.log(selectedAnswer)
         let classToApply = "incorrect"
         if (selectedAnswer ==currentQuestion.answer) {
            classToApply = "correct"
         }
        if(classToApply == "correct"){incrementScore(Correct_bonus)}

      //  console.log(classToApply)
        getNewQuestion();
    })
    incrementScore = num =>{
        score+=num;
        scoreA.innerText=score
    }
})


starGame = async () => {
  questionConuter = 0;
  score = 0;
 // console.log(availableQuestion)
  await Ppruebas()
  getNewQuestion()
}

starGame()   


