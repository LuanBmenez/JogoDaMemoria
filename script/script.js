let n = 0;
let aleatorio = [];
let anterior = document.querySelector("main");
const main = document.querySelector("main");
let cartaTras;
let cartaFrente;
let trancaMesa = true;
let contaJogadas = 0;
let contaAcertos = 0;
let recomeça;
let tempo = 0;
let relogio;

function nDeCartas(){ 
    do {
        n = parseInt(prompt("Digite a quantidade de cartas (de 4 a 14):"));
    } while (n % 2 !== 0 || n < 4 || n > 14); 
    return n;   
}

function montarJogo(){ 
    main.style.maxWidth = n > 7 ? `calc(${n / 2} * 135px + 134px)` : "96%"; 

    for (let i = 0; i < n; i++) {
        const novaDiv = document.createElement("div");
        novaDiv.classList.add("carta");
        novaDiv.addEventListener("click", () => viraCarta(novaDiv)); 
        main.appendChild(novaDiv); 
    }    
}

function DistribCartas(){ 
    document.querySelectorAll(".carta").forEach((carta, i) => {
        const novaDivTras = document.createElement("div");
        novaDivTras.classList.add("verso");
        novaDivTras.innerHTML = "<img src='assets/back.png' alt='papagaio'></img>";

        const novaDivFrente = document.createElement("div");
        novaDivFrente.classList.add("verso", "carta-frente");
        novaDivFrente.innerHTML = `<img src='assets/${aleatorio[i]}' alt='papagaio'></img>`;

        carta.appendChild(novaDivTras);
        carta.appendChild(novaDivFrente);
    });
}

function viraCarta(elemento){ 
    if (!trancaMesa) return;

    cartaTras = elemento.children[0];
    cartaFrente = elemento.children[1];

    if (verificaCarta(elemento)) {
        cartaTras.classList.toggle("carta-tras-virada");
        cartaFrente.classList.toggle("carta-frente-virada");
    }
}

const embaralha = () => Math.random() - 0.5;

const papagaioAleatorio = () => { 
    const parrotArray = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif' ];
    const tamanho = parrotArray.slice(0, n / 2);
    aleatorio = [...tamanho, ...tamanho].sort(embaralha); 
}

const verificaCarta = (elemento) => { 
    const [cartaTras, cartaFrente] = elemento.children;

    if (cartaTras.classList.contains("carta-tras-virada")) {
        anterior = cartaFrente;
        return false;
    }

    if (anterior.innerHTML !== main.innerHTML) {
        if (anterior.innerHTML === cartaFrente.innerHTML) {
            anterior.parentElement.removeEventListener("click", viraCarta);
            elemento.removeEventListener("click", viraCarta);
            anterior = document.querySelector("main");
            contaAcertos++;
            jogadas();
            return true;
        } else {
            cartaTras.classList.toggle("carta-tras-virada");
            cartaFrente.classList.toggle("carta-frente-virada");
            setTimeout(waitTurn, 1000);
            trancaMesa = false;
            return false;
        }
    }

    anterior = cartaFrente;
    jogadas();
    return true;
}

function waitTurn(){ 
    cartaTras.classList.toggle("carta-tras-virada");
    cartaFrente.classList.toggle("carta-frente-virada");

    const anteriorAtras = anterior.parentElement.children[0];
    anteriorAtras.classList.toggle("carta-tras-virada");
    anterior.classList.toggle("carta-frente-virada");

    anterior = document.querySelector("main");
    trancaMesa = true;
    jogadas();
}

function jogadas(){
    contaJogadas++;
    if (contaAcertos === n / 2) {
        setTimeout(alerta, 1000);
    }
}

function alerta(){ 
    alert(`Você ganhou em ${contaJogadas / 2} jogadas!\nEm ${tempo} segundos!`);
    clearInterval(relogio);
    recomeça = confirm("Você quer jogar novamente?");
    if (recomeça) {
        reiniciarJogo();
        executaJogo();
    }
}

function executaJogo(){
    nDeCartas(); 
    relógio(); 
    montarJogo(); 
    papagaioAleatorio();
    DistribCartas();
}

function reiniciarJogo(){ 
    main.innerHTML = "";
    contaJogadas = 0;
    contaAcertos = 0;
    n = 0;
    tempo = 0;
    anterior = document.querySelector("main");
}

const relógio = () => { 
    relogio = setInterval(timer, 1000);
}

function timer(){
    tempo++;
    document.querySelector("time").innerText = `Tempo percorrido: ${tempo}s`;
}

executaJogo(); 
