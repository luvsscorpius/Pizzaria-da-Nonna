pizzaJson.map((item, index) => {
    console.log(item)

    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true) // .clonenode faz uma copia dos elementos

    // foi clonado e agora precisamos colocar dentro da main na div pizza-area 
    document.querySelector('.pizza-area').append(pizzaItem)

    //precisamos preencher os dados de cada pizza
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

})