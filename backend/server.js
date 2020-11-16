const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const base64 = require("base-64");
const crypto = require("crypto");
const firebase = require("firebase")

const app = express()
const port = 8800
const moment = require('moment');
//import moment from "../backend/node_modules/moment"
console.log(moment())
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
const dataBase = firebase.database()
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../front"))
/////////datos////////////////////


app.get("/datos69",cors(), (req,res)=>{
  dataBase.ref("Preguntas/")
            .once("value",snapshot =>{
              let obj = snapshot.val()
              res.send(JSON.stringify(obj))
              QuestionRecord = obj
            })
  
})
//funciones JWT
const SECRET = crypto.randomBytes(2048).toString("hex");
function parseBase64(base64String) {
  const parsedString = base64String.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_").toString("base64");
  return parsedString;
}
function encodeBase64(string) {
  const encodedString = base64.encode(string);
  const parsedString = parseBase64(encodedString);
  return parsedString;
}

function decodeBase64(base64String) {
  const decodedString = base64.decode(base64String);
  return decodedString;
}

function hash(string, key = SECRET) {
  const hashedString = parseBase64(crypto.createHmac("sha256", key).update(string).digest("base64"));
  return hashedString;
}

function generateJWT(Payload) {
  const header = {
      "alg": "HS256",
      "typ": "JWT"
  };
  const base64Header = encodeBase64(JSON.stringify(header));
  const base64Payload = encodeBase64(JSON.stringify(Payload));
  const signature = parseBase64(hash(`${base64Header}.${base64Payload}`));

  const JWT = `${base64Header}.${base64Payload}.${signature}`;
  return JWT;
}

function verifyJWT(jwt) {
  const [header, payload, signature] = jwt.split(".");
  if (header && payload && signature) {
      const expectedSignature = parseBase64(hash(`${header}.${payload}`));
      if (expectedSignature === signature)
          return true;
  }
  console.log("No")
  return false;
}

function getJWTInfo(jwt) {
  const payload = jwt.split(".")[1];
  if (payload) {
      try {
          const data = JSON.parse(decodeBase64(payload));
          return data;
      }
      catch (e) {
          return null;
      }
  }
  return null;
}

function encryptPassword(string, salt = crypto.randomBytes(128).toString("hex")) {
  let saltedPassword = hash(salt + string + salt, SECRET);
  return { password: saltedPassword, salt };
}

function verifyPassword(string, realPassword) {
  return encryptPassword(string, realPassword.salt).password === realPassword.password;

}
//////////////////NUEVA PREGUNTA

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


/////////////////////// MODifY SPecific////////////


app.get("/getQuestionSpecific:q",(req,res)=>{
  console.log(req.params)
  let d = req.params
  let {q} = d
  console.log(q)
 let Question = dataBase.ref(`Preguntas/pregunta${q}`)
  Question.once("value",snapshot=>{
     res.send(JSON.stringify(snapshot.val()))
  })
  console.log(Question)
  console.log(req.body)
  console.log()
 //res.send({"message" : "ok"})

})



////////////////MODIFY//////////////////



app.put("/modifyQuestion/:q",async(req,res)=>{
  
  let d = req.params
  let {q} = d
  console.log(q)
   let Question = dataBase.ref(`Preguntas/${q}`)
  let toBeModify = req.body
  let modifyQuestion
  await Question.once("value",snapshot=>{
     modifyQuestion =snapshot.val()
  //   parseJson=JSON.parse(modifyQuestion)
  // parseJson2=JSON.parse(toBeModify)
  Object.keys(modifyQuestion).map(param=>{
    Object.keys(toBeModify).map(modification=>{
      if(param == modification){
        console.log(param)
        Question.update(toBeModify)
      }else(console.log("bailando"))  
    }) 
  }) 
  })
  
  //console.log(modifyQuestion)
  // // console.log(parseJson)
   console.log(toBeModify)
   console.log(modifyQuestion)
  
  res.send({"message" : "ok"})
})



//////////////BORRAR////////////////////////


app.delete("/deleteQuestion/:q",async(req,res)=>{
  let d = req.params
  let {q} = d
  console.log(q)
  question = dataBase.ref(`Preguntas/${q}`)
  question.once("value",snapshot=>{
    contenido = snapshot.val()
    if(contenido){
      question.remove()
      res.send({"sms":"delete"})
    }else{
      res.send({"sms":"eres gilipollas"})
    }
  })
  // question =dataBase.ref(`Preguntas/${q}`)
  // console.log(question) 
  //  res.send({"message" : "Borrado"})
  // .catch(function(error) {
  //   console.log(error)
  // });

 
})


/////////////USER ADM////////////////////////


app.post("/login",(req,res)=>{

  dataBase.ref("User/ADM").once("value",snapshot=>{
   let email = req.body.email
   let pass = req.body.pass
   let JWT = req.cookies.jwt
   
  
   contenido = snapshot.val()
   console.log(contenido.ADM.email)
   console.log(email)
   if(email== "" || pass == ""){
     res.send("Rellene todo los campos, jo puta")
   }else{
    if(email!==contenido.ADM.email){
     
    }
     if(email!==contenido.ADM.email){
       res.send("email incorrecto")
  
      }else{
        if(verifyJWT(JWT)){
          res.send(getJWTInfo(JWT))
          res.redirect("/add.html")
         }else{
           res.clearCookie("jwt")
          res.send("contraseña incorrecta")
         }
      }
   }
  })
  
})
//////REGIRTER//////////////////////////////////////////
app.post("/register",(req,res)=>{
  let newClient = req.body
  const { username, password } = req.body;
  ///comprobar si es mayor de edad
  if(newClient.date > moment().subtract(18, 'years').calendar()){
  console.log(newClient.date)
  
    
  let reference= dataBase.ref("User/Client")
  reference.once("value",snapshot=>{
   let refUsers = snapshot.val() 
  //  console.log(Object.keys(refUsers))
   {
  //  console.log(Object.keys(refUsers))
  //   console.log(Object.values(newClient)[1].email)
  //   console.log(Object.keys(newClient)[1])
    // Object.values(newClient).map((e=>{
    //   // console.log((Object.values(refUsers)[i].email))
      
    //   // let i = -1
    //   // do{
    //   //   console.log("algo");
    //   //   i++
    //   // } while((Object.values(refUsers)[i].email !== e.email && Object.keys(refUsers)[i] !== object) || i < Object.values(refUsers).length)
    //   // if (Object.values(refUsers)[i].email === e.email )
    //   // {
    //   //   i
    //   // }
    //   // // if(Object.values(refUsers)[i].email === e.email){
    //   // //   console.log("hola")
    //   // }else{
    //   //   console.log("la cagas")
    //   //   console.log(e.email)
    //   //   console.log(i)
    //   //   console.log(Object.values(refUsers)[i].email)
      
    //   // }
    //   //   console.log("entra")
    //   // }
    // }))
  }
    Object.values(refUsers).map((e)=>{
    //  console.log("newClient", newClient, Object.keys(refUsers).filter(client => console.log(client)));
   
      if(e.email !== ( Object.values(newClient)[1].email) && !Object.keys(refUsers).filter(client => client === Object.keys(newClient)[1]).length){
        let passwordEncrypt =encryptPassword( password)
        // console.log(Object.values(passwordEncrypt)[0])
        // console.log(Object.values(newClient)[1].email)
        
          reference.child(`${Object.keys(newClient)[1]}`).set(
            {
              email:`${Object.values(newClient)[1].email}`,
              pass:`${Object.values(passwordEncrypt)[0]}`
            }
          ) 

          //No lo entiendo, el porque///

          let JWT = generateJWT({ username, ip: req.ip });
        // console.log(req.ip)
         // res.cookie("jwt", JWT, { httpOnly: true });
            
          //res.redirect("/index.js")
          res.send({ msg: "User has been saved" });
      }
      else {
        console.log("Esto esta fallando")
        res.send("Email o Usuario repetido en nuestra base de datos")
      }
    })
  })
}else{
  res.send("Eres demasiado pequeño")
}
  
 
})
/////lOGIN/////////////////////77777
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let JWT = req.cookies.jwt;
  //As I don't save the username and password, here is the username. Password: "[123]"
  let reference= dataBase.ref("User/Client")
  reference.once("value",snapshot=>{
   let refUsers = snapshot.val() 
   Object.values(refUsers).map((e)=>{
    let realPassword = e.pass
    console.log("entro")
//If a JWT was sent, we check it
      if (JWT) {
        //If the JWT was verified, I sent them the info, if not, clear the cookie
        if (verifyJWT(JWT))
            res.send(getJWTInfo(JWT));
        else {
            res.clearCookie("jwt");
            res.send({ msg: "invalid session" });
            console.log("invalido")
        }
      }
      else {
        //The JWT was not sent, so we are going to try with login and password
        if (verifyPassword(password, realPassword)) {
            let payload = { username, ip: req.ip };
            //If the password is the same as the stored, generate new JWT with info and send it
            JWT = generateJWT(payload);
            res.cookie("jwt", JWT, { "httpOnly": true });
            res.send(payload);
            console.log("existe JWT ")
        }
        else {
            //If not JWT and no correct login sent, don't do nothing
            res.send({ msg: "Incorrect username of password" });
        }
      }
    })
  })
})
/////////////PORT LISTENER//////////////////77
app.listen(port,()=>console.log(`escuchando por el puerto ${port}`))



