// Constructor function for Order
function Order(mealName, mealPrice, mealImage) {
  this.mealName = mealName;
  this.mealPrice = mealPrice;
  this.mealImage = mealImage;
}

// Array to store orders
let orders = [];

// Grab DOM elements
const orderForm = document.getElementById('order-form');
const ordersContainer = document.getElementById('orders-container');

// Load orders from localStorage on page load
window.onload = function() {
  const storedOrders = localStorage.getItem('orders');
  if (storedOrders) {
    orders = JSON.parse(storedOrders);
    renderOrders();
  }
};

// Handle form submission
orderForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const mealName = document.getElementById('meal-name').value.trim();
  const mealPrice = parseFloat(document.getElementById('meal-price').value);
  const mealImage = document.getElementById('meal-image').value.trim();

  if (!mealName || isNaN(mealPrice) || !mealImage) {
    alert('Please fill all fields correctly!');
    return;
  }

  const newOrder = new Order(mealName, mealPrice.toFixed(2), mealImage);
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));

  renderOrders();
  orderForm.reset();
});

// Function to render orders
function renderOrders() {
  ordersContainer.innerHTML = '';

  if (orders.length === 0) {
    ordersContainer.innerHTML = '<p>No orders yet. Add some tasty meals!</p>';
    return;
  }

  orders.forEach((order, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${order.mealImage}" alt="${order.mealName}" onerror="this.onerror=null;this.src='images/default.png';"/>
      <h3>${order.mealName}</h3>
      <p>Price: $${order.mealPrice}</p>
      <button onclick="deleteOrder(${index})" class="delete-btn">Delete</button>
    `;

    ordersContainer.appendChild(card);
  });
}

// Delete single order
function deleteOrder(index) {
  orders.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders));
  renderOrders();
}

// Clear all orders
function clearOrders() {
  if (confirm('Are you sure you want to clear all orders?')) {
    orders = [];
    localStorage.removeItem('orders');
    renderOrders();
  }
}
