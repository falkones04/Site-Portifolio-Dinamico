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
        })
        .then(res => res.json())
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
                <h3 id="nomeUsuario"></h3>
                <p id="bioUsuario"></p>
                <b>Localização:</b> <p style="display: inline-block">${dados.location}</p><br>
                <b>Site:</b> <p style="display: inline-block">${dados.blog|| "Não possuo ainda"}</p>
                <div class="mt-3 float-end">
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

        escrever(dados.name, document.getElementById("nomeUsuario"));
        escrever(dados.bio, document.getElementById("bioUsuario"));
    }

    function mostrarRepositorios(repos) {
        const reposDiv = document.getElementById("DataSession2");

        let newDiv1 = document.createElement("div");
        newDiv1.className = "row";

        repos.forEach(repo => {
            let repoItem = document.createElement("div");
            repoItem.className = "col-12 col-sm-6 col-md-4 p-2";

            let maxChars = 100;
            let descricaoLimitada = repo.description ? (repo.description.length > maxChars ? repo.description.substring(0, maxChars) + "..." : repo.description) : 'No description';

            repoItem.innerHTML = `
              <a href="repo.html?id=${repo.id}" class="text-decoration-none text-dark">
                    <div class="card">
                        <div class="card-header fw-bold">${repo.name}</div>
                        <div class="card-body">
                            <p>${descricaoLimitada || 'No description'}</p>
                            <span class="badge bg-success p-2">${repo.language}</span>
                            <div class="float-end">
                                <img src="./Assets/Imagens/star.png" class="icon mx-2"><span>${repo.stargazers_count}</span>
                                <img src="./Assets/Imagens/fork.png" class="icon mx-2"><span>${repo.forks_count}</span>
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
        var myCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions'), {
            interval: 5000 
        });
    }

    function MostrarAmigos(amigos) {
        const telaAmigos = document.getElementById("DataSession4");
        let linha = document.createElement("div");
        linha.className = "row";

        amigos.forEach(item => {
            let newDiv = document.createElement("div");
            newDiv.className = "col-12 col-sm-6 col-md-3";
            newDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${item.url_img}" class="card-img-top" alt="Imagem do amigo">
                    <div class="card-body ">
                        <h5 class="card-title">${item.nome}</h5>
                        <p class="card-text">${item.desc}</p>
                        <div class="d-flex justify-content-center">
                            <a href="https://github.com/${item.git_user}" target="_blank" class="btn btn-dark me-2">
                                <img src="./assets/Imagens/git.png" class="icon" alt="Ícone do Github"> Github
                            </a>
                            <a href="https://www.instagram.com/${item.insta_user}" target="_blank">
                                <img src="./assets/Imagens/instagram.png" class="iconfriends mt-1" alt="Ícone do Instagram">
                            </a>
                        </div>
                    </div>
                </div>
            `;
            linha.appendChild(newDiv);
        });

        telaAmigos.appendChild(linha);
    }

    function escrever(str, el) {
        var char = str.split('').reverse();
        var typer = setInterval(function() {
            if (!char.length) return clearInterval(typer);
            var next = char.pop();
            el.innerHTML += next;
        }, 100);
    }
});
