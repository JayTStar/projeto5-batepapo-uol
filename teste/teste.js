let nome = prompt("Qual seu nome?");

let userName = { Nome: `${nome}`}

let promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", userName);

promessa.then(deuCerto);
promessa.catch(deuErrado);

function deuCerto(){
    console.log("certinho");
}

function deuErrado(){
    console.log("erro")
}