// Funções auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => {
        seleciona('.pizzaWindowArea').style.opacity = 1
    }, 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        seleciona('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

const botoesFechar = () => {
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobilebutton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

const preencheDadosDasPizzas = (pizzaItem, item) => {
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.pizzaBig img').src = item.img
    seleciona('.pizzaInfo h1').innerHTML = item.name
    seleciona('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
    seleciona('.pizzaInfo--desc').innerHTML = item.description
}

//Mapear pizzas

pizzaJson.map((item, index) => {
    console.log(item)

    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true) // .clonenode faz uma copia dos elementos

    // foi clonado e agora precisamos colocar dentro da main na div pizza-area 
    seleciona('.pizza-area').append(pizzaItem)

    //precisamos preencher os dados de cada pizza
    preencheDadosDasPizzas(pizzaItem, item)


    // pizza clicada
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault() // faz o a não dar refresh
        console.log('clicou na pizza')

        // Abrir janela modal
        abrirModal()

        // Preenchimento dos dados
        preencheDadosDasPizzas(pizzaItem, item)

        // Preenche dados no modal
        preencheDadosModal(item)

        // Fechar janela modal
        botoesFechar()
    })
})