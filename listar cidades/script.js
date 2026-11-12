const selectEstado = document.getElementById("estado");
const selectCidade = document.getElementById("cidade");
const resultado = document.getElementById("resultado");

async function buscarEstados() {
    const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);

    const estados = await resposta.json();
    console.log(estados);

    estados.forEach((estado) => {
        const opcao = document.createElement("option");

        opcao.textContent = estado.nome;
        opcao.value = estado.sigla;

        selectEstado.appendChild(opcao);
    });
}

buscarEstados();

selectEstado.addEventListener("change", () => {
    resultado.innerHTML = "";
    buscarCidades();
})

async function buscarCidades() {
    const uf = selectEstado.value;
    selectCidade.innerHTML = '<option value="">Selecione uma cidade</option>';

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

    const resposta = await fetch(url);
    const cidades = await resposta.json();

    cidades.forEach((cidade) => {
        const opcao = document.createElement("option");

        opcao.textContent = cidade.nome;
        opcao.value = cidade.nome;
        selectCidade.appendChild(opcao);
    });
}

selectCidade.addEventListener("change", () => {
    resultado.innerHTML = "";

    const nomeCidade = selectCidade.value;
    const nomeEstado = selectEstado.value;
    
    const texto = document.createElement("p");
    texto.textContent = `Voce selecionou: ${nomeEstado} - ${nomeCidade}.`

    resultado.appendChild(texto);
    
})