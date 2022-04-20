function addToCart(event) {
	// INSERT CODE HERE --> PRIPREMA

	let item = productsArray.find(element =>
		element.id == event
	);

	console.log(item);


	item.brojac++;
	localStorage.setItem("productsArray", JSON.stringify(productsArray));
	cardItems++;

	// END INSERT --> PRIPREMA
	updateCard();
}



function searchItem(input) {

	let array_P = JSON.parse(localStorage.getItem("productsArray"));

	let save_input = input;
	localStorage.setItem("save_input", JSON.stringify(save_input));


	array_P.forEach(e => {
		if (!e.name.startsWith(input)) {
			let id = `${e.id}`;
			console.log(id);

			let item = document.getElementById(id);
			console.log(item);

			item.style.display = "none";
			e.display = false;

		} else {
			let id = `${e.id}`;
			console.log(id);
			let item = document.getElementById(id);
			console.log(item);

			item.style.display = "block";
			e.hidden = true;
		}
	});

	localStorage.setItem("productsArray", JSON.stringify(array_P));


}


let productsArray = [];
let cardItems = 0;

let getData = async function () {
	let response = await fetch("./data/lab2.json");
	let data = await response.json();
	console.log(data);

	let temp = localStorage.getItem("productsArray");
	if (temp != null) {
		productsArray = JSON.parse(localStorage.getItem("productsArray"))
	}
	addCategories(data);

	InicialiseCartItems();

	updateCard();
}

let addCategories = async function (data) {
	let categories = data.categories;
	let main = document.querySelector('main');
	let categoryTemplate = document.querySelector('#category-template');

	let button = document.querySelector(".order-filter-apply");
	console.log(button);

	button.onclick = function () {
		//	searchItem(document.querySelector("#search-text"));
		let input = document.querySelector(".order-filter-input");
		// console.log(input);
		searchItem(input.value);
	};



	console.log(categories.length);
	for (let index = 0; index < categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		// console.log(categoryTitleElement);
		categoryTitleElement.textContent = categories[index].name;

		let products = data.products.filter(p => p.categoryId == categories[index].id);
		//console.log(products)

		// INSERT CODE HERE --> PRIPREMA
		let gallery = category.querySelector('.gallery');
		// console.log(gallery);

		for (let i = 0; i < products.length; i++) {
			let productsTemplate = document.querySelector('#product-template');
			let productsGallery = productsTemplate.content.cloneNode(true);
			// console.log(productsGallery);

			let productDiv = productsGallery.querySelector('.photo-box')
			// console.log(productDiv.dataset);
			productDiv.dataset.id = products[i].id;
			//"[data-id='Tulip']"

			productDiv.setAttribute('id', products[i].id);


			let productImage = productsGallery.querySelector('.photo-box-image');
			productImage.src = products[i].imageUrl;
			// console.log(productImage);


			let productName = productsGallery.querySelector('.photo-box-title');
			productName.textContent = products[i].name
			// console.log(productName);

			let productButton = productsGallery.querySelector('.cart-btn');
			// productButton.setAttribute('onclick', "addToCart(event)")
			// productButton.setAttribute('id', products[i].id);
			productButton.setAttribute('onclick', `addToCart('${products[i].id}')`)
			// console.log(productButton);


			//Add to productsArray
			//!(productsArray.filter(function(e) { return e.id === products[i].id; }).length > 0)
			//!(productsArray.filter(e => e.id === products[i].id).length > 0)
			//!productsArray.some(e => e.id === products[i].id)
			//If item id is already in array dont add it
			if (!productsArray.some(e => {
					return e.id === products[i].id
				})) {
				let item = {
					name: products[i].name,
					id: products[i].id,
					categorie: categories[index],
					brojac: 0,
					display: true,
					price: products[i].price
				}
				console.log(item);
				productsArray.push(item);
			}


			let itemobj = productsArray.find(e => {
				return e.id === products[i].id
			});

			console.log(productsArray);
			console.log("Moje")
			console.log(itemobj);

			if (itemobj.display === false) {
				console.log("Jesam");
				console.log(productsGallery.children[0]);
				productsGallery.children[0].style.display = "none";
			}

			gallery.appendChild(productsGallery);


		}
		// END INSERT --> PRIPREMA

		main.appendChild(category);
	}

	// let input = 'Tulip';
	// let elem = `"[data-id=${input}]"`;
	// let elem = document.querySelector(`"[data-id='$input']"`);
	// console.log(elem);

	//If productsArray was null or if new item was added update localstorage
	// console.log(productsArray);
	localStorage.setItem("productsArray", JSON.stringify(productsArray));
};


async function InicialiseCartItems() {
	productsArray.forEach((elem) => {
		cardItems = cardItems + elem.brojac;
	})
	// console.log(cardItems);
}

let updateCard = function refreshCartItems() {
	let cardItemsSelector = document.getElementById('cart-items');
	// console.log(cardItemsSelector);
	// console.log(cardItems);
	cardItemsSelector.textContent = cardItems;

}

getData();