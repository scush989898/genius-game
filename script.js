const cores = ["verde", "amarela", "vermelha", "azul"];
const arrayFrases = [
  "BEM-VINDO!",
  "OBSERVE A SEQUÊNCIA",
  "AGORA É SUA VEZ, REPITA A SEQUÊNCIA!",
  "ACERTOU, OBSERVE A PRÓXIMA SEQUÊNCIA!",
];

let arrayJogo = [];
let arrayResposta = [];
let record = 0;

let main = document.createElement("main");
document.body.appendChild(main);

let titulo = document.createElement("h1");
main.appendChild(titulo);
titulo.innerHTML = `GENIUS <sup>®</sup>`;

let container = document.createElement("div");
container.setAttribute("id", "container");
main.appendChild(container);

cores.forEach((index) => {
  let botao = document.createElement("div");
  botao.setAttribute("class", "caixa " + index);
  container.appendChild(botao);
  botao.addEventListener("click", RegistrarClickCadaCor);
});

let caixaMensagem = document.createElement("div");
caixaMensagem.setAttribute("class", "caixa-mensagem");
container.appendChild(caixaMensagem);

let mensagem = document.createElement("div");
mensagem.classList.add("modal");
caixaMensagem.appendChild(mensagem);
mensagem.innerText = `${arrayFrases[0]}`;

let BotaoIniciar = document.createElement("button");
BotaoIniciar.innerText = "COMEÇAR";
caixaMensagem.appendChild(BotaoIniciar);
BotaoIniciar.addEventListener("click", comecaJogo);

function RegistrarClickCadaCor(event) {
  let corClicada = event.target.className.slice(6);
  let corClicadaEfeito = [corClicada];
  piscaCoresNaTela(corClicadaEfeito);

  if (
    mensagem.innerText === arrayFrases[1] ||
    mensagem.innerText === arrayFrases[2] ||
    mensagem.innerText === arrayFrases[3]
  ) {
    resposta(corClicada);
  }
}

function resposta(corClicada) {
  arrayResposta.push(corClicada);
  let pontuacao = arrayJogo.length - 1;
  if (arrayJogo.every((element, index) => element === arrayResposta[index])) {
    setTimeout(() => {
      continuaJogo();
    }, 200);
  }
  if (corClicada != arrayJogo[arrayResposta.length - 1]) {
    if (pontuacao > record) {
      record = pontuacao;
    }
    terminaJogo(pontuacao, record);
  }
}

function continuaJogo() {
  arrayResposta = [];
  arrayJogo.push(GeraCorAleatoria());
  mensagem.innerText = `${arrayFrases[3]}`;
  setTimeout(() => {
    piscaCoresNaTela(arrayJogo);
  }, 1000);
}

function terminaJogo(pontuacao, record) {
  if (pontuacao < 0) {
    pontuacao = 0;
  }
  mensagem.innerHTML = `
      <h3>ERROU :(</h3>
      <p>SUA PONTUAÇÃO FOI DE:  ${pontuacao}</p>
      <p>O RECORD ATUAL É DE:  ${record}</p>
      <button id = 'botao-reiniciar'>JOGAR NOVAMENTE</button>
  `;
  botaoReiniciarJogo = document.getElementById("botao-reiniciar");
  mensagem.classList.add("_errado");
  botaoReiniciarJogo.classList.add("_errado");
  botaoReiniciarJogo.addEventListener("click", comecaJogo);
  arrayJogo = [];
  arrayResposta = [];
}

function GeraCorAleatoria() {
  let casaCor = Math.floor(Math.random() * 4);
  return cores[casaCor];
}

function comecaJogo() {
  caixaMensagem.innerHTML = "";
  caixaMensagem.appendChild(mensagem);
  if (mensagem.classList.value.includes("_errado")) {
    mensagem.classList.remove("_errado");
    botaoReiniciarJogo.classList.remove("_errado");
  }

  arrayJogo.push(GeraCorAleatoria());
  mensagem.innerText = `${arrayFrases[1]}`;
  setTimeout(() => {
    piscaCoresNaTela(arrayJogo);
  }, 1000);
}

function piscaCoresNaTela(arrayJogo) {
  arrayJogo.forEach((element, index) => adicionaCorNaTela(element, index));
}

function adicionaCorNaTela(element, index) {
  setTimeout(() => {
    let botaoAleatorio = document.querySelector(`.${element}`);
    botaoAleatorio.setAttribute("id", `${element}`);
    RemoveCorNaTela(element);
    if (index === arrayJogo.length - 1) {
      mensagem.innerText = `${arrayFrases[2]}`;
    }
  }, index * 900);
}

function RemoveCorNaTela(element) {
  setTimeout(() => {
    let botaoAleatorio = document.querySelector(`.${element}`);
    botaoAleatorio.removeAttribute("id");
  }, 250);
}
