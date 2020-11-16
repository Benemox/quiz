


document.getElementById("btnEntrar").addEventListener("click",(e)=>{
    e.preventDefault()
    
        const email = document.getElementById("email").value 
        const pass = document.getElementById("pass").value
        
        if(email === "" || pass === ""){
           alert("Rellene todos los campos")
        }else{
           const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            if(!regExp.test(email)){
            alert("email no valido")
            }else{
                fetch("http://localhost:8800/login",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify( {
                        email: `${email}`,
                        pass : `${pass}`
                       })
                })
                .then(res=>res.text())
                .then(data=>{
                    if(data==="You shall not pass"){
                        window.location= "add.html"
                    }else{alert("contraseña y/o email no son correctos")}
                })
            }
         
       }
    
})