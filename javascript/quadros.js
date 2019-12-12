//CLASSE LISTA
class Lista {
    constructor(listName, id) {
        this.listName = listName;
        this.id = id;
    }
    iniciar() {

        let div = document.createElement("div");
        div.setAttribute("class", "card mh-50 col-3 p-0 bg-secondary m-2");
        div.setAttribute("id", " ");

        let div2 = document.createElement("div2");
        div2.setAttribute("class", "card myCard p-0 spn-list");
        div2.setAttribute("style", "width: 15rem;");
        div2.setAttribute("id", this.id);



        let spam = document.createElement("span");
        spam.setAttribute("data-toggle", "modal");
        spam.setAttribute("data-target", "#optListas");
        spam.addEventListener("click", () => {
            let listaInfo = this.id;
            sessionStorage.setItem("listaInfo", JSON.stringify(listaInfo));



        })


        let btnCard = document.createElement("div");
        btnCard.setAttribute("class", "card text-white bg-info mb-3");
        btnCard.setAttribute("style", "width: 15rem;");
        btnCard.setAttribute("id", " ");
        btnCard.setAttribute("data-toggle", "modal");
        btnCard.setAttribute("data-target", "#modalCards");
        btnCard.addEventListener("click", () => {
            let listaInfo = this.id;
            sessionStorage.setItem("listaInfo", JSON.stringify(listaInfo));



        })

        let texto = document.createTextNode(this.listName);
        let textoCard = document.createTextNode("+add novo card");



        spam.appendChild(texto);
        btnCard.appendChild(textoCard);
        div2.appendChild(spam);
        div.appendChild(div2);
        div.appendChild(btnCard);



        buscarCards(this.id, div2);
        return div;

    }
}

//=====================================================================================================

//VARIÁVEIS

//Lista
var novaLista = document.getElementById("novaLista");
var formLista = document.getElementById("formNovaLista");
var exibirForm = document.getElementById("criarListas");
var btnCancelar = document.getElementById("cancelarLista");
var listaDesc = document.getElementById("listaDesc");
var btnEnviar = document.getElementById("enviarLista");
var exibirLista = document.getElementById("lugar-de-exibir-listas");
var arrayDeListas;

//sessin storage do quadro
var quadroInfo = JSON.parse(sessionStorage.getItem("quadroInfo"));

//token
var token = JSON.parse(sessionStorage.getItem("token"));

//variáveis para as opçoes do quadro
var btnRemoverQuadro = document.getElementById("removerQuadro");
var formMudaCor = document.getElementById("formNovaCor");
var novaCor = document.getElementById("colorQuadro");
var novoNomeBoard = document.getElementById("novoNomeQuadro");

//variáveis para as opçoes da Lista
var formNovoNome = document.getElementById("formNovoNome");
var formRenomearLista = document.getElementById("formRenomearLista");
var formExcluirLista = document.getElementById("formExcluirLista");
var novoListaNome = document.getElementById("novoNomeLista");

//Variáveis das opçoes do card
var comentarioCard = document.getElementById("comentarioCard");
var formComentario = document.getElementById("formComentario");
var novaDataDoCard = document.getElementById("dataCard");
var formNovaDataCard = document.getElementById("cardInfoData");
var btnRemoverCard = document.getElementById("removerCard");
var novoNomeCard = document.getElementById("novoNomeCard");

//variáveis das tags
var tagDanger = document.getElementById("22");
var tagInfo = document.getElementById("2");
var tagWarning = document.getElementById("32");
var tagSuccess = document.getElementById("12");
var listaTags = document.getElementById("lugar-para-exibir-tags");
var arrayDeTags;


//session storage do card
var idCard = JSON.parse(sessionStorage.getItem("infoCard"));

//lugar para exibir os comentários
var lugarComents = document.getElementById("lugar-para-exibir-comentarios");

//variavel do botao logout
var logout = document.getElementById("btnLogout");


//VARIÁVEIS DO CARD

var btnEnviarCard = document.getElementById("enviarCard");
var formCard = document.getElementById("formNovoCard");
var cardDesc = document.getElementById("cardDesc");
var cardData = document.getElementById("cardData");
var listaInfo;
var arrayDeCards;
var arrayDeComentarios;

//=======================================================================================================

//EVENT LISTENNERS


//sair da Conta
logout.addEventListener("click", function(){
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    window.location = "../html/index.html";
});

formLista.addEventListener("submit", function (e) {
    e.preventDefault();
    criarList();
})

btnRemoverQuadro.addEventListener("click", function (e) {
    e.preventDefault();
    removeQuadro();
})

formCard.addEventListener("submit", function (e) {
    e.preventDefault();
    criarCard();
})
formMudaCor.addEventListener("submit", function (e) {
    e.preventDefault();
    mudarCor();
})

formNovoNome.addEventListener("submit", function (e) {
    e.preventDefault();
    renomearQuadro();
})

formRenomearLista.addEventListener("submit", function (e) {
    e.preventDefault();
    renomearLista();
})

formExcluirLista.addEventListener("submit", function (e) {
    e.preventDefault();
    removerLista();
})

comentarioCard.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        inserirComentario(document.querySelector('[idDoCard]').getAttribute('idDoCard'), this.value);
        this.value = "";


    }
})

formComentario.addEventListener("submit", function (e) {
    e.preventDefault();
})

formNovaDataCard.addEventListener("submit", function (e) {
    e.preventDefault();
    mudarDataCard();
})

btnRemoverCard.addEventListener("click", function (e) {
    e.preventDefault();
    deletarCard();

})

novoNomeCard.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        renomearCard();

    }
})

tagDanger.addEventListener("click", function (e) {
    e.preventDefault();
    criarTag(this);

})

tagInfo.addEventListener("click", function (e) {
    e.preventDefault();
    criarTag(this);

})

tagWarning.addEventListener("click", function (e) {
    e.preventDefault();
    criarTag(this);

})

tagSuccess.addEventListener("click", function (e) {
    e.preventDefault();
    criarTag(this);

})


//==============================================================================================

//FUNÇOES

//FUNÇÃO PARA CRIAR UMA LISTA
function criarList() {
    var list = {
        "name": document.getElementById("listaDesc").value,
        "token": token,
        "board_id": quadroInfo.id

    }


    var url4 = "https://tads-trello.herokuapp.com/api/trello/lists/new";
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            alert("lista criada");


            let novaaLista = new Lista(obj.name, obj.id).iniciar();


            exibirLista.appendChild(novaaLista);

            console.log(list);
            console.log(arrayDeListas);


        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao criar Lista");
        }
    }
    xhttp4.open("POST", url4, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.send(JSON.stringify(list));


}


//FUNÇAO PARA EXIBIR AS LISTAS
function exibirListas() {

    var url = "https://tads-trello.herokuapp.com/api/trello/lists/" + token + "/board/" + quadroInfo.id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arrayDeListas = JSON.parse(this.responseText);

            for (let index = 0; index < arrayDeListas.length; index++) {
                let novLista = new Lista(arrayDeListas[index].name, arrayDeListas[index].id).iniciar();
                exibirLista.appendChild(novLista);

            }

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(url));

}


//Funçao para renomear a Lista
function renomearLista() {

    let newNomeLista = {
        "list_id": JSON.parse(sessionStorage.getItem("listaInfo")),
        "name": novoNomeLista.value,
        "token": token

    }

    console.log(newNomeLista);


    var url = "https://tads-trello.herokuapp.com/api/trello/lists/rename";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            alert("nome alterado");
            window.location.reload();


        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newNomeLista));


}


//Funçao para excluir uma lista

function removerLista() {

    let removeLista = {
        "list_id": JSON.parse(sessionStorage.getItem("listaInfo")),
        "token": token
    }
    let removerLista = confirm("Deseja excluir a lista?");

    if (removerLista == true) {

        var url2 = "https://tads-trello.herokuapp.com/api/trello/lists/delete";
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("lista removida");
                window.location.reload();




            } else if (this.readyState == 4 && this.status == 400) {

            }
        }
        xhttp2.open("DELETE", url2, true);
        xhttp2.setRequestHeader("Content-type", "application/json");
        xhttp2.send(JSON.stringify(removeLista));



    }


}


//FUNÇAO PARA DELETAR UM QUADRO

function removeQuadro() {

    let remov = {
        "board_id": quadroInfo.id,
        "token": token
    }
    let remover = confirm("Deseja excluir o board?");

    if (remover == true) {

        var url2 = "https://tads-trello.herokuapp.com/api/trello/boards/delete";
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("quadro removido");
                window.location = "../html/paginainicial.html";




            } else if (this.readyState == 4 && this.status == 400) {

            }
        }
        xhttp2.open("DELETE", url2, true);
        xhttp2.setRequestHeader("Content-type", "application/json");
        xhttp2.send(JSON.stringify(remov));



    }


}


//Funçao para Renomear um quadro

function renomearQuadro() {


    let newNome = {
        "board_id": quadroInfo.id,
        "name": novoNomeBoard.value,
        "token": token

    }

    console.log(newNome);

    var url = "https://tads-trello.herokuapp.com/api/trello/boards/rename";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            window.location = "paginainicial.html";


        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newNome));
}

//Funçao para criar um card
function criarCard() {
    listaInfo = JSON.parse(sessionStorage.getItem("listaInfo"));
    console.log("card ," + listaInfo)
    let cartao = {
        "name": cardDesc.value,
        "data": cardData.value,
        "token": token,
        "list_id": listaInfo

    }

    var url = "https://tads-trello.herokuapp.com/api/trello/cards/new"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(url);
            console.log(quadroInfo);
            var obj2 = JSON.parse(this.responseText);

            exibirCard(document.getElementById(obj2.trelloListId), obj2);
            alert("Card criado");


        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(cartao));

}

//Funçao para exibir os cards

function buscarCards(listaInfo, div2) {
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/" + token + "/list/" + listaInfo;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            arrayDeCards = JSON.parse(this.responseText);

            for (let index = 0; index < arrayDeCards.length; index++) {
                exibirCard(div2, arrayDeCards[index])
            }

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(url));

}

//funçao para mudar a cor do quadro

function mudarCor() {

    let newCor = {
        "board_id": quadroInfo.id,
        "color": novaCor.value,
        "token": token

    }

    console.log(newCor);

    var url = "https://tads-trello.herokuapp.com/api/trello/boards/newcolor";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            window.location = "paginainicial.html";


        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newCor));
}

//Funçao auxiliar para exibir os cards

function exibirCard(element, card) {

    let novoCard = document.createElement("div");
    novoCard.setAttribute("class", "card text-white bg-dark mb-3");
    novoCard.setAttribute("style", "width: 15rem;");
    novoCard.setAttribute("id", card.id);

    var spamCard = document.createElement("span");
    spamCard.innerHTML = card.name;

    novoCard.appendChild(spamCard);
    element.insertAdjacentElement("afterend", novoCard);

    novoCard.setAttribute("data-toggle", "modal");
    novoCard.setAttribute("data-target", "#cardDentro");

    novoCard.addEventListener("click", function () {
        alterarModalCard(card);

        let infoCard = {
            "id": card.id,
            "data": card.data,
            "name": card.name
        }
        sessionStorage.setItem("infoCard", JSON.stringify(infoCard));

        listarComentarios(card);
        exibirTags(card);



    });

}

//Funçao para exibir as informaçoes do card no modal
function alterarModalCard(card) {

    var modalCard = document.getElementById("cardDentro");
    modalCard.setAttribute("idDoCard", card.id);


    var tituloCard = document.getElementById("tituloCard");
    tituloCard.innerText = card.name;

    var dataCard = document.getElementById("exibirDataAtual");
    dataCard.innerText = "Data do Card: " + card.data;

    console.log(card);


}

//Funçao para inserir um comentário no card

function inserirComentario(card, comentarioCard) {

    let novoComentario = {
        "card_id": card,
        "comment": comentarioCard,
        "token": token

    }

    var url4 = "https://tads-trello.herokuapp.com/api/trello/cards/addcomment";
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            alert("comentário adicionado");

            let li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.innerHTML = obj.comment;

            lugarComents.appendChild(li);

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao criar comentário");
        }
    }
    xhttp4.open("POST", url4, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.send(JSON.stringify(novoComentario));

}

//Funçao para Listar os Comentários do card
function listarComentarios(idCard) {

    var url4 = "https://tads-trello.herokuapp.com/api/trello/cards/" + token + "/" + idCard.id + "/comments";
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            arrayDeComentarios = JSON.parse(this.responseText);
            lugarComents.innerHTML = "";
            for (let index = 0; index < arrayDeComentarios.length; index++) {

                let novoComent = arrayDeComentarios[index].comment;
                let li = document.createElement("li");
                li.setAttribute("class", "list-group-item");
                li.innerHTML = novoComent;
                lugarComents.appendChild(li);
            }
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao exibir comentário");
        }
    }
    xhttp4.open("GET", url4, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.send(JSON.stringify(url4));

}


//Funçao para alterar a data de um card

function mudarDataCard() {

    let novaData = {
        "token": token,
        "card_id": idCard.id,
        "data": novaDataDoCard.value

    }

    console.log(novaData);

    var url = "https://tads-trello.herokuapp.com/api/trello/cards/newdata";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            alert("Data do card alterada!");
            window.location.reload();


        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(novaData));

}


//Funçao para deletar um card

function deletarCard() {

    let removeCard = {
        "card_id": idCard.id,
        "token": token
    }
    let remover = confirm("Deseja excluir o card?");

    if (remover == true) {

        var url2 = " https://tads-trello.herokuapp.com/api/trello/cards/delete";
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Card removido!");
                window.location.reload();




            } else if (this.readyState == 4 && this.status == 400) {

            }
        }
        xhttp2.open("DELETE", url2, true);
        xhttp2.setRequestHeader("Content-type", "application/json");
        xhttp2.send(JSON.stringify(removeCard));



    }

}

//Funçao para renomear um card

function renomearCard() {

    let newNomeCard = {
        "token": token,
        "card_id": idCard.id,
        "name": novoNomeCard.value
    }


    var url = "https://tads-trello.herokuapp.com/api/trello/cards/rename";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            alert("card renomeado");
            window.location.reload();


        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newNomeCard));


}


//Funçao para criar uma tag dentro do card
function criarTag(tag) {

    console.log(idCard);
    let novaTag = {

        "card_id": idCard.id,
        "tag_id": tag.id,
        "token": token

    }


    var url4 = "https://tads-trello.herokuapp.com/api/trello/cards/addtag";
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            alert("tag adicionada");

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao criar tag");
        }
    }
    xhttp4.open("POST", url4, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.send(JSON.stringify(novaTag));


}

//Funçoes para exibir as Tags de um card

function exibirTags(idCard){

    var url4 = "https://tads-trello.herokuapp.com/api/trello/cards/"+token+"/"+idCard.id+"/tags";
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            arrayDeTags = JSON.parse(this.responseText);
            console.log(arrayDeTags)
            listaTags.innerHTML = "";

            for (let index = 0; index <arrayDeTags.length; index++) {

                let li = document.createElement("li");
                li.style.width = "3rem";
                li.style.height ="2rem";
                li.setAttribute("class", "p-0 list-inline-item m-1")
                let div = document.createElement("div");
                div.setAttribute("class", "w-100 h-100 rounded");
                div.style.backgroundColor = arrayDeTags[index].color
                li.appendChild(div);

                listaTags.appendChild(li);

            }

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao exibir comentário");
        }
    }
    xhttp4.open("GET", url4, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.send(JSON.stringify(url4));

}