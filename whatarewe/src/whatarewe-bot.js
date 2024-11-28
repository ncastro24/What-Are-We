import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'text', text: 'Welcome to What Are We!', sender: 'bot' },
    {
      type: 'dropdown',
      text: 'What kind of relationship do you want with this person?',
      options: ['Friends', 'More than friends', 'Dating', 'MARRY ME!'],
      sender: 'bot',
    },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [dropdownActive, setDropdownActive] = useState(true);

  // dropdown selection
  const handleDropdownSelect = (selectedOption) => {
    const userResponse = { type: 'text', text: selectedOption, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userResponse]);

    const botResponse = {
      type: 'text',
      text: `You selected: ${selectedOption}. I will now check to see if the person feels the same! Please paste the text message you want me to analyze.`,
      sender: 'bot',
    };

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setDropdownActive(false);
    }, 1000);
  };

  // user message
  const handleSendMessage = async () => {
    if (!userMessage) return;

    // add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userMessage, type: 'text' },
    ]);

    try {
      // send user message to flask
      const response = await axios.post('http://127.0.0.1:5000/chat',
      {user_message: userMessage},
      {headers: {'Content-Type': 'application/json',},}); //without this axios sends an OPTIONS req instead of POST

      // bot response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.data.response, type: 'text' }, //returns the response as text
      ]);
    } catch (error) {
      console.error('Error communicating with the API:', error);
       setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Error: Unable to connect to chatbot.', type: 'text' },
      ]);
    }

    // clear input field
    setUserMessage('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#ffcccc' : '#ffffcc',
            }}
          >
            {msg.type === 'text' && msg.text}
            {msg.type === 'dropdown' && (
              <div>
                <p>{msg.text}</p>
                <select
                  onChange={(e) => handleDropdownSelect(e.target.value)}
                  defaultValue=""
                  style={styles.dropdown}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {msg.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder={
            dropdownActive
              ? 'Choose an option...'
              : 'Paste your message...'
          }
          style={styles.input}
          disabled={dropdownActive} // disable input if dropdown is active
        />
        <button
          onClick={handleSendMessage}
          style={styles.button}
          disabled={dropdownActive} // disable button if dropdown is active
        >
          ❤
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chatWindow: {
    width: '100%',
    height: '400px',
    border: '1px solid #ff5757',
    borderRadius: '8px',
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    backgroundColor: '#fcece9',
  },
  message: {
    padding: '10px',
    borderRadius: '8px',
    maxWidth: '80%',
  },
  inputContainer: {
    display: 'flex',
    marginTop: '10px',
    gap: '5px',
  },
  input: {
    flex: '1',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ff5757',
    backgroundColor: '#fcece9',
  },
  button: {
    color: 'red',
    fontSize: '40px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  dropdown: {
    padding: '5px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

export default Chatbot;
