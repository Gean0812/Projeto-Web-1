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
        spam.setAttribute("class", "border:none");
        spam.style.backgroundColor=this.color;


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


criarQuadro.addEventListener("onsubmit",function(e){
    e.preventDefault();
})

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
            
           // window.location = "../html/paginainicial.html";
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro ao criar quadro");
        }
    }
    xhttp2.open("POST", url2, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send(JSON.stringify(dados2));


}


function listarQuadros () {

    var url3 = "https://tads-trello.herokuapp.com/api/trello/boards/:token";
    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj3 = JSON.parse(this.responseText);
            console.log(obj3);

            return listaDeQuadros;

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp3.open("POST", url3, true);
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.send(JSON.stringify(dados2));


}