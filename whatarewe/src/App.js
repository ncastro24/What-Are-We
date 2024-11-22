import React from 'react';
import Chatbot from './whatarewe-bot';
import logo from "./whatarewe.png";

function App() {
  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <Chatbot />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7d3cb',
  },
  logo: {
    width: '250px',
    marginBottom: '20px',
  }
};

export default App;
