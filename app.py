from flask import Flask, render_template, request, jsonify, session, redirect
import sqlite3
from datetime import datetime

app = Flask(__name__)
app.secret_key = "yumzo_secure_key"

def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    if "user" not in session:
        return redirect("/login")
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Simple local auth for now
        if request.form.get("password") == "yumzo123":
            session["user"] = "cashier"
            return redirect("/")
    return render_template("login.html")

@app.route("/kitchen")
def kitchen():
    return render_template("kitchen.html")

@app.route("/save_order", methods=["POST"])
def save_order():
    data = request.json
    conn = get_db()
    cur = conn.cursor()
    
    # Save to local SQLite as a backup/history
    cur.execute("INSERT INTO orders (total, date, source) VALUES (?, ?, ?)",
                (data['total'], datetime.now(), data['source']))
    
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
