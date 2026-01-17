from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os

app = Flask(__name__)
app.secret_key = os.urandom(24) # Professional way to handle sessions

@app.route("/")
def home():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Professional tip: You can later connect this to Firebase Auth
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

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
