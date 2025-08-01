import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatContainer from './components/ChatContainer';
import './styles/ChatContainer.css';
import './styles/MessageList.css';
import './styles/Message.css';
import './styles/MessageInput.css';

class ChatWidget {
  constructor(containerId, config = {}) {
    this.containerId = containerId;
    this.config = {
      title: 'Chat',
      placeholder: 'Type your message...',
      initialMessages: [],
      onSendMessage: this.defaultMessageHandler,
      position: 'inline', // 'inline', 'fixed', 'fullwidth'
      // Backend configuration
      chatConfig: {
        baseUrl: config.baseUrl || '',
        n8nWebhookUrl: config.n8nWebhookUrl || '',
        apiKey: config.apiKey || ''
      },
      ...config
    };
    this.root = null;
    this.container = null;
  }

  defaultMessageHandler = (message) => {
    console.log('Message sent:', message);
    
    // Simulate a bot response after 1 second
    setTimeout(() => {
      this.addMessage({
        text: `You said: "${message.text}"`,
        sender: 'bot'
      });
    }, 1000);
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return false;
    }

    // Apply position-specific styling
    this.applyContainerStyles();
    
    this.root = createRoot(this.container);
    this.render();
    return true;
  }

  applyContainerStyles() {
    if (this.config.position === 'fixed') {
      this.container.style.position = 'fixed';
      this.container.style.bottom = '20px';
      this.container.style.right = '20px';
      this.container.style.zIndex = '1000';
    } else if (this.config.position === 'fullwidth') {
      this.container.style.width = '100%';
    }
  }

  render() {
    const ChatApp = () => (
      <ChatContainer
        title={this.config.title}
        placeholder={this.config.placeholder}
        onSendMessage={this.config.onSendMessage || this.defaultMessageHandler}
        initialMessages={this.config.initialMessages}
        chatConfig={this.config.chatConfig}
      />
    );

    this.root.render(<ChatApp />);
  }

  addMessage(message) {
    const newMessage = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      ...message
    };
    
    this.config.initialMessages.push(newMessage);
    this.render();
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.render();
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

// Make it globally available
if (typeof window !== 'undefined') {
  window.ChatWidget = ChatWidget;
  
  // Convenience function
  window.createChat = function(containerId, config) {
    const widget = new ChatWidget(containerId, config);
    widget.init();
    return widget;
  };
}

export default ChatWidget;
