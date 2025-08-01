import React from 'react';
import ChatContainer from './components/ChatContainer';
import './App.css';

function App() {
  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    // This is where you would handle sending the message to your backend
    // For now, we'll just log it
  };

  // Backend configuration from environment variables
  const chatConfig = {
    baseUrl: process.env.REACT_APP_API_BASE_URL || '',
    n8nWebhookUrl: process.env.REACT_APP_N8N_WEBHOOK_URL || '',
    apiKey: process.env.REACT_APP_API_KEY || ''
  };

  return (
    <div className="App">
      <ChatContainer 
        title="Support Chat"
        placeholder="How can we help you?"
        onSendMessage={handleSendMessage}
        initialMessages={[]}
        chatConfig={chatConfig}
      />
    </div>
  );
}

export default App;
