// JavaScript code to handle shopping cart functionality
let cart = []; // Array to store cart items
let bill = 0;
// Function to update cart badge count
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  badge.innerText = cart.length;
}

// Function to add item to cart
function addToCart(item) {
  console.log("added to cart: ", item);
  cart.push(item);
  updateCartBadge();
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  showCartItems();
}

// Function to display cart items in modal
function showCartItems() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";

  // Variable to store the total price
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
        <div class="fh5co-food-desc" style="display: flex; align-items: center; justify-content: space-between; margin-top: 5px;">
          <figure style="margin-right: 10px;">
            <img width="100px" src="${item.img}" class="img-responsive" alt="img">
          </figure>

          <div style="display: flex; align-items: center; justify-content: space-between; width: 50%;">
            <p style="margin: 0;">${item.name}</p>
            <p style="margin: 0; font-weight: bold; color: green;">K${item.price}</p>
          </div>
          <button class="btn btn-danger" onclick="removeFromCart(${index})">
          
          <i class="fa fa-trash"  aria-hidden="true"></i>
          </button>
        </div>
        
      `;
    cartItemsDiv.appendChild(itemDiv);
    // Add item price to the total
    totalPrice += item.price;
  });

  // Display total next to checkout button
  const totalDiv = document.getElementById("totalDiv");
  totalDiv.innerHTML = `Total: K${totalPrice}`;
  bill = totalPrice;
}

// Initialize cart button
document.getElementById("cartBtn").addEventListener("click", function () {
  showCartItems();
  $("#cartModal").modal("show");
});

// Function to send order message to WhatsApp
function sendOrder(orderDetails) {
  var whatsappNumber = "+260962893773";
  var message = "Hello! Here is the order summary:\n\n" + orderDetails;
  window.open(
    "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(message)
  );
}

// Initialize checkout button
document.getElementById("checkoutBtn").addEventListener("click", function () {
  // Gather information about the order
  let orderDetails = "Order Summary:\n";
  cart.forEach((item, index) => {
    orderDetails += `${index + 1}. ${item.name} - K${item.price}\n`;
  });
  orderDetails += `\nTotal : ${bill}\n`;

  // Send WhatsApp message with order details
  sendOrder(orderDetails);

  // Clear the cart after checkout
  cart = [];
  updateCartBadge();

  // Close the modal
  $("#cartModal").modal("hide");

  // Show success message
  alert("Order placed successfully!");
});

// Sample menu items
const menuItems = [
  { img: "./Buffalo Wings.jpg", name: "Buffalo Wings", price: 120 },
  { img: "./Fatteh.jpg", name: "Fatteh", price: 150 },
  { img: "./chips.jpg", name: "Chips Big Plate", price: 60 },
  { img: "./Hummus Moutabal.jpg", name: "Hummus Moutabal", price: 130 },
];

// Initialize menu
const menuList = document.getElementById("menu");
menuItems.forEach((item) => {
  const li = document.createElement("li");
  li.style.padding = "10px";
  li.innerHTML = `
    <div class="fh5co-food-desc">
      <figure>
        <img src="${item.img}" class="img-responsive" alt="img">
      </figure>
      <div>
        <h3>${item.name}</h3>
        <p>K${item.price}</p>
      </div>
    </div>
    <div class="fh5co-food-pricing" >
      <button class="btn btn-primary addToCartBtn">
        <i class="fa fa-cart-plus" aria-hidden="true"></i>
      </button>
    </div>
  `;
  menuList.appendChild(li);

  // Add event listener to the newly created button
  const addToCartBtn = li.querySelector(".addToCartBtn");
  addToCartBtn.addEventListener("click", function () {
    addToCart(item);
  });
});
