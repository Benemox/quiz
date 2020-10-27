
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
let availableQuestion = [];


// The core Firebase JS SDK is always required and must be listed first -->
//TODO: Add SDKs for Firebase products that you want to use
 //    https://firebase.google.com/docs/web/setup#available-libraries -->


  // Your web app's Firebase configuration
 
  const firebaseConfig = {
    apiKey: "AIzaSyB222sWsWflpkab90ilE3sJ2k1Ik5GTPcA",
    authDomain: "quiz-abelabbasi.firebaseapp.com",
    databaseURL: "https://quiz-abelabbasi.firebaseio.com",
    projectId: "quiz-abelabbasi",
    storageBucket: "quiz-abelabbasi.appspot.com",
    messagingSenderId: "177028514079",
    appId: "1:177028514079:web:929399be57267541bef02a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



const Correct_bonus = 10;
const Max_question = 5;
 starGame = async () => {
    questionConuter = 0;
    score = 0;
   // console.log(availableQuestion)
    await getNewQuestion()
}

getNewQuestion = () => {

    if(availableQuestion.length === 0 || questionCounter >= Max_question ){
        localStorage.setItem("mostRecentScore",score)
       
        return window.location.assign("end.html")
        
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

      //  console.log(classToApply)
        getNewQuestion();
    })
    incrementScore = num =>{
        score+=num;
        scoreA.innerText=score
    }
})
function getQuestions(){
  database = firebase.database()
  question1 = database.ref(`Preguntas/`)
  .on('value', snapshot =>{
    let obt = snapshot.val()
    console.log(Object.values(obt))
     Object.values(obt).map(objeto =>{
       availableQuestion.push(objeto)
     })
     starGame()
    
    
  })
  
}

getQuestions()

