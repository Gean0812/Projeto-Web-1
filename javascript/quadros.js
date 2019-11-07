








function renomearQuadro(){

    var url4 = " https://tads-trello.herokuapp.com/api/trello/boards/rename" ;
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            quadrosApi = JSON.parse(this.responseText);
            console.log(quadrosApi);

            for (let index = 0; index < quadrosApi.length; index++) {

                let novoQuadro = new Quadro(quadrosApi[index].name,quadrosApi[index].color,quadrosApi[index].id).iniciar();
                listaDeQuadros.appendChild(novoQuadro);
                
            }

        } else if (this.readyState == 4 && this.status == 400) {
            alert("Erro");
        }
    }
    xhttp4.open("GET", url4, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.send(JSON.stringify(url4));


}