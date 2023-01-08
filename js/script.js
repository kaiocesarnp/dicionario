let elementoFormulario = document.querySelector(".js-formulario");
let elementoResultado = document.querySelector(".js-resultado");
let elementoCarregamento = document.querySelector(".js-carregamento");
let elementoResultadoTitulo = document.querySelector(".js-resultado__titulo");
let elementoResultadoDescricao = document.querySelector(".js-resultado__descricao");


  function erroPalavraNaoEncontrada() { //busca o if !resposta[0]
    elementoResultadoTitulo.textContent ="Palavra não encontrada, verifique a grafia e tente novamente!";
        elementoResultadoDescricao.textContent = "";
  }

  function escondeMostraResultado(mostrar = false){
    if (mostrar){
        elementoResultado.classList.remove("display-none");
        elementoCarregamento.classList.remove("display-none"); //remove a classe display-none e faz com q o simbolo de carregamento apareça
    }else{
        elementoCarregamento.classList.add("display-none"); //adiciona a classe display-none e remove o simbolo de carregamento
    }
  }

  function parserXML(data){
    let resposta = {
        titulo: "",
        descricao: "",
    };
     funcaoDeParseamento = new DOMParser();

     resposta.titulo = funcaoDeParseamento.parseFromString(data, "text/xml")
     .getElementsByTagName("form")[0]
     .getElementsByTagName("orth")[0].textContent;

     resposta.descricao = funcaoDeParseamento.parseFromString(data, "text/xml")
     .getElementsByTagName("sense")[0]
     .getElementsByTagName("def")[0].textContent;

     return resposta;
  }

  function inserirRespostas(objRespostas){
    elementoResultadoTitulo.textContent = objRespostas.titulo;
    elementoResultadoDescricao.textContent = objRespostas.descricao;
  }

  function requisicaoFormulario(palavraParaBuscar){
    let url = `https://api.dicionario-aberto.net/word/${palavraParaBuscar}`;

    //requisição
    fetch(url)
        .then((resposta) => resposta.json())
        .then((resposta) => {
            if(!resposta[0]){ // !resposta[0] = esse exclamação+resp+0 significa  'se não houver palavra identificada' vem o alerta debaixo
            erroPalavraNaoEncontrada();
            return;
        }

    let conteudoParseado = parserXML(resposta[0].xml);
            inserirRespostas(conteudoParseado);
        })

    .finally(() => {
        escondeMostraResultado();
    });
  }

  function gerenciarFormulario(){
    elementoFormulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); //impede de dar o refresh automaticamente
        escondeMostraResultado(true);
        let palavra = evento.target[0].value;
        requisicaoFormulario(palavra);
    
      });
  }

  gerenciarFormulario();