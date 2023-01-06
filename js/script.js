let elementoFormulario = document.querySelector(".js-formulario");
let elementoResultado = document.querySelector(".js-resultado");
let elementoCarregamento = document.querySelector(".js-carregamento");
let elementoResultadoTitulo = document.querySelector(".js-resultado__titulo");
let elementoResultadoDescricao = document.querySelector(".js-resultado__descricao");

//https://api.dicionario-aberto.net/word/cavalo

elementoFormulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //impede de dar o refresh automaticamente

    elementoCarregamento.classList.remove("display-none"); //remove a classe display-none e faz com q o simbolo de carregamento apareça

    let palavra = evento.target[0].value;
    let url = `https://api.dicionario-aberto.net/word/cavalo${palavra}`

    console.log(url);
    //requisição
    fetch(url).then((resposta) => resposta.json())
    .then((resposta) => {
        console.log(resposta);
    })

    .finally(() => {
        elementoCarregamento.classList.add("display-none") //adiciona a classe display-none e remove o simbolo de carregamento
    });
  });