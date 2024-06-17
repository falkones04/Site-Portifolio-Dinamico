document.addEventListener("DOMContentLoaded", function () {
    let data = [];

    fetch('https://api.github.com/users/falkones04')
        .then(res => res.json())
        .then(jsonData => {
            data = jsonData;
            mostrarperfil(data);
        })
        .catch(error => console.error("Erro ao buscar dados JSON:", error));

    async function mostrarperfil(dados) {
        const tela = document.getElementById("DataGithub");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<p>${dados.login}</p>`; 
        tela.appendChild(newDiv);
    }
});
