fetch("https://fakestoreapi.com/products")
.then(response => response.json())
.then(productsArray => renderAllProducts(productsArray))

function renderAllProducts(productsArray){
  productsArray.forEach(product => renderOneProduct(product))
}

const findDiv = document.querySelector("#clothes-box")
function renderOneProduct(product){
  const newElement = document.createElement("div")
  newElement.className = "content"
  newElement.innerHTML = `
  <div class="item-card">
  <div class="center">
  <p>${product.id}</p>
  <h2>${product.title}</h2>
  <p>$${product.price}</p>
  <p>${product.description}</p>
  <p>${product.category}</p>
  <img src="${product.image}" class="image">
  <button class="add-item">Add To Cart</button>
  <div>
  </div>
  `
  findDiv.append(newElement)

  const addButton = newElement.querySelector(".add-item")
  addButton.addEventListener("click", event => {
    findListOfItems.innerText = ""
    fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        products: product.id
      })
    })
    .then(response => response.json())
    .then(newCartItem => {
      cartArray.push(newCartItem);
      renderAllCartItems(cartArray)
    })
  })
  const findListOfItems = document.querySelector(".list-of-items")
}

fetch("https://fakestoreapi.com/carts")
.then(response => response.json())
.then(cartItemsArray => {
  cartArray = cartItemsArray;
  renderAllCartItems(cartArray)})

function renderAllCartItems(cartItemsArray){
  cartItemsArray.forEach(cartItem => renderAllCartItem(cartItem))
}

function renderCartItems(cartItem){
  const newLi = document.createElement("li")
  newLi.innerHTML = `
  <p id="pTag">
  ${cartItem.product.image}
  ${cartItem.product.title}: $${cartItem.product.price}
  <button class="delete-button">
  <span>remove</span>
  </button>
  </p>
  `
  findListOfItems.append(newLi)

  const removeButton = newLi.querySelector(".delete-button")
  removeButton.addEventListener("click", event => {
    newLi.remove()
    fetch(`https://fakestoreapi.com/carts/${cartItem.id}`,{
      method: "DELETE"
    })
    .then(response => response.json())
    .then(results => {
      cartArray = results
      findListOfItems.innerHTML = ""
      renderAllCartItems(cartArray)
    })
  })
}

const checkOut = document.querySelector("#checkout")
const newDiv = document.createElement("div")
subTotal = cartItemsArray.map(item => item.product.price)
const subFloat = subTotal.map(num => parseFloat(num))
let sum = subFloat.reduce(function (accumulator, currentValue){
  return accumulator + currentValue
}, 0)
let tax = sum * .09
checkOut.innerHTML = ""
newDiv.innerHTML = `
  <hr>
  <p id="subTotal"> Subtotal: $${sum.toFixed(2)} </p>
  <p id="taxes">Tax: $${tax.toFixed(2)}</p>
  <p id="total">Total: $${((sum + tax).toFixed(2))}</p>
  <button id="check-out">Check Out</button>
  `
  checkOut.append(newDiv)

const subTotals = document.querySelector("#subtotal")
const total = document.querySelector("#total")
const taxes = document.querySelector("#taxes")
const checkOutBtn = newDiv.querySelector("#check-out")
checkOutBtn.addEventListener("click", event => {
  findListOfItems.innerHTML = ""
  subTotals.innerHTML = `Subtotal: $0.00`
  taxes.innerHTML = `Tax: $0.00`
  total.innerHTML = `Total: $0.00`
  alert("Thank you for shopping at STELIZO ENTERPRISES! :)");
  fetch("https://fakestoreapi.com/carts/", {
    method: "DELETE"
  })
  cartArray = []
})
