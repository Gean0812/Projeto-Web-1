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
       // spam.setAttribute("class", "spn-list");



        let texto = document.createTextNode(this.listName);



        spam.appendChild(texto);
        div2.appendChild(spam);
        div.appendChild(div2);
       // td.appendChild(div);

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

//=======================================================================================================

//EVENT LISTENNERS
novaLista.addEventListener("click", function () {

    exibirForm.style.display = "block";


})

btnCancelar.addEventListener("click", function (e) {
    e.preventDefault();
    exibirForm.style.display = "none";
})

btnEnviar.addEventListener("submit", function (e) {
    e.preventDefault();

})

formLista.addEventListener("onsubmit",function(e){
    e.preventDefault();
})

formLista.addEventListener("submit", function (e) {
    e.preventDefault();
    criarList();
})


//==============================================================================================

//FUNÇOES

//FUNÇÃO PARA CRIAR UMA LISTA
function criarList() {
    var list = {
        "name": document.getElementById("listaDesc").value,
        "token": token,
        "board_id": JSON.parse(sessionStorage.getItem("quadroInfo")).id

    }
    console.log(list);

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
            console.log(url);
            console.log(quadroInfo);
            arrayDeListas = JSON.parse(this.responseText);
            console.log(arrayDeListas);

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