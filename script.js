let nome, userName, codigo, destinatario, mensagem, tipo, mensagensData = [], participantesData = [];

const USERNAME = "participants";
const STATUS = "status";
const  MENSAGENS = "messages";
let ESTRUTURAMENSAGENS ;


pegaNome();

setInterval(requsicao, 5000, STATUS, userName);
setInterval(pegaInfo, 3000, MENSAGENS);

function requsicao(destino, info){
    let requsicao = axios.post(`https://mock-api.driven.com.br/api/v4/uol/${destino}`, info);
   
    if(destino === MENSAGENS){
        console.log("requisição mensagens")
        requsicao.then(console.log("requisição mensagens concluida"));
        requsicao.catch(pegaErro);
    }
    if(destino === USERNAME){
        console.log("requisição nome")
        requsicao.then();
        requsicao.catch(pegaNome);
    }
    if(destino === STATUS){
        console.log("requisição status")
        requsicao.then();
        requsicao.catch(pegaErro);
    }
}

function pegaInfo(destino){
    let promessa = axios.get(`https://mock-api.driven.com.br/api/v4/uol/${destino}`);

    if(destino === MENSAGENS){
        promessa.then(mostraMensagens);
        promessa.catch(pegaErro);
    }
    if(destino === USERNAME){
        promessa.then();
        promessa.catch(pegaErro);
    }
}

function pegaErro(erro){
    console.log(erro.response.status);

    codigo = erro.response.status;
}

function mostraMensagens(resposta){

    mensagensData = resposta.data;

    const localMensagens = document.querySelector("main");
    localMensagens.innerHTML = "";

    for(i=0; i < mensagensData.length; i++){

        if(mensagensData[i].type === "status"){
            localMensagens.innerHTML = localMensagens.innerHTML + `
            <div class="msg entrada"> <time> (${mensagensData[i].time}) </time> <p class="contúdo"> <span>${mensagensData[i].from}</span> ${mensagensData[i].text}</p></div>`
        }

        if(mensagensData[i].type === "message" && mensagensData[i].to === "Todos"){
            localMensagens.innerHTML = localMensagens.innerHTML + `
            <div class="msg geral"><time> (${mensagensData[i].time}) </time> <p class="contúdo"> <span>${mensagensData[i].from}</span> para <span>${mensagensData[i].to}: </span>${mensagensData[i].text}</p></div>`
        }

        if(mensagensData[i].type === "message" && mensagensData[i].to === userName.name){
            localMensagens.innerHTML = localMensagens.innerHTML + `
            // <div class="msg reservada"><time> (${mensagensData[i].time}) </time> <p class="contúdo"> <span>${mensagensData[i].from}</span> para <span>${mensagensData[i].to}: </span>${mensagensData[i].text}</p></div>`
        }
    }

        rolagem();
}

function mandaMensagem(){
    ESTRUTURAMENSAGENS ={ from: `${nome}`, to: `${destinatario}`, text: `${mensagem}`, type: `${tipo}`};
    mensagem = document.querySelector("footer input").value;

    console.log(mensagem)

    ESTRUTURAMENSAGENS.from = nome;
    ESTRUTURAMENSAGENS.to = "Todos";
    ESTRUTURAMENSAGENS.text = mensagem;
    ESTRUTURAMENSAGENS.type = "message"

    requsicao(MENSAGENS, ESTRUTURAMENSAGENS);

    document.querySelector("footer input").value = "";
}

function pegaNome(){
    nome ="";
    nome = prompt("Qual seu nome?");
    userName = {name: `${nome}`};
    requsicao(USERNAME, userName);
}

function rolagem(){
    const mensagensNaTela = document.querySelectorAll(".msg");
    const ultimaMensagem = mensagensNaTela[mensagensNaTela.length - 1];

    ultimaMensagem.scrollIntoView({block: "end", behavior: "smooth"});
}