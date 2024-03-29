import React, { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const sendMessage = async () => {
    console.log(`Sending message: ${message}`);
    try {
      const response = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(`Received response: ${data.response}`);
        setResponses([...responses, { query: message, reply: data.response }]);
        setMessage('');
      }
    } catch (error) {
      console.error(`Failed to send message. Error: ${error}`, error);
      alert(`Error sending message: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Chat with ALUMINAI Bot</h2>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {responses.map((exchange, index) => (
          <div key={index}>
            <p><strong>You:</strong> {exchange.query}</p>
            <p><strong>Bot:</strong> {exchange.reply}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;