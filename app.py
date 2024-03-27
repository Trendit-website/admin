from flask import Flask, jsonify

app = Flask(__name__)

# Sample data for users
users = [
    {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com"
    },
    {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com"
    }
]

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

# Endpoint to get a single user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((user for user in users if user["id"] == user_id), None)
    if user:
        return jsonify({
            "message": "User fetched successfully",
            "status": "success",
            "status_code": 200,
            "user": user
        })
    else:
        return jsonify({
            "message": "User not found",
            "status": "error",
            "status_code": 404
        }), 404

if __name__ == '__main__':
    app.run(debug=True)
