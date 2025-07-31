import React from 'react';
import ChatContainer from './components/ChatContainer';
import './App.css';

function App() {
  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    // This is where you would handle sending the message to your backend
    // For now, we'll just log it
  };

  const sampleMessages = [
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat UI Demo</h1>
        <div className="chat-demo">
          <ChatContainer 
            title="Support Chat"
            placeholder="Ask me anything..."
            onSendMessage={handleSendMessage}
            initialMessages={sampleMessages}
          />
        </div>
      </header>
    </div>
  );
}

export default App;