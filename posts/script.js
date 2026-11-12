
const selectUsuarios = document.getElementById("usuarios");
const postagensDiv = document.getElementById("postagens");
const detalhesDiv = document.getElementById("detalhes");


async function buscarUsuarios() {

    try {

        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");

        const usuarios = await resposta.json();

        usuarios.forEach(usuario => {

            const option = document.createElement("option");

            option.value = usuario.id;
            option.textContent = usuario.name;
            selectUsuarios.appendChild(option);

        });

    } catch (erro) {

        console.error("Erro ao buscar usuários:", erro);

    }

}



async function buscarPostagens(idUsuario) {

    postagensDiv.innerHTML = "Carregando postagens...";
    detalhesDiv.innerHTML = "";

    try {

        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${idUsuario}`
        );

        const postagens = await resposta.json();

        postagensDiv.innerHTML = "";

        postagens.forEach(postagem => {
            const titulo = document.createElement("div");

            titulo.classList.add("postagem");
            titulo.textContent = postagem.title;
            titulo.addEventListener("click", () => {

                document.querySelectorAll(".postagem").forEach(item => {
                    item.classList.remove("selecionada");
                });
                titulo.classList.add("selecionada");
                buscarDetalhes(postagem.id);

            });

            postagensDiv.appendChild(titulo);

        });

    } catch (erro) {
        postagensDiv.textContent = "Erro ao buscar postagens.";
        console.error("Erro:", erro);

    }

}



async function buscarDetalhes(idPostagem) {

    detalhesDiv.innerHTML = "Carregando detalhes...";

    try {


        const respostaPostagem = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${idPostagem}`
        );

        const postagem = await respostaPostagem.json();



        const respostaComentarios = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${idPostagem}/comments`
        );

        const comentarios = await respostaComentarios.json();

        detalhesDiv.innerHTML = "";



        const titulo = document.createElement("h3");
        titulo.textContent = postagem.title;
        detalhesDiv.appendChild(titulo);


        const conteudo = document.createElement("p");
        conteudo.textContent = postagem.body;
        detalhesDiv.appendChild(conteudo);



        const tituloComentarios = document.createElement("h3");
        tituloComentarios.textContent = "Comentários:";
        detalhesDiv.appendChild(tituloComentarios);



        comentarios.forEach(comentario => {

            const comentarioDiv = document.createElement("div");
            comentarioDiv.classList.add("comentario");
            comentarioDiv.textContent = comentario.body;
            detalhesDiv.appendChild(comentarioDiv);

        });

    } catch (erro) {

        detalhesDiv.textContent = "Erro ao buscar detalhes da postagem.";
        console.error("Erro:", erro);

    }

}

selectUsuarios.addEventListener("change", () => {

    const idUsuario = selectUsuarios.value;
    if (idUsuario) {
        buscarPostagens(idUsuario);

    } else {
        postagensDiv.innerHTML = "";
        detalhesDiv.innerHTML = "";

    }

});



buscarUsuarios();
