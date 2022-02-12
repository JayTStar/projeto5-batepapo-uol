let nome, userName, codigoErro, destinatario, mensagem, tipo, mensagensData = [], participantesData = [];

const USERNAME = "participants";
const STATUS = "status";
const  MENSAGENS = "messages";
let ESTRUTURAMENSAGENS ;

nome = prompt("Qual seu nome?");
userName = {name: `${nome}`};
requsicao(USERNAME, userName);

setInterval(checaStatus, 5000, STATUS, userName);
setInterval(pegaInfoMsg, 3000);

function requsicao(destino, info){
    let requsicao = axios.post(`https://mock-api.driven.com.br/api/v4/uol/${destino}`, info);
    requsicao.then(pegaInfoMsg);
    requsicao.catch(pegaErro);
}

function checaStatus(destino, info){
    let requsicao = axios.post(`https://mock-api.driven.com.br/api/v4/uol/${destino}`, info);
    requsicao.catch(pegaErro);
}

function pegaInfoMsg(){
    let promessa = axios.get(`https://mock-api.driven.com.br/api/v4/uol/${MENSAGENS}`);
    promessa.then(mostraMensagens);
    promessa.catch(pegaErro);
}

function pegaInfo(destino){
    let promessa = axios.get(`https://mock-api.driven.com.br/api/v4/uol/${destino}`);
    promessa.then(deuCerto);
    promessa.catch(pegaErro);
}

function deuCerto(sinal){
    participantesData = sinal.data;
}
function pegaErro(erro){
 console.log(erro.response);
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

    const mensagensNaTela = document.querySelectorAll("main .msg");
    const tamanho = mensagensNaTela.length;

    mensagensNaTela[tamanho - 1].scrollIntoView;
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