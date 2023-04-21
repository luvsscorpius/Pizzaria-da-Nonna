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

// aula 06 carrinho

const adicionarNoCarrinho = () => {
    seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionei')

        //pegar dados da janela modal atual
        // qual pizza? pegue o modalkey para usar pizzaJson[modalKey]
        console.log('Pizza' + modalkey)

        //tamanho
        let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key')
        console.log('Tamanho' + size)

        // quantidade
        console.log('Quant.' + quantPizzas)

        //preco
        let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

        //crie um identificador que junte id e tamanho
        // concatene as duas informações separadas por um símbolo, voce escolhe
        let identificador = pizzaJson[modalkey].id + 't' + size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex((item) => item.identificador == identificador)
        console.log(key)

        if (key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantPizzas
        } else {
            // adicionar objeta pizza no carrinho
            let pizza = {
                identificador,
                id: pizzaJson[modalkey].id,
                size,
                qt: quantPizzas,
                price: parseFloat(price)
            }
            cart.push(pizza) //insere a informação no carrinho
            console.log(pizza)
            console.log('Sub total R$' + (pizza.qt * pizza.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if (cart.length > 0) {
        // mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if (cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

// fechar o carrinho 
const fecharCarrinho = () => {
    // fechar carrinho com o botão x no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

//atualizar o carrinho

const atualizarCarrinho = () => {
    //exibir o numero de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length

    //mostrar ou nao o carrinho
    if (cart.length > 0) {
        //mostrar o carrinho 
        seleciona('aside').classList.add('show')

        // zerar meu .cart para não fazer inserções duplicadas
        seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
        let subtotal = 0
        let desconto = 0
        let total = 0

        // para preencher os itens do carrinho, calcular subtotla
        for (let i in cart) {
            //use o find para pegar o item por id
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            console.log(pizzaItem)
            // em cada item pegar o subtotal
            subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

            //para fazer o clone, exibir na telas e depois preencher as informações
            let cartItem = seleciona('.models .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            let pizzaSizeName = cart[i].size

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            // preencher as informações 
            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            //selecionar botoes + e -
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('Clicou no botão mais')
                // adicionar apenas a quantidade que esta neste contexto
                cart[i].qt++
                // atualizar a quantidade
                atualizarCarrinho()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('Clicou no botão menos')
                if (cart[i].qt > 1) {
                    // subtrair apenas a quantidade que esta neste contexto
                    cart[i].qt--
                } else {
                    // remover se for zero
                    cart.splice(i, 1)
                }
                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

                // atualizar a quantidade 
                atualizarCarrinho()
            })

            seleciona('.cart').append(cartItem)
        } //fim do for

        // fora do for 
        // calcule desconto de 10% e total
        // desconto = subtotal * 0.1
        desconto = subtotal * 0
        total = subtotal - desconto

        // exibir na tela os resultados
        // selecionar o ultimo span do elemento
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)
    } else {
        // ocultar o carrinho 
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}

// finalizar compra 
const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
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

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
    })

    seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if (quantPizzas > 1) {
            quantPizzas--
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
        }
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

        // Mudar quantidade 
        mudarQuantidade()

        // ADICIONAR NO CARRINHO
        adicionarNoCarrinho()
        atualizarCarrinho()
        fecharCarrinho()
        finalizarCompra()
    })
})

