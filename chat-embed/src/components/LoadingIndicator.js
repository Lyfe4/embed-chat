import React from 'react';
import '../styles/LoadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <div className="typing-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <span className="loading-text">AI is typing...</span>
    </div>
  );
};

export default LoadingIndicator;
