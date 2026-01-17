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
    if (cart.length === 0) return alert("Select items first!");

    const orderData = {
        orderNum: Math.floor(100 + Math.random() * 900),
        items: cart,
        total: total,
        source: document.getElementById('order-source').value,
        payment: document.getElementById('payment-method').value,
        status: "New",
        // This line is critical for the Kitchen screen to sort correctly
        createdAt: firebase.firestore.Timestamp.now() 
    };

    try {
        await db.collection("orders").add(orderData);
        alert("Success! Order sent to Kitchen.");
        cart = []; total = 0;
        document.getElementById('total-display').innerText = "0 PKR";
    } catch (e) {
        alert("Firebase Error: Check Internet Connection");
    }
}
