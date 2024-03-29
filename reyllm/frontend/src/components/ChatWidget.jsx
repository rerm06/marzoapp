import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatWidget = ({ apiUrl }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Initialize chat widget or fetch history if needed
    console.log("Initializing Chat Widget...");
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) {
      console.log("Empty message, not sending.");
      return;
    }
    try {
      console.log("Sending message:", input);
      const response = await axios.post(`${apiUrl}/api/messages`, { message: input });
      setMessages([...messages, { type: 'user', text: input }, { type: 'bot', text: response.data.message }]);
      setInput('');
      console.log("Message sent successfully:", response.data.message);
    } catch (error) {
      console.error('Failed to send message:', error.message, error.stack);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="chat-widget">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWidget;