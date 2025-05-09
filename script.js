// Select elements
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById('decrease-btn');
const quantitySpan = document.getElementById('quantity');
const sellingPriceSpan = document.getElementById('selling-price');
const comparePriceSpan = document.getElementById('compare-price');
const addToCartBtn = document.getElementById('add-to-cart-btn'); 
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsContainer = document.getElementById('cart-items');
const closeCartBtn = document.getElementById('close-cart');
const cartTotal = document.getElementById('cart-total');

// Base prices
const baseSellingPrice = 249;
const baseComparePrice = 369;

// Initial quantity
let quantity = 1;

// Update prices
function updatePrices() {
  sellingPriceSpan.textContent = `$${(baseSellingPrice * quantity).toFixed(2)}`;
  comparePriceSpan.textContent = `$${(baseComparePrice * quantity).toFixed(2)}`;
}

// Handle increase
increaseBtn.addEventListener('click', () => {
  if (quantity < 10) {
    quantity++;
    quantitySpan.textContent = quantity;
    updatePrices();
  }
});

// Handle decrease
decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantitySpan.textContent = quantity;
    updatePrices();
  }
});

// Render cart item
function renderCartItem() {
  cartItemsContainer.innerHTML = `
    <div class="cart-item">
      <div>
        <p>Helio Pet</p>
        <p>Qty: ${quantity}</p>
        <p>Price: $${(baseSellingPrice * quantity).toFixed(2)} <span style="text-decoration: line-through; color: gray;">$${(baseComparePrice * quantity).toFixed(2)}</span></p>
      </div>
      <button id="delete-item" style="background:red;color:white;border:none;padding:4px 8px;">Delete</button>
    </div>
  `;
  cartTotal.textContent = `$${(baseSellingPrice * quantity).toFixed(2)}`;
}

// Save cart to local storage
function saveCartToLocalStorage() {
  const cartData = {
    quantity: quantity,
    totalPrice: (baseSellingPrice * quantity).toFixed(2),
  };
  localStorage.setItem('cartData', JSON.stringify(cartData));
}

// NEW:
function deleteCartItem() {
  // Remove the stored cart
  localStorage.removeItem('cartData');

  // Reset quantity back to 1
  quantity = 1;
  quantitySpan.textContent = quantity;
  updatePrices();

  // Clear drawer contents & close
  cartItemsContainer.innerHTML = '';
  cartDrawer.classList.remove('show');
  cartDrawer.classList.add('hidden');
}


function loadCartFromLocalStorage() {
  const storedCart = JSON.parse(localStorage.getItem('cartData'));

  // only restore if quantity is > 0
  if (storedCart && storedCart.quantity > 0) {
    quantity = storedCart.quantity;
    quantitySpan.textContent = quantity;
    updatePrices();
    renderCartItem();
  }

 
}


// Event listeners
addToCartBtn.addEventListener('click', () => {
  renderCartItem();
  saveCartToLocalStorage();
  cartDrawer.classList.add('show');
  cartDrawer.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cartDrawer.classList.remove('show');
  cartDrawer.classList.add('hidden');
});

// Load cart on page load
window.addEventListener('load', loadCartFromLocalStorage);



cartItemsContainer.addEventListener('click', e => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === 'decrease') updateCartQuantity(-1);
  if (action === 'increase') updateCartQuantity(1);
  if (action === 'delete') deleteCartItem();
});



function renderCartItem() {
  cartItemsContainer.innerHTML = `
    <div class="cart-item">
      <img src="/images/banner1.jpg" alt="Helio Pet Device™" class="cart-item-image">
      <div class="cart-item-details">
        <div class="cart-item-name">Helio Pet Device™</div>
        <div class="cart-item-price">$${(baseSellingPrice * quantity).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <div class="cart-qty-pill">
            <button class="cart-btn" data-action="decrease">−</button>
            <span id="cart-quantity" class="cart-quantity">${quantity}</span>
            <button class="cart-btn" data-action="increase">+</button>
        </div>

            <!-- trash stays outside the pill -->
            <button class="cart-item-delete" data-action="delete">🗑️</button>
        </div>
    </div>
  `;
  cartTotal.textContent = `$${(baseSellingPrice * quantity).toFixed(2)}`;
}

// Function to update quantity
function updateCartQuantity(change) {
  if (quantity + change >= 1 && quantity + change <= 10) {
    quantity += change;
    document.getElementById('cart-quantity').textContent = quantity;
    renderCartItem(); 
    updatePrices(); 
    saveCartToLocalStorage(); 
  }
}

// Function to delete cart item
function deleteCartItem() {
  quantity = 0;
  renderCartItem(); 
  saveCartToLocalStorage(); 
  cartDrawer.classList.remove('show');
  cartDrawer.classList.add('hidden');
  window.location.reload();
}


