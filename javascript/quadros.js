//CLASSE LISTA
class Lista {
    constructor(listName, id) {
        this.listName = listName;
        this.id = id;
    }
    iniciar() {

      //  let td = document.createElement("td");

        let div = document.createElement("div");
        div.setAttribute("class", "card mh-50 col-3 p-0 bg-secondary m-2");
        div.setAttribute("id", " ");

        let div2 = document.createElement("div2");
        div2.setAttribute("class", "card myCard p-0 spn-list");
        div2.setAttribute("style", "width: 15rem;");
        div2.setAttribute("id", this.id);
        


        let spam = document.createElement("span");


       let btnCard = document.createElement("div");
       btnCard.setAttribute("class","card text-white bg-info mb-3");
       btnCard.setAttribute("style","width: 15rem;");
       btnCard.setAttribute("id"," ");
       btnCard.setAttribute("data-toggle", "modal");
       btnCard.setAttribute("data-target","#modalCards");
       btnCard.addEventListener("click",()=> {
           let listaInfo = this.id;
           sessionStorage.setItem("listaInfo",JSON.stringify(listaInfo));
          
        
           
        })

        let texto = document.createTextNode(this.listName);
        let textoCard = document.createTextNode("+add novo card");



        spam.appendChild(texto);
        btnCard.appendChild(textoCard);
        div2.appendChild(spam);
        div.appendChild(div2);
        div.appendChild(btnCard);

       

       buscarCards(this.id,div2);
        return div;

    }
}

//=====================================================================================================

//VARIÁVEIS
var novaLista = document.getElementById("novaLista");
var formLista = document.getElementById("formNovaLista");
var exibirForm = document.getElementById("criarListas");
var btnCancelar = document.getElementById("cancelarLista");
var listaDesc = document.getElementById("listaDesc");
var btnEnviar = document.getElementById("enviarLista");
var exibirLista = document.getElementById("lugar-de-exibir-listas");
var arrayDeListas;
var quadroInfo = JSON.parse(sessionStorage.getItem("quadroInfo"));
var token = JSON.parse(sessionStorage.getItem("token"));
var btnRemoverQuadro = document.getElementById("removerQuadro");
var formMudaCor = document.getElementById("formNovaCor");
var novaCor = document.getElementById("colorQuadro");


//VARIÁVEIS DO CARD

var btnEnviarCard = document.getElementById("enviarCard");
var formCard = document.getElementById("formNovoCard");
var cardDesc = document.getElementById("cardDesc");
var cardData = document.getElementById("cardData");
var listaInfo;
var arrayDeCards;

//=======================================================================================================

//EVENT LISTENNERS
// novaLista.addEventListener("click", function () {

//     exibirForm.style.display = "block";


// })

// btnCancelar.addEventListener("click", function (e) {
//     e.preventDefault();
//     exibirForm.style.display = "none";
// })

formLista.addEventListener("submit", function (e) {
    e.preventDefault();
    criarList();
})

btnRemoverQuadro.addEventListener("click",function(e){
    e.preventDefault();
    removeQuadro();
})

formCard.addEventListener("submit",function(e){
    e.preventDefault();
    criarCard();
})
 formMudaCor.addEventListener("submit",function(e){
    e.preventDefault();
    mudarCor();
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
                let novLista = new Lista(arrayDeListas[index].name,arrayDeListas[index].id).iniciar();
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


//FUNÇAO PARA DELETAR UM QUADRO

function removeQuadro (){

    let remov = {
        "board_id" : quadroInfo.id,
        "token" : token
    }
    let remover = confirm("Deseja excluir o board?");
            
    if(remover == true){

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

 function criarCard(){
    listaInfo = JSON.parse(sessionStorage.getItem("listaInfo"));
    console.log("card ,"+listaInfo)
    let cartao = {
        "name": cardDesc.value,
        "data": cardData.value,
        "token" : token,
        "list_id" : listaInfo

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

function buscarCards(listaInfo,div2){
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/"+ token +"/list/" +listaInfo;
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


function mudarCor (){

    let newCor = {
        "board_id" : quadroInfo.id,
        "color" : novaCor.value,
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


function exibirCard(element, card){

    let novoCard = document.createElement("div");
    novoCard.setAttribute("class","card text-white bg-dark mb-3"); 
    novoCard.setAttribute("style","width: 15rem;");
    novoCard.setAttribute("id", card.id);
    
    var spamCard = document.createElement("span");
    spamCard.innerHTML= card.name;

    novoCard.appendChild(spamCard);
    element.insertAdjacentElement("afterend",novoCard);

}
