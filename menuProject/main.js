// IMPORTS

// ELEMENTS
let customerOrder = [];
const orderDiv = document.getElementById('order-list');
const orderTotalText = document.getElementById('order-total');
const paymentFormDiv = document.getElementById('payment');
const successDiv = document.getElementById('success');
const checkoutDiv = document.getElementById('checkout');

// EVENTS
document.addEventListener('click', (e) => {
    if (e.target.dataset.pizza) {
        addToOrderList({ item: "Pizza", price: 18 });
    } else if (e.target.dataset.hamburger) {
        addToOrderList({ item: "Hamburger", price: 12 });
    } else if (e.target.dataset.beer) {
        addToOrderList({ item: "Beer", price: 7 });
    } else if (e.target.dataset.submitBtn) {
        completeOrder();
    } else if (e.target.dataset.removeItemBtn) {
        removeItem(e.target.closest('.list-item').id);
    } else if (e.target.dataset.payBtn) {
        e.preventDefault();
        renderSuccess();
    }
});

// FUNCTION DEFINITIONS

/**
 * Adds a given item to a customer's order list
 * 
 * @param {Object} item - The item ordered and its price
 */
function addToOrderList(item) {
    customerOrder.push(item);
    renderOrderList(customerOrder);
    renderTotalPrice(customerOrder);
}

/**
 * Renders a order list given the items
 * 
 * @param {Array} order - The array of items 
 */
function renderOrderList(order) {
    orderDiv.innerHTML = '';
    order.forEach((item) => {
        orderDiv.innerHTML += 
        `
        <div class="list-item" id="${item.item}">
            <p class="item-txt">${item.item}<button class="remove-btn" data-remove-item-btn="remove">remove</button></p>
            <p class="price-txt">$${item.price}</p>
        </div>
        `
    });
    return;
}

/** 
 * Calculates and renders total order price
 * 
 * @param {Array} order - The array of items
 */
function renderTotalPrice(order) {
    const total = order.reduce((tot, item) => {
        return tot + item.price;
    }, 0);

    orderTotalText.innerHTML = `Total Price: $${total}`;
    return;
}

/**
 * Removes an item from the order list
 * 
 * @param {String} item - The type of item we are going to delete
 */
function removeItem(item) {
    console.log("YES");
    const itemIndex = customerOrder.findIndex((i) => i.item === item);
    customerOrder.splice(itemIndex, 1);
    renderOrderList(customerOrder);
    renderTotalPrice(customerOrder);
    return;
}

/**
 * Completes the order
 */
function completeOrder() {
    paymentFormDiv.style.display = "block";
    return;
}

/**
 * Renders the success HTML 
 */
function renderSuccess() {
    successDiv.innerHTML += 
    `
    <p>Thanks, your order is on the way</p>
    `
    successDiv.style.display = 'block';
    checkoutDiv.style.display = 'none';
    paymentFormDiv.style.display = 'none';
    return;
}

renderTotalPrice(customerOrder);