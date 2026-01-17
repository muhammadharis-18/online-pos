const firebaseConfig = {
    apiKey: "AIzaSyC6wmZVwGrjFM-fkIY4nRIpXdfCCbXaRh4",
    authDomain: "yumzo-dee28.firebaseapp.com",
    projectId: "yumzo-dee28",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    document.getElementById('total-display').innerText = total + " PKR";
}

async function placeOrder() {
    if (cart.length === 0) return alert("Your cart is empty!");

    const orderData = {
        orderNum: Math.floor(100 + Math.random() * 900),
        items: cart,
        total: total,
        source: document.getElementById('source').value,
        payment: document.getElementById('payment').value,
        status: "New",
        // Critical: Use serverTimestamp for perfect sorting on the Kitchen page
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        await db.collection("orders").add(orderData);
        alert("Order sent to Kitchen!");
        cart = []; total = 0;
        document.getElementById('total-display').innerText = "0 PKR";
    } catch (e) {
        alert("Sync Error: " + e.message);
    }
}
