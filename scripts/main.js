function refreshCartItems() {
	// INSERT CODE HERE --> PRIPREMA
	let productsArray = localStorage.getItem("productsArray");
	if (productsArray != null) {
		productsArray = JSON.parse(localStorage.getItem("productsArray"))
		let counter = 0;
		productsArray.forEach((elem) => {
			counter = counter + elem.brojac;
		})
		console.log(counter);
		let cardItemsSelector = document.getElementById('cart-items');
		cardItemsSelector.textContent = counter;


	}
	// END INSERT --> PRIPREMA
}

refreshCartItems();