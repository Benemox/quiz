const question = document.getElementById("question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const questionCounterText = document.getElementById("questionCounter")
const scoreA = document.querySelector("#score")
console.log(question)
console.log(choices)
console.log(questionCounterText)
let currentQuestion = {
}
let acceptingAnswer = false;
let scrore = 0;
let questionCounter = 0;
let availableQuestion = [];


let questions = [
    {
        question: "¿De que color era el caballo blanco de santiago?",
        choice1: "Color Calamar",
        choice2: "Yo que se",
        choice3: "Blanco",
         choice4: "Negro",
        answer :3,
    
    },
    {
        question: "¿De que color era el caballo Negro de santiago?",
        choice1: "Color Calamar",
        choice2: "Yo que se",
        choice3: "Blanco",
        choice4: "Negro",
        answer : 4,
      
    },
    {
        question: "¿De que color era el caballo color Calamar de santiago?",
        choice1: "Color Calamar",
        choice2: "Yo que se",
        choice3: "Blanco",
        choice4: "Negro",
        answer : 1
      

    },
    {
        question: "¿Cuanto es 2 mas 2?",
        choice1: "8",
        choice2: "3",
        choice3: "el mapale",
        choice4: "4",
        answer : 4
        
    },
    {
        question: "¿Quién era el gran ministro británico cuando la India Británica fue sacudida por la hambruna de Bengala?",
        choice1: "Winston Churchill",
        choice2: "Abraham linconm",
        choice3: "EL dalas rebue",
        choice4: "Eric Melgrado",
        answer : 1,
        
    },
    {
        question: "¿Quiénes fueron, según la leyenda, los dos hermanos fundadores de la ciudad de Roma?",
        choice1: "Phineas y Ferb",
        choice2: "Los hermanos grim",
        choice3: "Romulo y Remo",
        choice4: "Calulo y calocha",
        answer : 3,
        
    },
    {
        question: " ¿Cuál es el río más caudaloso del mundo?",
        choice1: "Ebro",
        choice2: "Amazonas",
        choice3: "missisipi-minsuri",
        choice4: "Nilo",
        answer : 2,
        
    },
    {
        question: "¿Cuál es la capital de Brasil?",
        choice1: "Rio de Janeiro",
        choice2: "Wellington",
        choice3: "Brasilia",
        choice4: "Santa FE",
        answer : 3,
        
    },
    {
        question: " ¿Cómo se llama la protagonista de la saga de videojuegos The Legend of Zelda?",
        choice1: "Pichachu",
        choice2: "Zelda",
        choice3: "Capitan",
        choice4: "Link",
        answer : 4,
        
    },
]

const Correct_bonus = 10;
const Max_question = 5;

starGame = () => {
    questionConuter = 0;
    score = 0;
    availableQuestion = [...questions]
    console.log(availableQuestion)
    getNewQuestion()
}

getNewQuestion = () => {

    if(availableQuestion.length === 0 || questionCounter >= Max_question ){
        localStorage.setItem("mostRecentScore",score)
       
        return window.location.assign("/end.html")
        
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${Max_question}`
   const questionIndex = Math.floor(Math.random() *availableQuestion.length);
   currentQuestion=availableQuestion[questionIndex]
   question.innerText = currentQuestion.question

   choices.map(choice =>{
       const number =choice.dataset["number"];
       choice.innerText = currentQuestion[`choice${number}`]
   })
   availableQuestion.splice(questionIndex,1)
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

        console.log(classToApply)
        getNewQuestion();
    })
    incrementScore = num =>{
        score+=num;
        scoreA.innerText=score
    }
})
starGame();