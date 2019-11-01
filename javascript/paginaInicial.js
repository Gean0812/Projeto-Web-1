class Quadro {
    constructor(name,color){
        this.name = name;
        this.color = color;
    }
}


//Variáveis do Quadro
var nomeQ = document.getElementById("nomeQuadro");
var colorQ = document.getElementById("colorQuadro");
var criarQuadro = document.getElementById("formQuadro");

const token = JSON.parse(localStorage.getItem("usuario"));

criarQuadro.addEventListener("submit",function(e){
    e.preventDefault();

    novoQuadro();
})

console.log (sessionStorage.getItem("token"));

function novoQuadro () {

    var dados2 = {
        "name": document.getElementById("nomeQuadro").value,
        "color": document.getElementById("colorQuadro").value,
        "token": sessionStorage.getItem("token")
    }
    console.log(dados2);
    var url2 = "https://tads-trello.herokuapp.com/api/trello/boards/new";
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj2 = JSON.parse(this.responseText);
            console.log(obj2);
            alert("Quadro criado");
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao criar quadro");
        }
    }
    xhttp2.open("POST", url2, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send(JSON.stringify(dados2));


}

    


