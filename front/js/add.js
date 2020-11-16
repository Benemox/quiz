////////////Variables//////////////

//const { features } = require("process")
let container = document.querySelector("body")

let addnew = document.getElementById("addnew")

let Question = document.getElementById("pregunta")

let Opcion1 = document.getElementById("Opcion1")

let Opcion2 = document.getElementById("Opcion2")

let Opcion3 = document.getElementById("Opcion3")

let Opcion4 = document.getElementById("Opcion4")

let answer = document.getElementById("Correct")

let button = document.getElementById("button")


let NewQuestion

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
fetch("http://localhost:8800/newPregunta", {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

  console.log('salgo')    
  
}
)
/// ENSEÑAR PREGUNTAS A MODFICAR Y ELIMINAR////////////////
async function ShowQuestions(){
  let datos = await fetch("http://localhost:8800/datos69")
  let ShowMeQuestions = await datos.json();
 //ShowMeQuestions= Object.values(availableQuestion).sort(() => Math.random() - 0.5);
 //console.log(ShowMeQuestions)
  const list = document.createElement("div")
  list.setAttribute("class","container")
  
  let prueba = Object.keys(ShowMeQuestions)
 
  Object.values(ShowMeQuestions).map((Posibility,i)=>{
      
      let answer = document.createElement("div")
      answer.setAttribute("class", "item")
      
       
         let Npregunta = document.createElement("label")
         Npregunta.htmlFor= `Pregunta`
         Npregunta.setAttribute("id",`${prueba[i]}`)
         answer.appendChild(Npregunta) 
       
    
  
      let edit = document.createElement('button');
      edit.setAttribute('content', 'edit');
      edit.setAttribute('class', 'btnEdit');  
      edit.textContent = 'Editar';

      //BORRAR
      let del = document.createElement('button');
      del.setAttribute('content', 'delete');
      del.setAttribute('class', 'btnDelete');  
      del.textContent = 'Borrar';
     
      //ELEMENTOS DE PREGUNTA
      Object.entries(Posibility).map((e)=>{
      let label = document.createElement("label")
      label.setAttribute("for",`${e[0]}`)
      label.htmlFor= `${e[0]}`
      label.innerHTML = `Correct ${e[0]}`
      let input = document.createElement("input")
      
      input.setAttribute("class",`${e[0]}`)
      input.setAttribute("name", `dataGet`)
      input.setAttribute("placeholder",`${e[1]}`)
      //input.id=``
      answer.appendChild(label)
      answer.appendChild(input)
      
      list.appendChild(answer)
      //Numero Pregunta
       
    }) 
         
         //EDITAR
    answer.appendChild(edit)
    answer.appendChild(del) 
      
      
  })
 container.appendChild(list)
  
}
ShowQuestions()
// MODIFICAR DATOS
let buttons = document.querySelectorAll("#button")

window.addEventListener("click",(e)=>{
  e.preventDefault
 
  button = e.target
  dataToSend = button.parentElement
  das=dataToSend.getElementsByTagName("input")
  labels=dataToSend.getElementsByTagName("label")
  labelQuestion= labels[0].id
  // console.log(das)
  // console.log(labels)
  // console.log(das[1].value)
  // console.log(das[1].placeholder)
  data ={
    question:  ( das[5].value === "" ? das[5].placeholder: das[5].value),
    choice1:    ( das[1].value === "" ? das[1].placeholder: das[1].value),
    choice2:    ( das[2].value === "" ? das[2].placeholder: das[2].value),
    choice3:    ( das[3].value === "" ? das[3].placeholder: das[3].value),
    choice4:    ( das[4].value === "" ? das[4].placeholder: das[4].value),
    answer :    ( das[0].value === "" ? das[0].placeholder: das[0].value)}
  // console.log(data)
  // console.log(dataToSend)
  // console.log(e.target.className)
  console.log(labels)
  
  if(e.target.className === "btnEdit"){
  fetch(`http://localhost:8800/modifyQuestion/${labelQuestion}`, {
    method: 'PUT', 
    headers: {
       
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({
          question:  ( das[5].value === "" ? das[5].placeholder: das[5].value),
          choice1:    ( das[1].value === "" ? das[1].placeholder: das[1].value),
          choice2:    ( das[2].value === "" ? das[2].placeholder: das[2].value),
          choice3:    ( das[3].value === "" ? das[3].placeholder: das[3].value),
          choice4:    ( das[4].value === "" ? das[4].placeholder: das[4].value),
          answer :    ( das[0].value === "" ? das[0].placeholder: das[0].value)})
    })
    .then(response => response.text())
    .then(data => console.log(data));  
  }
  if(e.target.className === "btnDelete"){
      fetch(`http://localhost:8800/deleteQuestion/${labelQuestion}`, {
          method: 'DELETE',
          headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
          },
       //   body: JSON.stringify(labelQuestion)
        }).then(response => response.text())
      .then(data => console.log(data)); 
      } 
})
