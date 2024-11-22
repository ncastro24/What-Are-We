from flask import Flask, request, jsonify

# Initialize the Flask app
app = Flask(__name__)

# Mock chatbot logic (replace with your AI model logic)
def chatbot_logic(user_message):
    # Example: simple echo response
    return f"You said: {user_message}"

# Define the API route
@app.route('/chat', methods=['POST'])
def chat():
    # Parse the JSON request
    data = request.get_json()
    user_message = data.get('user_message', '')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Get chatbot response
    bot_response = chatbot_logic(user_message)

    # Return response as JSON
    return jsonify({'response': bot_response})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
