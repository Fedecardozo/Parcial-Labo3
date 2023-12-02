/*
Consola 

    npm-v
    npm init -> hace preguntas
    npm init -y -> genera todo automatico
    npm install json-server

    packagejson
    "start":"json-server -w db.json -d2500"

    node -v

    Json-server -> pagina de npm

    explicacion de versionado clase 10 Grabadas por el profe ( minuto 14)

Ajax
    (callback)
    1:16:00
    const URL = "http://localhost:3000/personas";
    
    const getPersonas = () =>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystateChange",()=>{
            if(xhr.readyState == 4)//Respuesta ok
            {
                if(xhr.status >= 200 && xhr.status < 300){
                    const data = JSON.parse(xhr.responseText);
                }
            }
            else
            {

            }
        });
    }

Fetch
    (promesas)
    const URL = "http://localhost:3000/personas";


Axios
    const URL = "http://localhost:3000/personas";


*/
