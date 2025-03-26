let products = []; // Stores all available products
let bills = {};    // Stores bills, with each bill containing an array of products
let activeBill = null; // The currently selected bill

const CATEGORIES = ["eten", "drank"]; // Categories for products

// Load data from localStorage when the page loads
window.onload = function() {
    loadFromLocalStorage();
    populateBillSelector();
    renderProductButtons();
    updateBillDisplay();
};

// Save all data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('bills', JSON.stringify(bills));
    localStorage.setItem('activeBill', activeBill);
}

// Load all data from localStorage
function loadFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    const storedBills = localStorage.getItem('bills');
    const storedActiveBill = localStorage.getItem('activeBill');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
    if (storedBills) {
        bills = JSON.parse(storedBills);
    }
    if (storedActiveBill) {
        activeBill = storedActiveBill;
        document.getElementById('billSelector').value = activeBill;
    }
}

// Populate the bill dropdown selector
function populateBillSelector() {
    const billSelector = document.getElementById('billSelector');
    billSelector.innerHTML = '<option value="">-- Selecteer rekening --</option>';
    for (const billName in bills) {
        const option = document.createElement('option');
        option.value = billName;
        option.textContent = billName;
        billSelector.appendChild(option);
    }
}

// Render all product buttons from the products list
function renderProductButtons() {
    const productButtonsContainer = document.getElementById('productButtons');
    productButtonsContainer.innerHTML = '';
    products.forEach(product => {
        const button = createProductButton(product);
        const deleteButton = createDeleteButton(product);

        const container = document.createElement('div');
        container.appendChild(button);
        container.appendChild(deleteButton);

        productButtonsContainer.appendChild(container);
    });
}

// Create a product button
function createProductButton(product) {
    const button = document.createElement('button');
    button.textContent = `${product.name} (${product.category}) (€${product.price.toFixed(2)})`;
    button.classList.add('product-btn');
    button.onclick = () => addToBill(product);
    return button;
}

// Create a delete button for a product
function createDeleteButton(product) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = () => removeProduct(product);
    return deleteButton;
}

// Add a new product
function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;

    if (name && !isNaN(price) && CATEGORIES.includes(category)) {
        const product = { name, price, category };
        products.push(product);
        saveToLocalStorage();
        renderProductButtons();

        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
    }
}

// Remove a product from the list
function removeProduct(product) {
    products = products.filter(p => p !== product);
    saveToLocalStorage();
    renderProductButtons();
}

// Add a product to the active bill, incrementing its quantity if already present
function addToBill(product) {
    if (!activeBill) {
        alert('Please select a bill first.');
        return;
    }

    // Check if the product is already in the bill
    const bill = bills[activeBill];
    const billProduct = bill.find(p => p.name === product.name);

    if (billProduct) {
        // Increment the quantity if the product already exists
        billProduct.quantity += 1;
    } else {
        // Add a new product with quantity 1
        bill.push({ ...product, quantity: 1 });
    }

    saveToLocalStorage();
    updateBillDisplay();
}

// Remove a product or decrement its quantity from the active bill
function removeFromBill(product) {
    if (!activeBill) {
        alert('Please select a bill first.');
        return;
    }

    const bill = bills[activeBill];
    const billProductIndex = bill.findIndex(p => p.name === product.name);

    if (billProductIndex !== -1) {
        const billProduct = bill[billProductIndex];

        if (billProduct.quantity > 1) {
            // Decrement the quantity
            billProduct.quantity -= 1;
        } else {
            // Remove the product entirely if quantity is 1
            bill.splice(billProductIndex, 1);
        }
    }

    saveToLocalStorage();
    updateBillDisplay();
}

// Clear the active bill
function clearBill() {
    if (activeBill) {
        bills[activeBill] = [];
        saveToLocalStorage();
        updateBillDisplay();
    }
}

// Update the bill display with products and subtotals for each category
function updateBillDisplay() {
    const billList = document.getElementById('billList');
    const totalAmount = document.getElementById('totalAmount');

    billList.innerHTML = '';
    let total = 0;

    if (activeBill && bills[activeBill]) {
        CATEGORIES.forEach(category => {
            // Add category header
            const categoryHeader = document.createElement('h4');
            categoryHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            billList.appendChild(categoryHeader);

            let categoryTotal = 0;

            // Add products for this category
            bills[activeBill].forEach(product => {
                if (product.category === category) {
                    const li = document.createElement('li');
                    li.textContent = `${product.name} x${product.quantity} - €${(product.price * product.quantity).toFixed(2)}`;

                    // Create remove button
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'X';
                    removeButton.classList.add('remove-btn');
                    removeButton.onclick = () => removeFromBill(product);

                    li.appendChild(removeButton);
                    billList.appendChild(li);

                    categoryTotal += product.price * product.quantity;
                }
            });

            // Add category subtotal
            const categorySubtotal = document.createElement('p');
            categorySubtotal.textContent = `Subtotal (${category}): €${categoryTotal.toFixed(2)}`;
            billList.appendChild(categorySubtotal);

            total += categoryTotal;
        });
    }

    totalAmount.textContent = total.toFixed(2);
}

// Create a new bill
function createBill() {
    const billName = document.getElementById('billName').value.trim();
    if (billName && !bills[billName]) {
        bills[billName] = [];
        populateBillSelector();
        saveToLocalStorage();
        document.getElementById('billName').value = '';
    }
}

// Select an active bill
function selectBill() {
    const billSelector = document.getElementById('billSelector');
    activeBill = billSelector.value;
    saveToLocalStorage();
    updateBillDisplay();
}

// Delete the selected bill
function deleteBill() {
    if (activeBill) {
        delete bills[activeBill];
        populateBillSelector();
        activeBill = null;
        saveToLocalStorage();
        updateBillDisplay();
    }
}

// Export all bills to an Excel file
function exportAllBills() {
    const workbook = XLSX.utils.book_new();

    for (const [billName, products] of Object.entries(bills)) {
        const headers = [["Category", "Product", "Price", "Quantity", "Total"]];
        const data = products.map(product => [
            product.category,
            product.name,
            product.price,
            product.quantity,
            product.price * product.quantity
        ]);

        const worksheet = XLSX.utils.aoa_to_sheet(headers.concat(data));
        XLSX.utils.book_append_sheet(workbook, worksheet, billName);
    }

    XLSX.writeFile(workbook, "all_bills.xlsx");
}


// Generate a summary of all bills
function generateSummary() {
    const summaryContainer = document.getElementById('summaryContainer');
    summaryContainer.innerHTML = '';

    let grandTotal = 0;
    const productTotals = {};

    // Iterate through all bills
    for (const [billName, products] of Object.entries(bills)) {
        products.forEach(product => {
            // Accumulate totals for each product
            if (!productTotals[product.name]) {
                productTotals[product.name] = { totalQuantity: 0, totalValue: 0 };
            }
            productTotals[product.name].totalQuantity += product.quantity;
            productTotals[product.name].totalValue += product.quantity * product.price;

            // Add to grand total
            grandTotal += product.quantity * product.price;
        });
    }

    // Display Grand Total
    const grandTotalElement = document.createElement('p');
    grandTotalElement.textContent = `Totaal alle rekeningen: €${grandTotal.toFixed(2)}`;
    summaryContainer.appendChild(grandTotalElement);

    // Display Product-Wise Totals
    const productSummaryList = document.createElement('ul');
    for (const [productName, totals] of Object.entries(productTotals)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${productName}: Quantity = ${totals.totalQuantity}, Totaal bedrag = €${totals.totalValue.toFixed(2)}`;
        productSummaryList.appendChild(listItem);
    }

    summaryContainer.appendChild(productSummaryList);
}
