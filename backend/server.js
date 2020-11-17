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
function initDataBase() {
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
app.use(cookieParser());
app.use(express.static(__dirname + "/../front"))
/////////datos////////////////////


app.get("/datos69", cors(), (req, res) => {
  dataBase.ref("Preguntas/")
    .once("value", snapshot => {
      let obj = snapshot.val()
      res.send(JSON.stringify(obj))
      QuestionRecord = obj
    })

})



///////////// FUNtions

// GET PASSWORD

async function GetPassword(refUsers,username){
  let {email ,password} = await Object.values(refUsers[username])
  
  return await password
 }
// Compare Users

function isThereUser(RefUsers, username) {
     let user =  Object.keys(RefUsers).filter(e => e == username) 
  return Object.keys(RefUsers).filter(e => e == username)
}
// Check EMAIL
function checkEmail(RefUsers, email) {
  return Object.values(RefUsers).filter(user => user.email === email).length
}
// Check USERS
function checkUser(RefUsers, name) {
  return Object.keys(RefUsers).filter(client => client === name).length
}
//Check AGE
function checkAge(date, minAge) {
  return (moment(date).calendar() > moment().subtract(minAge, 'years').calendar());
}

const SECRET = "19d9012692957708133d1f93e185ddce12c4544878716414cb1e9f74873753ab64495a96ba4ac18ea5714f0b7d5031ca8aea6bd3f52750596873db702978b3992dc3543f8b384d4d662c5bcba7ce296851fb0129db8dba8031020d9b072b2a4ec17ae6802c65a79c9873f4c61bfe6bc55da1ace12d5b4ea3bea0229bdf0f49a434c9334f6e18a73b47622f4fb53d6896860881d8480a3f4f1b581a79804ace5df7c7d314eb0c0457a0b5c0f1a0aceaedd45c09f1af1d5c3e2be15411d0b482ad1e9472330eb2be449184f29eb1d5338b4fa5cbd4919088d1b76e8316fdc87b116adf6f23a931dd0a11e961faa183b6bfdc64d82301f57f1560fd46da66bf525a0715cde64e04bdcb154613ff1be82e56e989424d2873b821010fb717f2b6ccc6698fecc90a3afe1abc27332b7dd5c81ee9b9740726c8bfc20b906d49de5b553d36ba2a868068de032aa66cb2bab542d0f47bf04c22a1345a951fe05ac63363847ce6c758cabd89cbff1b3576816590829b02769fa2cd3946b4e8aa0fe312b8be59d045045c5f819c72682f09e50e2973a2e678dfc1f7e19dcc9a35e9f2d290dd8adfbde57e08f795054d29b18f4622d41b1c37914bde34b5552954eddd59fdc9bb9216cd5c2736828e0565d691381533e9a80fcc63d44b71075ad2fa09d94dd8a9491a065a3023857ed939cfabfe947f33368c7fba41a2540194554816a0c10bb262499c4a464dce965ea7a56019b1bf304b773e86cbefb223f84509857afe3bde43424598e33eb53baa0acb10945ebae71f8a58604990bd2e430f71a65fdd4a943bdcc54748a21feea5e995845b1136602415c4cfba1321703a63166881a4683bf90e8c41cee15e84beb77fb52504d138296ef9473b0f8e9e350996324e1634fe6ada0b896ecdd727c594a7fa24e248c704135cb242f7778e06fefb341c91180d6234454f6c44e6702532de87768db44b4b28809fc348acdda7c94407d7f0b6c38be84fcb2b47bc9464556ae036a9215fdb33c2d01da229a7d8530a59202b445aa35fb8807b682b8b568c5be71b291daff4b4463b51f7b0eacb2fe2f484b698c231eabaadbd1cdab51a119f1f293ad6118e1965e49c39290d1e9b8ecde46a03546ab18fb7483792f05a970dae125bfcd070ae4ff4a5462de2b7a1073c70d519f8a289da8bba93f5cb1d4e5cad3649c16a8091ad469f26913a84780c98a701f4e759f2fb15cabb73e45e8d8db2c655f8aed484f279291828760f5400710bf55bbe03e087ca6e4616905862050ffebb3aa4a919b23262ac785100823998bba4c585451b6cc786f908fccfd920d9ee50b67c90bdd494c4f36871231778341152508bf989c6fb52b38136ab41556534d162d15646fad4ee8c2af4bb64ba3818e696c34a03ae64e2c854ab1a424b0515fa6316bcf542c2b3c7a542406a9eafbb8c32035f8f7d4f99f230500a65a25956c148af2d2516a951efdbc3ecbd7eea8201b40bbcb096a440d1d392036e78720ce49be411c4966aa4fce0964ee33c03f193fdc88d2ad3634cc9732c1dab5cf17bc9e3cb624dfea5cec472cdaf71c58f67cc09002a677b8b7e2ec51b5dcf7fdcd750888190a21defba6af8a454ee420a7bf2eff130414d32246710d17c955945992946c4c7f1d37ecb7caab24e9dafb99b1e4cd5170263c1d25b4713625236d4f38e29ac18683a16da9313c7587761c08820405b5d37ad0a0bd873e1f55a1f494b951ad693c0117919a913878998d7979d33e38ee176f2c05494076f7b68e3a944555186914c47a92413b002c33ab8e3a68215fa0e61b897ae0c25d40099afc2f066e4a6168efc117af091d95229c10747081cd00ac3d3765b0d2c78ad728e0fe8422c747dc98ebc9ef176459c7c84ea1a230b54607860e23aff62707295c660edefbc6a9412134e0bfe3d5ddc33680e242f4b59933318693770e2328fdd60978b85334d2230d07eba3c091a107672f528e861472120313cd681b83c13036b35c40ddb4cedfa0240edaab7367e55a247c6b2657846d81db3bf7bb9da0eb787782921832e401949a3b41b703be3b93ca93e9460a322b93734c0926e56bec9f6362dd005ec8b21e226886627b836907f7eca259684fd2c4951823d77c27d6fcd9ef40c3893478f10ebfc97bb40c3857695cb74631a059d5337cc383e8a5d5a68f899667cccc99062c4c595f0a3fbda4a51c9652277267da48e3637c08a9b258496bd3737601bec8ccc891e3ba90ca0e1c5ed52d01e82bb3a112fc7f58aa6376045852a6c02564bed7dbd751228c26fbfd8f89ed5d2dcb9c4b824f9e4d9df0adb4f420e577c4b37fdea01ad2ebda83804a174e93ea965dfde2801336c35948488402847889238e9dc9b38fe3946b0dcc70d4a221902f6434b242fd71ab0e0ecdad3b70db7ddf21d27408f84e4a547851ea421a2313e3f4b5422e252802ffa493c5d4d37f6315d007279c7385b4d92c3d86c73ea283a44a78ea6f716ca8c130ae66ad0b528840a0ace323c674aeeffb129b6cef545a90fc781c782fe862a60f6e8e882a0ea3aebb171fa1d670df694ffdcc54d679d10a0a2c2cb934e90df5927430ddda5cc464707b9bfa1868fbc7e60fcd80dea64404ac40d541bb7b98fd5a8a3da14bc4fea0b73e0dc4613207ec4b83201373e82cc4df1681ddd113c600601609beaf55bafe29d7e4c079f4693d30ec630268fa229bee56dbd71eac5665baa749796e737ca5b3721696ab30b4d17288a3e716b13f5a716cff9accd78b406abcf623d6f43a706b7efff82b1e33366c36d9fe3bbb51db607bde5cfa4cf13bfce96e68acc6a4bd37c05eeae901c8de32e44d92ec39472b42ba28fea222d8286805c6816dcce8915978cdaf965846d19210734e05c39"

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
async function GetPassword(refUsers,username){
  let {email ,password} = await Object.values(refUsers[username])
  
  return await password
 }
function verifyPassword(password,username, refUsers) {
  let pass = Object.values(refUsers[username])[1]
  let salt = Object.values(refUsers[username])[2]
  console.log(encryptPassword(password,salt))
  
  console.log("Original" + pass )
  return encryptPassword(password,salt) === pass;
  
}
//////////////////NUEVA PREGUNTA

app.post("/newPregunta/", (req, res) => {
  let addQuestion = dataBase.ref("Preguntas/")
  console.log(req.body)
  addQuestion.once("value", (data) => {
    let length = (data.val() && Object.keys(data.val()).length + 1) || 1
    addQuestion.child(`pregunta${length}`).set({
      question: req.body.question,
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      answer: req.body.answer
    })
    res.send({ "message": "ok" })
  })
})


/////////////////////// MODifY SPecific////////////


app.get("/getQuestionSpecific:q", (req, res) => {
  console.log(req.params)
  let d = req.params
  let { q } = d
  console.log(q)
  let Question = dataBase.ref(`Preguntas/pregunta${q}`)
  Question.once("value", snapshot => {
    res.send(JSON.stringify(snapshot.val()))
  })
  console.log(Question)
  console.log(req.body)
  console.log()
  //res.send({"message" : "ok"})

})



////////////////MODIFY//////////////////



app.put("/modifyQuestion/:q", async (req, res) => {

  let d = req.params
  let { q } = d
  console.log(q)
  let Question = dataBase.ref(`Preguntas/${q}`)
  let toBeModify = req.body
  let modifyQuestion
  await Question.once("value", snapshot => {
    modifyQuestion = snapshot.val()
    //   parseJson=JSON.parse(modifyQuestion)
    // parseJson2=JSON.parse(toBeModify)
    Object.keys(modifyQuestion).map(param => {
      Object.keys(toBeModify).map(modification => {
        if (param == modification) {
          console.log(param)
          Question.update(toBeModify)
        } else (console.log("bailando"))
      })
    })
  })

  //console.log(modifyQuestion)
  // // console.log(parseJson)
  console.log(toBeModify)
  console.log(modifyQuestion)

  res.send({ "message": "ok" })
})



//////////////BORRAR////////////////////////


app.delete("/deleteQuestion/:q", async (req, res) => {
  let d = req.params
  let { q } = d
  console.log(q)
  question = dataBase.ref(`Preguntas/${q}`)
  question.once("value", snapshot => {
    contenido = snapshot.val()
    if (contenido) {
      question.remove()
      res.send({ "sms": "delete" })
    } else {
      res.send({ "sms": "eres gilipollas" })
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


app.post("/login1", (req, res) => {

  dataBase.ref("User/ADM").once("value", snapshot => {
    let email = req.body.email
    let user = req.body.user
    let pass = req.body.pass

    contenido = snapshot.val()
    console.log(contenido.ADM.email)
    console.log(email)
    if (email == "" || pass == "" || user == "") {
      //  let JWT = req.cookies.jwt
      //  if(JWT ===  undefined){
      //    res.send("sin JWT")
      //  }
      res.send("Rellene todo los campos, jo puta")
    } else {
      if (email !== contenido.ADM.email) {
        let a = object.values(contenido.client)
        console.log(a)
        //  if(email=== contenido.client)
        res.send("email incorrecto")

      } else {
        if (verifyJWT(JWT)) {
          res.send(getJWTInfo(JWT))
          res.redirect("/add.html")
        } else {
          res.clearCookie("jwt")
          res.send("contraseña incorrecta")
        }
      }
    }
  })

})


//////REGIRTER//////////////////////////////////////////
app.post("/register", (req, res) => {
  const { email, password, name, date } = req.body;
  console.log(email,password,name,date)
  ///comprobar si es mayor de edad
  console.log("Hola")
  if (checkAge(date, 18)) {
    console.log("Aged")

    let reference = dataBase.ref("User/Client")
    reference.once("value", snapshot => {
      let refUsers = snapshot.val()
      if (!checkEmail(refUsers, email) && !checkUser(refUsers, name)) {

        let passwordEncrypt = encryptPassword(password)

        reference.child(`${name}`).set(
          {
            email: `${email}`,
            pass: `${Object.values(passwordEncrypt)[0]}`,
            salt: `${Object.values(passwordEncrypt)[1]}`
          }
        )
        let JWT = generateJWT({ name, ip: req.ip });

        res.cookie("jwt", JWT, { httpOnly: true });

        res.redirect("/index.html")
        console.log("redirected")
        // res.send({ msg: "User has been saved" });
      }
      else {
        console.log("Esto esta fallando")
        res.send("Email o Usuario repetido en nuestra base de datos")
      }


    })
  } else {
    res.send("Eres demasiado pequeño")
  }


})
/////lOGIN/////////////////////77777



app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //console.log(req.body)
  let JWT = req.cookies.jwt;
   if (JWT) {
         //If the JWT was verified, I sent them the info, if not, clear the cookie
         if (verifyJWT(JWT)) {
          console.log("madre")
          res.send(getJWTInfo(JWT));
          console.log("conseguido")
        }
        else {
          res.clearCookie("jwt");
          res.send({ msg: "invalid session" });
          console.log("invalido")
        }
  }else{
    let reference = dataBase.ref("User/Client")
    reference.once("value", snapshot => {
      let refUsers = snapshot.val()
      if(isThereUser(refUsers, username)){
        console.log(username)
        console.log(password)
        //console.log(isThereUser(refUsers, username))
        verifyPassword(password,username,refUsers)
        res.send({ msg: "valid session" })
      
       //console.log(verifyPassword(password,username,refUsers))
        
      }
    })

  }


})






















   
      
      // Object.values(refUsers).map((e) => {
      //   let realPassword = e.pass
        
      //   else {
      //     //The JWT was not sent, so we are going to try with login and password
      //     if (verifyPassword(password, realPassword)) {
      //       let payload = { username, ip: req.ip };
      //       //If the password is the same as the stored, generate new JWT with info and send it
      //       JWT = generateJWT(payload);
      //       res.cookie("jwt", JWT, { "httpOnly": true });
      //       res.send("hola");
      //       res.redirect("/index.html")
      //       console.log("existe JWT ")
      //     }
      //     else {
      //       //If not JWT and no correct login sent, don't do nothing
      //       res.send({ msg: "Incorrect username of password" });
      //     }
        



/////////////PORT LISTENER//////////////////77
app.listen(port, () => console.log(`escuchando por el puerto ${port}`))



