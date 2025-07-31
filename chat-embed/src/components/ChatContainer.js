import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../styles/ChatContainer.css';

const ChatContainer = ({ 
  title = "Chat", 
  placeholder = "Type your message...",
  onSendMessage,
  initialMessages = []
}) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Call external handler if provided
    if (onSendMessage) {
      onSendMessage(newMessage);
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      ...message,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>{title}</h3>
      </div>
      <MessageList messages={messages} />
      <MessageInput 
        onSendMessage={handleSendMessage}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ChatContainer;