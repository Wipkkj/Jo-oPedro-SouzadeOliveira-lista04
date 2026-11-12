
const campoCep = document.getElementById("cep");
const botaoBuscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");


botaoBuscar.addEventListener("click", buscarCep);


function buscarCep() {


    const cep = campoCep.value


    resultado.innerHTML = "";


    if (cep.length !== 8) {
        resultado.innerHTML = '<p class="erro">Erro ao buscar endereço.</p>';
        return;
    }


    fetch(`https://viacep.com.br/ws/${cep}/json/`)


        .then(resposta => resposta.json())


        .then(dados => {


            if (dados.erro) {
                resultado.innerHTML = '<p class="erro">Erro ao buscar endereço.</p>';
                return;
            }


            resultado.innerHTML =
                `<p><strong>Logradouro:</strong> ${dados.logradouro}</p>
                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                <p><strong>Cidade:</strong> ${dados.localidade}</p>
                <p><strong>Estado:</strong> ${dados.uf}</p>`;

        })


        .catch(erro => {
            resultado.innerHTML = '<p class="erro">Erro ao buscar endereço.</p>';

            console.log(erro);
        });

}
