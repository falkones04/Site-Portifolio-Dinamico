document.addEventListener("DOMContentLoaded", function () {
    let data = {};

    fetch('https://api.github.com/users/falkones04/repos')
        .then(res => res.json())
        .then(jsonData => {
            data = jsonData;
            console.log("Dados dos repositórios recebidos:", data);
            mostraRepo(data);
        }).catch(error => console.error("Erro ao buscar dados JSON:", error));

    function mostraRepo(data) {
        const linha = document.getElementById('mostrarrepo');
        const newdiv = document.createElement('div');
        newdiv.className = "col-12";
        const params = new URLSearchParams(location.search);
        const repoId = parseInt(params.get("id"));
        console.log("ID do repositório:", repoId);

        let repositorio = data.find(repo => repo.id === repoId);

        if (repositorio) {
            console.log("Repositório encontrado:", repositorio);
            const formatdata = repositorio.created_at.split("T")[0];

            newdiv.innerHTML = `
                <div class="card ">
                    <div class="card-header fw-bold"><h2>${repositorio.name}</h2></div>
                    <div class="card-body">
                        <p class="fw-bold text-success">Descrição</p>
                        <p>${repositorio.description}</p>
                        <div class="row">
                            <div class="col-9">
                                <p class="fw-bold text-success">Data de criação</p>
                                <p>${formatdata}</p>
                                <p class="fw-bold text-success">Linguagem</p>
                                <p>${repositorio.language||"linguagem não especificada"}</p>
                                <p class="fw-bold text-success">Tópicos</p>
                                ${repositorio.topics.map(topic => `<span class="badge rounded-pill bg-success  mx-2 mb-2 p-2">${topic}</span>`).join('')}
                                <p class="fw-bold text-success">Link de acesso</p>
                                 <a href="${repositorio.html_url}" class=" text-decoration-none fw-bold" target="_blank">
                                <button type="button" class="btn btn-dark text-light p-10 m-2 d-block">
                                    <img class="icon" src="./Assets/Imagens/git.png">
                                   <span>Repositorio</span>
                                </button>
                                </a>
                            </div>
                            <div class="col-sm-12 col-md-3 align-self-start mt-0">
                                <img src="./Assets/Imagens/star.png" class="icon mx-2"><a>${repositorio.stargazers_count}</a>
                                <img src="./Assets/Imagens/fork.png" class="icon mx-2"><a>${repositorio.forks_count}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            linha.appendChild(newdiv);
        } else {
            console.log("Repositório não encontrado");
            newdiv.innerHTML = "<p>Repositório não encontrado.</p>";
            linha.appendChild(newdiv);
        }
    }
});
