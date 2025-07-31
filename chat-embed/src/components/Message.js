import React from 'react';
import '../styles/Message.css';

const Message = ({ message }) => {
  const { text, sender, timestamp } = message;
  const isUser = sender === 'user';

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${isUser ? 'message-user' : 'message-bot'}`}>
      <div className="message-bubble">
        <p className="message-text">{text}</p>
        <span className="message-time">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;