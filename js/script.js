let elementoFormulario = document.querySelector(".js-formulario");
let elementoResultado = document.querySelector(".js-resultado");
let elementoCarregamento = document.querySelector(".js-carregamento");
let elementoResultadoTitulo = document.querySelector(".js-resultado__titulo");
let elementoResultadoDescricao = document.querySelector(".js-resultado__descricao");

//https://api.dicionario-aberto.net/word/cavalo

elementoFormulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //impede de dar o refresh automaticamente

    escondeMostraResultado(true);

    let palavra = evento.target[0].value;
    let url = `https://api.dicionario-aberto.net/word/cavalo${palavra}`

    console.log(url);
    //requisição
    fetch(url).then((resposta) => resposta.json())
    .then((resposta) => {
        
    if(!resposta[0]){ // !resposta[0] = esse exclamação+resp+0 significa  'se não houver palavra identificada' vem o alerta debaixo
        erroPalavraNaoEcontrada ();
        return;
        }
    let conteudoParseado = parseXML(resposta[0].xml);
    inserirRespostas(conteudoParseado);
    })

    .finally(() => {
        escondeMostraResultado();
    });
  });

  function erroPalavraNaoEcontrada () { //busca o if !resposta[0]
    elementoResultadoTitulo.textContent = "Palavra não encontrada, verifique a grafia e tente novamente!";
        elementoResultadoDescricao.textContent = "";
  }

  function escondeMostraResultado (mostrar = false){
    if (mostrar){
        elementoResultado.classList.remove("display-none");
        elementoCarregamento.classList.remove("display-none"); //remove a classe display-none e faz com q o simbolo de carregamento apareça
    }else{
        elementoCarregamento.classList.add("display-none") //adiciona a classe display-none e remove o simbolo de carregamento
    }
  }

  function parseXML(data){
    let resposta = {
        titulo: "",
        descricao: "",
    };
     funcaoParseamento = new DOMParser();

     resposta.titulo = funcaoParseamento.parseFromString(data, "text/xml")
     .getElementsByTagName("form")[0]
     .getElementsByTagName("orth")[0].textContent

     resposta.descricao = funcaoParseamento.parseFromString(data, "text/xml")
     .getElementsByTagName("sense")[0]
     .getElementsByTagName("def")[0].textContent

     return resposta;
  }

  function inserirRespostas(objRespostas){
    elementoResultadoTitulo.textContent = objRespostas.titulo;
    elementoResultadoDescricao.textContent = objRespostas.descricao
  }

