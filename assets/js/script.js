function populateUf(){
    const ufSelect = window.document.getElementById(`uf`);
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( 
        function(res){
            return res.json()
        })
    .then(
        function(states){

            for(state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUf()

function populateCities(event){
    const citySelect = window.document.getElementById(`city`);
    const stateInput = window.document.getElementById(`state`);

    let ufId = event.target.value

    let indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`

    fetch(url)
    .then( 
        function(res){
            return res.json()
        })
    .then(
        function(cities){
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

window.document
    .getElementById(`uf`)
    .addEventListener("change", populateCities)