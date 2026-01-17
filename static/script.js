let cart = [];
let total = 0;

function addItem() {
    const name = document.getElementById("name").value;
    const price = Number(document.getElementById("price").value);
    const qty = Number(document.getElementById("qty").value);

    if (!name || price <= 0 || qty <= 0) return;

    cart.push({ name, price, qty });
    total += price * qty;

    render();
}

function render() {
    const table = document.getElementById("table");
    table.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
        </tr>
    `;

    cart.forEach(i => {
        table.innerHTML += `
            <tr>
                <td>${i.name}</td>
                <td>${i.qty}</td>
                <td>${i.price}</td>
            </tr>
        `;
    });

    document.getElementById("total").innerText = total;
}

function saveOrder() {
    fetch("/save_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total: total })
    })
    .then(res => res.json())
    .then(data => {
        alert("Order Saved! ID: " + data.order_id);
        cart = [];
        total = 0;
        render();
    });
}
