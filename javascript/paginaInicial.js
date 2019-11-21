//CLASSE QUADRO
class Quadro {
    constructor(name, color, id) {
        this.name = name;
        this.color = color;
        this.id = id;
    }
    iniciar() {
        let div = document.createElement("div");
        div.setAttribute("class", "card mh-30 col-3  p-0 m-2","style: width 40px;");
        div.setAttribute("id", "div12 ");

        let div2 = document.createElement("div2");
        div2.setAttribute("class", "card myCard mh-30 col-3  p-0 m-2 spn-list");
        div2.setAttribute("style", "");
        div2.setAttribute("id", this.id);

        let spam = document.createElement("span");
        spam.setAttribute("class", "border:none");
        spam.style.backgroundColor = this.color;


        let texto = document.createTextNode(this.name);

        div.style.backgroundColor = this.color;

        spam.appendChild(texto);
        div2.appendChild(spam);
        div.appendChild(div2);

        div.addEventListener("click",()=> {
            let quadroInfo = {
                "id": this.id,
                "token": token,
                "color":this.color,
                "name":this.name
            } 
            sessionStorage.setItem("quadroInfo",JSON.stringify(quadroInfo));
            window.location = "quadros.html";
            console.log("xd")
        })



        return div;

    }
}


//===============================================================================================================

//VARIÁVEIS DO QUADRO
var nomeQ = document.getElementById("nomeQuadro");
var colorQ = document.getElementById("colorQuadro");
var criarQuadro = document.getElementById("formQuadro");
var listaDeQuadros = document.getElementById("listaDeQuadros");
var logout = document.getElementById("btnLogout");
var quadrosApi;


//==================================================================================================================

//EVENT LISTENNERS

listaDeQuadros.addEventListener("click", function (e) {
    e.preventDefault();
    var cadastroQuadros = document.getElementById("cadastroQuadros").style.display = "block";
})

//sair da Conta
logout.addEventListener("click", function(){
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    window.location = "../html/index.html";
});

//===================================================================================================================


//PEGANDO O TOKEN
//SE ESTIVER COMO ESTÁ ABAIXO E DER ERRO NA FUNÇÃO QUE PASSA O TOKEN PODE SER PQ ESTÁ COM ASPAS,CASO ESTEJA COM ASPAS TEM QUE DAR O PARSE
console.log(sessionStorage.getItem("token"));
const token = JSON.parse(sessionStorage.getItem("token"));
console.log(token);

criarQuadro.addEventListener("submit", function (e) {
    e.preventDefault();

    novoQuadro();

})



// =========================================================================================================


//FUNÇÕES DA PÁGINA INICIAL

//FUNÇÃO PARA CRIR O NOVO QUADRO
function novoQuadro() {

    var dados2 = {
        "name": document.getElementById("nomeQuadro").value,
        "color": document.getElementById("colorQuadro").value,
        "token": token
    }
    console.log(dados2);
    var url2 = "https://tads-trello.herokuapp.com/api/trello/boards/new";
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj2 = JSON.parse(this.responseText);
            console.log(obj2);
            alert("Quadro criado");


            let novoQuadro = new Quadro(obj2.name, obj2.color, obj2.id).iniciar();

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



//FUNÇÃO PARA LISTAR OS QUADROS
function listarQuadros() {

    var url3 = "https://tads-trello.herokuapp.com/api/trello/boards/" + token;
    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(token);
            quadrosApi = JSON.parse(this.responseText);
            console.log(quadrosApi);

            for (let index = 0; index < quadrosApi.length; index++) {

                let novoQuadro = new Quadro(quadrosApi[index].name, quadrosApi[index].color, quadrosApi[index].id).iniciar();
                listaDeQuadros.appendChild(novoQuadro);

            }

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp3.open("GET", url3, true);
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.send(JSON.stringify(url3));


}



