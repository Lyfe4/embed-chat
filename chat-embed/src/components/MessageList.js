import React, { useEffect, useRef } from 'react';
import Message from './Message';
import '../styles/MessageList.css';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;