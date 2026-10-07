// ======================================
// CONFIGURAÇÕES DO SITE
// ======================================

let configuracao = {
    tamanhoFonte: 100,
    linhaAtiva: false,
    leituraAtiva: false,
    linha: null
};


// ======================================
// LEITOR DE TELA
// ======================================

const leitor = window.speechSynthesis;


// ======================================
// ABRIR E FECHAR PAINEL
// ======================================

function AlternarPainel() {

    const painel = document.getElementById("painel-lateral");

    if (painel.classList.contains("aberto")) {

        painel.classList.remove("aberto");

        painel.setAttribute("aria-hidden", "true");

    } else {

        painel.classList.add("aberto");

        painel.setAttribute("aria-hidden", "false");
    }
}


// ======================================
// AUMENTAR TEXTO
// ======================================

function AumentarTexto() {

    if (configuracao.tamanhoFonte < 160) {

        configuracao.tamanhoFonte += 10;

        document.documentElement.style.fontSize =
            configuracao.tamanhoFonte + "%";
    }
}


// ======================================
// DIMINUIR TEXTO
// ======================================

function DiminuirTexto() {

    if (configuracao.tamanhoFonte > 80) {

        configuracao.tamanhoFonte -= 10;

        document.documentElement.style.fontSize =
            configuracao.tamanhoFonte + "%";
    }
}


// ======================================
// ALTO CONTRASTE
// ======================================

function AlternarContraste() {

    document.body.classList.toggle("alto-contraste");
}


// ======================================
// FONTE ACESSÍVEL
// ======================================

function TrocarFonte() {

    document.body.classList.toggle("fonte-dislexia");
}


// ======================================
// PAUSAR ANIMAÇÕES
// ======================================

function PausarAnimacao() {

    document.body.classList.toggle("pausar-animacoes");
}


// ======================================
// GUIA DE LEITURA
// ======================================

function LinhaLeitura() {

    if (!configuracao.linhaAtiva) {

        const linha = document.createElement("div");

        linha.classList.add("linha-guia-leitura");

        document.body.appendChild(linha);

        configuracao.linha = linha;

        configuracao.linhaAtiva = true;

        document.addEventListener(
            "mousemove",
            moverLinha
        );

    } else {

        if (configuracao.linha) {

            configuracao.linha.remove();
        }

        document.removeEventListener(
            "mousemove",
            moverLinha
        );

        configuracao.linha = null;

        configuracao.linhaAtiva = false;
    }
}


// ======================================
// MOVIMENTAR GUIA
// ======================================

function moverLinha(evento) {

    if (configuracao.linha) {

        configuracao.linha.style.top =
            evento.clientY + "px";
    }
}


// ======================================
// INICIAR LEITURA
// ======================================

function IniciarLeitura() {

    if (leitor.speaking) {
        return;
    }

    const conteudo =
        document.getElementById("conteudo-principal");

    if (!conteudo) {
        return;
    }

    const texto =
        conteudo.innerText;

    const fala =
        new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";

    configuracao.leituraAtiva = true;

    fala.onend = function () {

        configuracao.leituraAtiva = false;
    };

    leitor.speak(fala);
}


// ======================================
// PARAR LEITURA
// ======================================

function PararLeitura() {

    if (leitor.speaking || leitor.pending) {

        leitor.cancel();

        configuracao.leituraAtiva = false;
    }
}


// ======================================
// RESTAURAR CONFIGURAÇÕES
// ======================================

function Restaurar() {

    // Voltar tamanho da fonte
    configuracao.tamanhoFonte = 100;

    document.documentElement.style.fontSize =
        "100%";


    // Remover estilos especiais
    document.body.classList.remove(
        "alto-contraste",
        "fonte-dislexia",
        "pausar-animacoes"
    );


    // Parar leitura
    PararLeitura();


    // Remover linha de leitura
    if (configuracao.linhaAtiva) {

        LinhaLeitura();
    }
}
