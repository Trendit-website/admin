from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app

# Sample data for users
users = [
    {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "earning": 100,
        "advertise": 20,
        "date": "2024-03-01"
    },
    {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com",
        "earning": 150,
        "advertise": 30,
        "date": "2024-03-10"
    }
]

# Sample data for dashboard
dashboard_data = {
    "total_received_payments": 5000.0,
    "total_payouts": 3000.0,
    "received_payments_per_month": {
        "2023-01": 2000.0,
        "2023-02": 1500.0,
        "2023-03": 1500.0
    },
    "payouts_per_month": {
        "2023-01": 1000.0,
        "2023-02": 1000.0,
        "2023-03": 1000.0
    },
    "payment_activities_per_month": {
        "2023-01": 3,
        "2023-02": 2,
        "2023-03": 2
    }
}


# Endpoint to get all users
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify({
        "message": "All users fetched successfully",
        "status": "success",
        "status_code": 200,
        "total": len(users),
        "users": users
    })

# Endpoint to get dashboard data
@app.route('/dashboard_data', methods=['POST'])
def get_dashboard_data():
    return jsonify(dashboard_data)

if __name__ == '__main__':
    app.run(debug=True)
