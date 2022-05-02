const regexUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/

const username = prompt("Insira seu nome: ")
alert(`Bem vindo ${username}!`) 

function selectClothe(element, parent) {
    const selected = document.querySelector(`${parent} .selected`)

    if(selected !== null) selected.classList.remove('selected')
    element.classList.add('selected')
}

function validateClothe() {
    const inputUrl = document.querySelector('.shirt-image > input').value
    const button = document.querySelector('.shirt-image > button')
    
    if(document.querySelectorAll('.selected').length === 3 && inputUrl !== "" && regexUrl.test(inputUrl) === true) {
        button.removeAttribute('disabled')
        button.style.cssText = `
            color: #FCFCFC;
            background-color: #C4C4C4;
            cursor: pointer;
        `
    }
}
setInterval(validateClothe, 2000)

const selectedClothe = (i) => document.querySelectorAll('.selected')[i].parentElement.classList[1]

function createClothe() {
    const inputUrl = document.querySelector('.shirt-image > input').value

    let clotheObject = {
        model: selectedClothe(0),
        neck: selectedClothe(1),
        material: selectedClothe(2),
        image: inputUrl,
        owner: username,
        author: username
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', clotheObject)
    promise.then(() => {
        alert('Encomenda enviada!')
        getClothes()
        document.querySelectorAll('.selected').forEach(item => item.classList.remove('selected'))
        document.querySelector('.shirt-image > input').value = ''
        clotheObject = {}
    })
    promise.catch(() => alert('Ops, não conseguimos processar sua encomenda'))
}

function getClothes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts')
    promise.then(res => {
        document.querySelector('.shirts-cards').innerHTML = ''

        for(let i = 0; i < res.data.length; i++) {
            document.querySelector('.shirts-cards').innerHTML += `
                <div class="shirt" onclick="sendClothe('${res.data[i].model}', '${res.data[i].neck}', '${res.data[i].material}', '${res.data[i].owner}')">
                    <img src="${res.data[i].image}" alt="clothe">
                    <h2><strong>Criador: </strong>${res.data[i].owner}</h2>
                </div>
            `
        }
    })
}
getClothes()

function sendClothe(model, neck, material, owner) {
    const encodedText = `Olá, gostaria de encomendar essa blusa: 
- Modelo: ${model}
- Gola: ${neck}
- Material: ${material}
- Criador: ${owner}

Pedido feito por: ${username}
    `

    if(confirm("Deseja encomendar essa blusa?") === true) {
        const readyMessage = `https://wa.me/5518997157418?text=${encodeURIComponent(encodedText)}`
        window.open(readyMessage)
    }
}