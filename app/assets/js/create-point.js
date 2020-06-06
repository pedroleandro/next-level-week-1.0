/**
 * Populando estados e cidades utlizando a API de Localidades do IBGE
 * Disponível em: https://servicodados.ibge.gov.br/api/docs/localidades?versao=1
 */
function populateUf() {
    const ufSelect = window.document.getElementById(`uf`);
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(
            function (res) {
                return res.json()
            })
        .then(
            function (states) {

                for (state of states) {
                    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
                }
            })
}

populateUf()

function populateCities(event) {
    const citySelect = window.document.getElementById(`city`);
    const stateInput = window.document.getElementById(`state`);

    let ufId = event.target.value

    let indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`

    citySelect.innerHTML = ``
    citySelect.innerHTML = `<option value="">Selecione sua Cidade</option>`
    citySelect.disabled = true

    fetch(url)
        .then(
            function (res) {
                return res.json()
            })
        .then(
            function (cities) {
                for (city of cities) {
                    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
                }

                citySelect.disabled = false
            })

}

window.document.getElementById(`uf`).addEventListener("change", populateCities)

/**
 * Implementando itens de coleta
 */

const itensToCollect = window.document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let collectedItens = window.document.getElementById("itens")
let selectedItens = []

function handleSelectedItem(event) {

    let itemLi = event.target

    //add(), remove(), toggle()
    itemLi.classList.toggle("selected")

    let itemId = itemLi.dataset.id

    let alreadySelected = selectedItens.findIndex(
        function (item) {
            return item === itemId
        }
    )

    if (alreadySelected != -1) {
        let filteredItens = selectedItens.filter(
            function (item) {
                return item != itemId
            }
        )
        selectedItens = filteredItens
    } else {
        selectedItens.push(itemId)
    }

    //console.log(selectedItens)

    /* console.log('selectedItens', selectedItens) */

    collectedItens.value = selectedItens
    console.log(collectedItens.value)

}