import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <div className="error-text">
          <p>{message}</p>
          {onRetry && (
            <button className="retry-button" onClick={onRetry}>
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
