import React, { useState, useRef, useEffect } from 'react';
import '../styles/MessageInput.css';

const MessageInput = ({ onSendMessage, placeholder = "Type your message...", disabled = false }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue && !disabled) {
      onSendMessage(trimmedValue);
      setInputValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
    }
  };

  // Focus input when component mounts
  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          className={`message-textarea ${disabled ? 'disabled' : ''}`}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Please wait..." : placeholder}
          rows={1}
          disabled={disabled}
          style={{
            resize: 'none',
            minHeight: '20px',
            maxHeight: '100px'
          }}
        />
        <button 
          type="submit" 
          className={`send-button ${disabled ? 'disabled' : ''}`}
          disabled={!inputValue.trim() || disabled}
          title={disabled ? "Please wait for response" : "Send message"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
