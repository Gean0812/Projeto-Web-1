class Quadro {
    constructor(name,color){
        this.name = name;
        this.color = color;
    }
    iniciar(){
        let div = document.createElement("div");
        div.setAttribute("class","container-fluid mh-100");
        div.setAttribute("id"," ");

        let div2 = document.createElement("div2");
        div2.setAttribute("class","card");
        div2.setAttribute("style","width: 15rem;");

        let spam = document.createElement("span");
        spam.setAttribute("class", "border border-dark bg-warning");

        let texto = document.createTextNode(this.name);

        div.style.backgroundColor=this.color;

        spam.appendChild(texto);
        div2.appendChild(spam);
        div.appendChild(div2);

        return div;

    }
}


//Variáveis do Quadro
var nomeQ = document.getElementById("nomeQuadro");
var colorQ = document.getElementById("colorQuadro");
var criarQuadro = document.getElementById("formQuadro");
var listaDeQuadros = document.getElementById("listaDeQuadros");

listaDeQuadros.addEventListener("click",function(e){
    e.preventDefault();
   var cadastroQuadros = document.getElementById("cadastroQuadros").style.display="block";
})


const token = JSON.parse(localStorage.getItem("token"));

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

            let novoQuadro = new Quadro(obj2.name,obj2.color).iniciar();
            listaDeQuadros.appendChild(novoQuadro);
            
            window.location = "../html/paginainicial.html";
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao criar quadro");
        }
    }
    xhttp2.open("POST", url2, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send(JSON.stringify(dados2));


}


function listarQuadros () {




}

    


