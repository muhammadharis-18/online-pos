from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os

app = Flask(__name__)
# Generate a secure random key for your session
app.secret_key = os.urandom(24)

@app.route("/")
def home():
    # Only allow access if logged in
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Simple secure password for Yumzo Staff
        if request.form.get("password") == "yumzo123":
            session["user"] = "staff"
            return redirect(url_for("home"))
    return render_template("login.html")

@app.route("/kitchen")
def kitchen():
    return render_template("kitchen.html")

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("login"))
@app.route("/receipt")
def receipt():
    return render_template("receipt.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

