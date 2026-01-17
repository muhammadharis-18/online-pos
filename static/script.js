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
    document.getElementById('total-display').innerText = total;
}

async function placeOrder() {
    if (cart.length === 0) return alert("Please add items!");

    const order = {
        orderNum: Math.floor(100 + Math.random() * 900),
        items: cart,
        total: total,
        source: document.getElementById('source').value,
        status: "New",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("orders").add(order);
    alert("Order Sent to Kitchen!");
    cart = []; total = 0;
    document.getElementById('total-display').innerText = 0;
}
