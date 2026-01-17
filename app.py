from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

# ---------- DATABASE ----------
def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/add_order", methods=["POST"])
def add_order():
    data = request.json
    total = data["total"]
    items = data["items"]

    conn = get_db()
    cur = conn.cursor()

    cur.execute("INSERT INTO orders (total, status, date) VALUES (?, ?, ?)",
                (total, "Completed", datetime.now()))
    order_id = cur.lastrowid

    for item in items:
        cur.execute(
            "INSERT INTO order_items (order_id, name, qty, price) VALUES (?, ?, ?, ?)",
            (order_id, item["name"], item["qty"], item["price"])
        )

    conn.commit()
    conn.close()

    return jsonify({"message": "Order saved successfully", "order_id": order_id})

if __name__ == "__main__":
    app.run(debug=True)
