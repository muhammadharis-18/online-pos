from flask import Flask, render_template, request, jsonify, session, redirect
import os

app = Flask(__name__)
app.secret_key = "yumzo_secure_123"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/kitchen")
def kitchen():
    return render_template("kitchen.html")

# This is just a backup endpoint
@app.route("/ping", methods=["POST"])
def ping():
    return jsonify({"status": "server_is_alive"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
