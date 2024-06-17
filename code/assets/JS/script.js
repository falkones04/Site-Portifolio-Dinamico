document.addEventListener("DOMContentLoaded", function () {
    let data = {};

    fetch('https://api.github.com/users/falkones04')
        .then(res => res.json())
        .then(jsonData => {
            data = jsonData;
            mostrarPerfil(data); 
            return fetch(data.repos_url);
        })
        .then(res => res.json())
        .then(reposData => {
            mostrarRepositorios(reposData); 
            return fetch('./assets/Json/bd.json');
        }).then(res => res.json())
        .then(jsonDados => {
            conteudo = jsonDados.conteudo;
            amigos = jsonDados.amigos;
            MostrarConteudo(conteudo);
            MostrarAmigos(amigos); 
        })
        .catch(error => console.error("Erro ao buscar dados JSON:", error));

    function mostrarPerfil(dados) {
        const sessao1 = document.getElementById("DataSession1");

        let perfilDiv = document.createElement("div");
        perfilDiv.className = "row";

        perfilDiv.innerHTML = `
            <div class="col-12 col-md-3">
                <img src="${dados.avatar_url}" class="img-fluid mb-2" alt="Perfil Image">
            </div>
            <div class="col-12 col-md-9">
                <h3>${dados.name}</h3>
                <p>${dados.bio}</p>
                <b>Localização:</b> <p style="display: inline-block">${dados.location}</p><br>
                <b>Site:</b> <p style="display: inline-block">${dados.blog}</p>
                <div class="mt-3">
                    <img src="./assets/Imagens/follow.png" class="icon"> <span class="fw-bold">${dados.followers}</span>
                </div>

                <div class="row mt-3">
                    <div class="col-12">
                        <a href="https://www.instagram.com/falkone_0405/" target="_blank"><img src="./assets/Imagens/instagram.png" class="icon mx-1"></a>
                        <a href="https://www.linkedin.com/in/gabriel-falk-160229182/" target="_blank"><img src="./assets/Imagens/linkedin.png" class="icon mx-1"></a>
                        <a href="mailto:gabrielmenezes0405@gmail.com" target="_blank"><img src="./assets/Imagens/gmail.png" class="icon mx-1"></a>
                        <a href="https://x.com/falkyu" target="_blank"><img src="./assets/Imagens/x.png" class="icon mx-1"></a>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <h3>Repositórios (${dados.public_repos})</h3>
                <hr>
            </div>
        `;

        sessao1.appendChild(perfilDiv);
    }

    function mostrarRepositorios(repos) {
        const reposDiv = document.getElementById("DataSession2");

        let newDiv1 = document.createElement("div");
        newDiv1.className = "row";

        repos.forEach(repo => {
            let repoItem = document.createElement("div");
            repoItem.className = "col-12 col-sm-6 col-md-4 p-2";
            repoItem.innerHTML = `
                <a href="repo.html" class="text-decoration-none text-dark">
                    <div class="card">
                        <div class="card-header fw-bold">${repo.name}</div>
                        <div class="card-body">
                            <p>${repo.description || 'No description'}</p>
                            <span class="badge bg-danger p-2">${repo.language}</span>
                            <div class="float-end">
                                <img src="./assets/Imagens/star.png" class="icon mx-2"><span>${repo.stargazers_count}</span>
                                <img src="./assets/Imagens/view.png" class="icon mx-2"><span>${repo.watchers_count}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            newDiv1.appendChild(repoItem);
        });

        reposDiv.appendChild(newDiv1);
    }

    function MostrarConteudo(conteudo) {
        const contmostra = document.getElementById("DataSession3");
        let newDiv = document.createElement("div");
        newDiv.className = "row";

        let carouselIndicators = "";
        let carouselItems = "";

        conteudo.forEach((item, index) => {
            const isActive = index === 0 ? "active" : "";
            carouselIndicators += `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
            carouselItems += `
                <div class="carousel-item ${isActive}">
                    <a href="${item.url_cont}">
                        <img src="${item.url_img}" class="d-block w-100" id="carrosel" alt="Slide ${index + 1}">
                    </a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${item.titulo}</h5>
                        <p>${item.descricao}</p>
                    </div>
                </div>
            `;
        });

        newDiv.innerHTML = `
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                <div class="carousel-indicators">
                    ${carouselIndicators}
                </div>
                <div class="carousel-inner">
                    ${carouselItems}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;

        contmostra.appendChild(newDiv);
    }

    function MostrarAmigos(amigos) {
        const telaAmigos = document.getElementById("DataSession4");
        let linha = document.createElement("div");
        linha.className = "row";

        amigos.forEach(item => {
            let newDiv = document.createElement("div");
            newDiv.className = "col-12 col-sm-6 col-md-3 m-1";
            newDiv.innerHTML = `
            <div class="card">
                 <div class ="card-body">
                    <img src="${item.url_img}" class="img-fluid divImgColegas">
                    <div class="card-header text-center"><a href="#" target="_blank" class="text-decoration-none text-dark">${item.nome}</a></div>
                    <button class="badge bg-dark mt-2 d-block"><img src="./assets/Imagens/git.png" class="icon"> Github</button>
                </div>
            </div>
            `;
            linha.appendChild(newDiv);
        });

        telaAmigos.appendChild(linha);
    }
});
