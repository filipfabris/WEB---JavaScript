let productsArray = [];

function getCart() {
    let productsArray = JSON.parse(localStorage.getItem("productsArray"));
    let obj = new Object();
    productsArray.forEach(element => {
        obj[element.id] = element.brojac;
    });
    console.log(obj);
    return obj;
}

let refreshCart = async function () {
    let cart = getCart();
    console.log(cart);
    if (cart) {
        let ids = Object.keys(cart);
        if (ids.length < 1) return;
        let container = document.querySelector('.cart');
        container.innerHTML = "";

        let cartHeaderTemplate = document.querySelector('#cart-template-header');
        let cartHeader = cartHeaderTemplate.content.cloneNode(true);
        container.appendChild(cartHeader);

        //INSERT CODE HERE - Zadatak

        //END INSERT CODE - Zadatak

        let data = JSON.parse(localStorage.getItem("productsArray"));

        let cartItemTemplate = document.querySelector('#cart-template-item');
        for (const id of ids) {

            // console.log(id);
            // console.log(ids);

            let product = data.find(p => p.id == id);
            console.log(product);

            let cartItem = cartItemTemplate.content.cloneNode(true);

            cartItem.querySelector(".cart-item").id = id;
            let title = cartItem.querySelector('.cart-item-title');
            title.textContent = product.name;
            let quantity = cartItem.querySelector('.cart-item-quantity');
            let price = cartItem.querySelector('.cart-item-price');
            price.textContent = product.price + ' kn';
            quantity.value = product.brojac;
            quantity.readOnly = true

            //INSERT CODE HERE - Zadatak

            //END INSERT CODE - Zadatak

            container.appendChild(cartItem);
        }
    }
}

refreshCart();