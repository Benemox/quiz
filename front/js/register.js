////////////CAp////////////////////////
//import moment from "moment.js"
const body = document.querySelector("body")
//moment().format(); 

//////////FORM///////////////////
///form
let   form = document.createElement("form"); 
form.setAttribute("method", "post"); 
/////LABEL////
let label = document.createElement("h1")
    
    label.innerText = "Crea tu usuario"
// User name ///
let userName = document.createElement("input")
    userName.setAttribute("type", "text"); 
    userName.setAttribute("name", "FullName"); 
    userName.setAttribute("placeholder", "Full Name"); 
///Email /////
let email = document.createElement("input")
    email.setAttribute("type","email")
    email.setAttribute("name", "Email")
    email.setAttribute("placeholder","Introduce tu email")
//Password
let password= document.createElement("input")
    password.setAttribute("type","password")
    password.setAttribute("placeholder", "Password")
//RepeatPasword
let rPassword= document.createElement("input")
    rPassword.setAttribute("type","password")
    rPassword.setAttribute("placeholder", " Repeat Password")
//Birth
let date = document.createElement("input")
    date.setAttribute("type","date")
    date.setAttribute("name","user_date")
///submit
let submit = document.createElement("button")
    submit.setAttribute("type","submit")
    submit.setAttribute("id","submit")
    submit.innerText = "Enviar"
//Inyection
form.append(label,userName,email,password,rPassword,date,submit)
body.appendChild(form)



body.addEventListener("click",(e)=>{
    e.preventDefault()
    if(e.target.id === "login"){
        window.location.href=e.target.href
    }
    if(e.target.id === "submit"){
        if(e.target.parentNode){
            list = e.target.parentNode
            console.log(list.querySelectorAll("input"))
            parent= list.querySelectorAll("input")
            const [name,email,password,rPassword,date] = [...parent].map(el => el.value);
            if(!name||!email||!password||!rPassword||!date){
               alert("Todos los campos son abligatorios")
            } else {
                const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                if(!regExp.test(email)){
                alert("email no valido")
                }else{
                    if(password!==rPassword){
                        alert("Password no coincide")
                    }else{
                        fetch("http://localhost:8800/register",{
                            method:"POST",
                            headers:{
                                'Content-Type': 'application/json'
                              },
                            body: JSON.stringify( {
                                email,
                                password ,
                                name ,
                                date
                               })
                        })
                        .then(res=>{
                            if(res.redirected){
                                window.location.href=res.url
                            }else{alert(res)}
                        })
                    }
                }
            }
        }
    }
})
  