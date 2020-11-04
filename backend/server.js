const express = require ("express")
const firebase = require("firebase")
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
const port = 5500

function initDataBase(){
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
}
initDataBase()

app.use(cors());
app.use(bodyParser.json());

app.get("/datos69",cors(), (req,res)=>{
  dataBase.ref("Preguntas/")
            .once("value",snapshot =>{
              let obj = snapshot.val()
              res.send(JSON.stringify(obj))
            })
  
})

app.post("/newPregunta/",(req,res) => {
  let addQuestion = dataBase.ref("Preguntas/")
  console.log(req.body)
  addQuestion.once("value",(data)=>{
    let length = (data.val() && Object.keys(data.val()).length +1) || 1
    addQuestion.child(`pregunta${length}`).set({
      question : req.body.question,
      choice1  : req.body.choice1,
      choice2  : req.body.choice2,
      choice3  : req.body.choice3,
      choice4  : req.body.choice4,
      answer   : req.body.answer
    })
    res.send({"message" : "ok"})
  })
})



app.listen(port,()=>console.log(`escuchando por el puerto ${port}`))
console.log("hola mundo");







