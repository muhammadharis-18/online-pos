async function placeOrder() {
    if (cart.length === 0) return alert("Select items first!");

    const custName = document.getElementById('cust-name').value;
    const custPhone = document.getElementById('cust-phone').value;
    const custAddr = document.getElementById('cust-address').value;
    const orderNum = Math.floor(1000 + Math.random() * 9000);

    const orderData = {
        orderNum: orderNum,
        items: cart,
        total: total,
        customer: { name: custName, phone: custPhone, address: custAddr },
        status: "New",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        await db.collection("orders").add(orderData);
        
        // Generate Receipt URL
        const itemsJson = JSON.stringify(cart);
        const receiptUrl = `/receipt?num=${orderNum}&name=${custName}&phone=${custPhone}&total=${total}&items=${encodeURIComponent(itemsJson)}`;
        
        // Open receipt in new tab for printing
        window.open(receiptUrl, '_blank');

        alert("Order Placed Successfully!");
        cart = []; total = 0;
        document.getElementById('total-display').innerText = "0 PKR";
        // Reset form
        document.getElementById('cust-name').value = "";
        document.getElementById('cust-phone').value = "";
    } catch (e) {
        alert("Sync Error: " + e.message);
    }
}
