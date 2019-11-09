//CLASSE LISTA
class Lista {
    constructor(listName) {
        this.listName = listName;
    }
}


//VARIÁVEIS
var novaLista = document.getElementById("novaLista");
var formLista = document.getElementById("formNovaLista");
var exibirForm = document.getElementById("criarListas");
var btnCancelar = document.getElementById("cancelarLista");
var listaDesc = document.getElementById("listaDesc");
var btnEnviar = document.getElementById("enviarLista");


//EVENT LISTENNERS
novaLista.addEventListener("click",function(){
    
    exibirForm.style.display = "block"; 

    
})

btnCancelar.addEventListener("click" ,function(e){
    e.preventDefault();
    exibirForm.style.display = "none";
})

btnEnviar.addEventListener("submit",function(e){
    e.preventDefault();
    criarList();
})


//FUNÇÃO PARA CRIAR UMA LISTA
function criarList() {
    var list = {
        "name" : listaDesc.value,
        "token" :sessionStorage.getItem("token"),
        "board_id" : JSON.parse(sessionStorage.getItem("quadroInfo")).id

    }
    console.log(list);

    var url4 = " https://tads-trello.herokuapp.com/api/trello/lists/new";
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           var obj = JSON.parse(this.responseText);
            console.log(obj);
            alert("lista criada");



        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao criar Lista");
        }
    }
    xhttp4.open("POST", url4, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.send(JSON.stringify(list));


}