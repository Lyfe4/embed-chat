import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatService from '../services/ChatService';
import '../styles/ChatContainer.css';

const ChatContainer = ({ 
  title = "Chat", 
  placeholder = "Type your message...",
  onSendMessage,
  initialMessages = [],
  chatConfig = {}
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const chatServiceRef = useRef(null);

  // Initialize ChatService
  useEffect(() => {
    chatServiceRef.current = new ChatService(chatConfig);
    
    // Initialize session when component mounts
    const initSession = async () => {
      try {
        await chatServiceRef.current.initializeSession();
        
        // Load chat history if available
        const history = await chatServiceRef.current.getChatHistory();
        if (history.length > 0) {
          setMessages(prev => [...prev, ...history]);
        }
      } catch (error) {
        console.error('Failed to initialize chat session:', error);
      }
    };

    initSession();
  }, [chatConfig]);

  const handleSendMessage = async (messageText) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Save user message to backend
      if (chatServiceRef.current) {
        await chatServiceRef.current.saveMessage(newMessage);
        
        // Send message to n8n and get bot response
        const botResponse = await chatServiceRef.current.sendMessage(newMessage, messages);
        
        // Add bot response
        setMessages(prev => [...prev, botResponse]);
        
        // Save bot response to backend
        await chatServiceRef.current.saveMessage(botResponse);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage = {
        id: `error_${Date.now()}`,
        text: 'Sorry, I\'m having trouble connecting right now. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
    
    // Call external handler if provided (for backward compatibility)
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

  // Expose session info for debugging
  const getSessionInfo = () => {
    return chatServiceRef.current?.getSessionInfo() || {};
  };

  // Add this to window for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.chatDebug = {
        getSessionInfo,
        messages,
        chatService: chatServiceRef.current
      };
    }
  }, [messages]);

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
