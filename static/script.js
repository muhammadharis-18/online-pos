const firebaseConfig = {
    apiKey: "AIzaSyC6wmZVwGrjFM-fkIY4nRIpXdfCCbXaRh4",
    authDomain: "yumzo-dee28.firebaseapp.com",
    projectId: "yumzo-dee28",
    storageBucket: "yumzo-dee28.firebasestorage.app",
    messagingSenderId: "981056674227",
    appId: "1:981056674227:web:c5d30a8ff1f0a377ea13c6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();;

let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    document.getElementById('total-display').innerText = total;
}

async function placeOrder() {
    if (cart.length === 0) return alert("Cart is empty!");

    const orderData = {
        orderNum: Date.now().toString().slice(-4),
        items: cart,
        total: total,
        source: document.getElementById('order-source').value,
        payment: document.getElementById('payment-method').value,
        status: "New",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        // 1. Send to Firebase (Real-time Kitchen)
        await db.collection("orders").add(orderData);
        
        // 2. Send to Python (Local Backup)
        await fetch("/save_order", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderData)
        });

        alert("Order Placed!");
        cart = []; total = 0;
        document.getElementById('total-display').innerText = 0;
    } catch (e) {
        console.error("Error: ", e);
    }
}
