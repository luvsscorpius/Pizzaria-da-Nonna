// Variavel modakey Global

let modalkey = 0

// Varivel para controlar a quantidade inicial de pizzas na modal
let quantPizzas = 1

let cart = []  // carrinho

// Funções auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobilebutton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.pizzaBig img').src = item.img
    seleciona('.pizzaInfo h1').innerHTML = item.name
    seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
    seleciona('.pizzaInfo--desc').innerHTML = item.description
}

// Aula 05 Tamanhos e Preços
const pegarKey = (e) => {
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    console.log('Pizza clicada' + key)
    console.log(pizzaJson[key])

    // garantir que a quantidade incial de pizzas é 1
    quantPizzas = 1

    // para manter a informação de qual pizza foi clicada
    modalkey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.pizzaInfo--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    //Ações nos botoes de tamanho
    //Selecionar todos os tamanhoos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            //Clicou em um item, tirar a seleção dos outros e marca o que voce clicou
            // tirar a seleção de tamanho atual e selecionar o tamanho grande
            seleciona('.pizzaInfo--size.selected').classList.remove('selected')
            //marcar o que voce clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            //mudar o preco de acordo com o tamanho
            seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
        })
    })
}

//Mapear pizzas

pizzaJson.map((item, index) => {
    console.log(item)

    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true) // .clonenode faz uma copia dos elementos

    // foi clonado e agora precisamos colocar dentro da main na div pizza-area 
    seleciona('.pizza-area').append(pizzaItem)

    //precisamos preencher os dados de cada pizza
    preencheDadosDasPizzas(pizzaItem, item, index)

    // pizza clicada
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault() // faz o a não dar refresh
        console.log('clicou na pizza')

        let chave = pegarKey(e)

        //pegar tamanho selecionado 
        preencherTamanhos(chave)

        //definir quantidade inicial como 1
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas

        //selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)

        // Abrir janela modal
        abrirModal()

        // Preenche dados no modal
        preencheDadosModal(item)

        // Fechar janela modal
        botoesFechar()
    })
})

