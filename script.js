const regexUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/

// const username = prompt("Insira seu nome: ")
// alert(`Bem vindo ${username}!`) 

function selectClothe(element, parent) {
    const selected = document.querySelector(`${parent} .selected`)

    if(selected !== null) selected.classList.remove('selected')
    element.classList.add('selected')
}

function createClothe() {
    const inputUrl = document.querySelector('.shirt-image > input').value

    if(document.querySelectorAll('.selected').length < 3) return alert("SELECIONE OS 3 ITEMS PARA PROSSEGUIR")
    if(inputUrl === "" || regexUrl.test(inputUrl) === false) return alert("PREENCHA O LINK DA IMAGEM / PREENCHA UM LINK VALIDO DE IMAGEM")
}

