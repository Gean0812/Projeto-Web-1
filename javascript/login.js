//CLASSE USUÁRIO
class Usuario {
    constructor(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }
}

//Variáveis do Formulário de Cadastro
var nomeUsu = document.getElementById("nomeId");
var usuarioUsu = document.getElementById("usuarioId");
var senhaUsu = document.getElementById("senhaId");
var formulario = document.getElementById("formCadastro");


//VARIÁVEIS DE LOGIN
var autorizado = false;
var usuarioLogin = document.getElementById("usernameId");
var senhaLogin = document.getElementById("passwordId");
var formularioLogin = document.getElementById("formLogin");

//VARIÁVEIS DOS BOTÕES
var botao1 = document.getElementById("mudarForm1");
var botao2 = document.getElementById("mudarForm2");


botao1.addEventListener("click", function (e) {
    let divLogin = document.getElementById("form1");
    let divCadastro = document.getElementById("form2");

    divLogin.style.display = "none";
    divCadastro.style.display = "block";
})


botao2.addEventListener("click", function (e) {
    let divLogin = document.getElementById("form1");
    let divCadastro = document.getElementById("form2");

    divLogin.style.display = "block";
    divCadastro.style.display = "none";

})



formularioLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    validarLogin();


})




//USANDO A API DE CADASTRO
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    var dados = new Usuario(nomeUsu.value, usuarioUsu.value, senhaUsu.value);

    console.log(dados);

    var url = " https://tads-trello.herokuapp.com/api/trello/users/new";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj)
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Usuário já cadastrado!");

        }
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
})


function validarLogin() {

    var dados1 = {
        "username": document.getElementById("usernameId").value,
        "password": document.getElementById("passwordId").value
    }

    var url1 = " https://tads-trello.herokuapp.com/api/trello/login";
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            console.log("Usuário Válido");
           sessionStorage.setItem("token",JSON.stringify(obj.token));
           window.location = "../html/paginainicial.html";
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Usuário ou senha inválidos");
        }
    }
    xhttp1.open("POST", url1, true);
    xhttp1.setRequestHeader("Content-type", "application/json");
    xhttp1.send(JSON.stringify(dados1));
 

}