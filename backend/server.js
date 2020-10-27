const http = require("http")
const firebase = require("firebase")
const port = 8080
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
let dataBase = firebase.database()



let server = http.createServer((request,response)=>{
    // request.url
    const headers = {
        'Access-Control-Allow-Origin': '*'
      };
    console.log("New Request")
    if(request.url === "/datos69"){
        response.writeHead(200, {...headers, "Content-Type": "application/json"})
        // let json = {
        //     "node" : "js"
        // };
        dataBase.ref(`Preguntas/`)
                .once(`value`,snapshot=>{
                    let obj = snapshot.val()
                    response.write(JSON.stringify(obj))
                    response.end()
                })
    }
    else {
        response.writeHead(404, "Not Found");
        response.end();
    }
    
})
server.listen(port,()=>console.log(`escuchando por el puerto ${port}`))
console.log("hola mundo");