// Créer une liste d'articles préselectionnés avec leurs quantités
var items = [
  {
    name: "Item 1",
    price: 10,
    quantity: 1,
    image: "./img/987ca2af.webp",
  },
  {
    name: "Item 2",
    price: 20,
    quantity: 1,
    image: "./img/bff3c1c2.webp",
  },
  {
    name: "Item 3",
    price: 15,
    quantity: 1,
    image: "./img/f9645056.webp",
  },
  { name: "Item 4", price: 15, quantity: 1, image: "./img/nike.png" },
];

// Récupérer l'élément du panier dans le DOM
var cartElement = document.getElementById("cart");

// Parcourir la liste d'articles et créer les éléments correspondants dans le panier
items.forEach(function (item) {
  var itemElement = document.createElement("div");
  itemElement.classList.add("item");

  // Créer l'élément pour afficher le nom de l'article
  var nameElement = document.createElement("span");
  nameElement.textContent = item.name;
  itemElement.appendChild(nameElement);

  // Créer les boutons "+" et "-" pour ajuster la quantité de l'article
  var quantityElement = document.createElement("span");
  quantityElement.textContent = "Quantity: " + item.quantity;
  itemElement.appendChild(quantityElement);

  var increaseButton = document.createElement("button");
  increaseButton.textContent = "+";
  increaseButton.addEventListener("click", function () {
    item.quantity++;
    quantityElement.textContent = "Quantity: " + item.quantity;
    updateTotalPrice();
  });
  itemElement.appendChild(increaseButton);

  var decreaseButton = document.createElement("button");
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", function () {
    if (item.quantity > 0) {
      item.quantity--;
      quantityElement.textContent = "Quantity: " + item.quantity;
      updateTotalPrice();
    }
  });
  itemElement.appendChild(decreaseButton);

  var ProductImage = document.createElement("img");
  ProductImage.setAttribute("src", item.image);
  ProductImage.setAttribute("class", "ProductImage");
  itemElement.appendChild(ProductImage);

  // Créer le bouton de suppression de l'article
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    cartElement.removeChild(itemElement);
    items = items.filter(function (i) {
      return i !== item;
    });
    updateTotalPrice();
  });
  itemElement.appendChild(deleteButton);

  // Creer le btn like
  var likeButton = document.createElement("button");
  likeButton.textContent = "Like";
  likeButton.classList.add("like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("liked");

    if (likeButton.classList.contains("liked")) {
      item.isLiked = true;
      likeButton.style.color = "red";
    } else {
      item.isLiked = false;
      likeButton.style.color = "black";
    }
  });
  itemElement.appendChild(likeButton);
  // Ajouter l'article au panier
  cartElement.appendChild(itemElement);
});

// Fonction pour mettre à jour le prix total
function updateTotalPrice() {
  var totalPrice = items.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);
  var totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = "Total Price: $" + totalPrice;
}

// Appeler la fonction de mise à jour du prix total initialement
updateTotalPrice();
