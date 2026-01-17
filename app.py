from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os
import smtplib
import re
from email.message import EmailMessage

app = Flask(__name__)
app.secret_key = os.urandom(24)

# --- EMAIL CONFIGURATION ---
EMAIL_ADDRESS = "your-email@gmail.com" # Replace with your email
EMAIL_PASSWORD = "your-app-password"    # Use a Google "App Password"

def is_valid_email(email):
    # Professional regex to check if email is valid
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    return re.search(regex, email)

@app.route("/")
def home():
    if "user" not in session: return redirect(url_for("login"))
    return render_template("index.html")

@app.route("/send_receipt_email", methods=["POST"])
def send_receipt_email():
    data = request.json
    email = data.get("email")
    
    if not is_valid_email(email):
        return jsonify({"status": "error", "message": "Invalid Email Address"}), 400

    # Create the email content
    msg = EmailMessage()
    msg['Subject'] = f"Receipt from YUMZO: Order #{data.get('orderNum')}"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    
    # Simple formatted text body
    content = f"Thank you for choosing YUMZO!\n\nOrder #{data.get('orderNum')}\nTotal: {data.get('total')} PKR\n\nEnjoy your meal!"
    msg.set_content(content)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return jsonify({"status": "success", "message": "Email sent!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Keep your other routes (login, kitchen, receipt) here...
