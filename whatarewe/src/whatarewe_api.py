from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from feelings import analyze_conversation
import json

app = Flask(__name__)
CORS(app) #stops the axios OPTION request and actually sends POST

def whatarewe(user_message):
    return analyze_conversation(user_message)


@app.route('/chat', methods=['POST'])
def chat():

    data = request.get_json()
    user_message = data.get('user_message', '')

    if not user_message:
        return jsonify({'error': 'Please input a message'}), 400

    bot_response = whatarewe(user_message)

    # return as json
    return jsonify({'response': bot_response})


if __name__ == '__main__':
    app.run(debug=True)
