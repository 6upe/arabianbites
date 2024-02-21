// JavaScript code to handle shopping cart functionality
let cart = []; // Array to store cart items
let bill = 0;
// Function to update cart badge count
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  badge.innerText = cart.length;
}

// Function to add item to cart
function addToCart(item) {
    console.log('added to cart: ', item)
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
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    // Variable to store the total price
    let totalPrice = 0;
  
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <div class="fh5co-food-desc" style="display: flex; align-items: center; justify-content: space-between">
          <figure style="margin-right: 10px;">
            <img width="20px" src="./foodano.jpg" class="img-responsive" alt="Free HTML5 Templates by FREEHTML5.co">
          </figure>
          <div>
            <p style="margin: 0;">${item.name}</p>
            <p style="margin: 0;">K${item.price}</p>
          </div>
          <div class="fh5co-food-pricing">
          <button class="btn btn-danger" style="margin-top: 10px;" onclick="removeFromCart(${index})">Remove</button>
        </div>
        </div>
        
      `;
      cartItemsDiv.appendChild(itemDiv);
      // Add item price to the total
      totalPrice += item.price;
    });

    // Display total next to checkout button
    const totalDiv = document.getElementById('totalDiv');
    totalDiv.innerHTML = `Total: K${totalPrice}`;
    bill = totalPrice;

  }


// Initialize cart button
document.getElementById('cartBtn').addEventListener('click', function() {
  showCartItems();
  $('#cartModal').modal('show');
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
  document.getElementById('checkoutBtn').addEventListener('click', function() {
    // Gather information about the order
    let orderDetails = 'Order Summary:\n';
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
    $('#cartModal').modal('hide');
  
    // Show success message
    alert('Order placed successfully!');
  });

  // Sample menu items
const menuItems = [
    { name: 'Buffalo Wings', price: 120 },
    { name: 'Fatteh', price: 150 },
    { name: 'Chips Big Plate', price: 60 },
    { name: 'Hummus Moutabal', price: 130 }
  ];
  

// Initialize menu
const menuList = document.getElementById('menu');
menuItems.forEach(item => {
  const li = document.createElement('li');
  li.style.padding = '10px';
  li.innerHTML = `
    <div class="fh5co-food-desc">
      <figure>
        <img src="./foodano.jpg" class="img-responsive" alt="Free HTML5 Templates by FREEHTML5.co">
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
  const addToCartBtn = li.querySelector('.addToCartBtn');
  addToCartBtn.addEventListener('click', function() {
    addToCart(item);
  });
});

