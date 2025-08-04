import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './ChatWidget'; // This makes the widget available globally

// Only render the main app if the root element exists
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
