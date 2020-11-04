////////////Variables//////////////


let addnew = document.getElementById("addnew")

let Question = document.getElementById("pregunta")

let Opcion1 = document.getElementById("Opcion1")

let Opcion2 = document.getElementById("Opcion2")

let Opcion3 = document.getElementById("Opcion3")

let Opcion4 = document.getElementById("Opcion4")

let answer = document.getElementById("Correct")

let button = document.getElementById("button")
let NewQuestion


  // Your web app's Firebase configuration
  var firebaseConfig = {
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

////////////Funciones////
// et Pruebas = firebase.database()
// console.log(Pruebas)


//  function NewCollectionQuestion(){


//     NewQuestion = {
//         "pregunta":{
//             "question": `${Question}`,
//             "choice1": `${Opcion1}`,
//             "choice2": `${Opcion2}`,
//             "choice3": `${Opcion3}`,
//             "choice4": `${Opcion4}`,
//             "answer" : `${answer}`
            
//         }
//     }


//     return  NewQuestion
// }

// function ewQuestion(){ firebase.database().ref("Preguntas/").on("value",snapshot => {
//     let data = snapshot.val();
//     Object.values(data)
// })}
// console.log(ewQuestion()) 


// button.addEventListener("click",(e) =>{
//         e.preventDefault();
//         console.log('entro')    
//         let addnewQuestion  = firebase.database().ref("/Preguntas")

//         addnewQuestion.once("value", (data) => {
//           let length = (data.val() && Object.keys(data.val()).length + 1) || 1;
//           addnewQuestion.child(`pregunta${length}`).set({
//             question:  Question.value,
//             choice1: Opcion1.value,
//             choice2: Opcion2.value,
//             choice3: Opcion3.value,
//             choice4: Opcion4.value,
//             answer : answer.value
//           });
//         })
//         // console.log(addnewQuestion) 
//         // console.log(Math.floor(Math.random() * 999999999 ** 2).toString(16))
//         // let data = ;
//         console.log('salgo')    
        
//    }
// )

button.addEventListener("click",(e) =>{
  e.preventDefault();
  console.log('entro')    
let data = ({
  question:  Question.value,
  choice1: Opcion1.value,
  choice2: Opcion2.value,
  choice3: Opcion3.value,
  choice4: Opcion4.value,
  answer : answer.value})
fetch("http://localhost:5500/newPregunta", {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

  // console.log(addnewQuestion) 
  // console.log(Math.floor(Math.random() * 999999999 ** 2).toString(16))
  // let data = ;
  console.log('salgo')    
  
}
)

