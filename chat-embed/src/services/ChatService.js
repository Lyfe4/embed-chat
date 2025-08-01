class ChatService {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || process.env.REACT_APP_API_BASE_URL || '';
    this.n8nWebhookUrl = config.n8nWebhookUrl || process.env.REACT_APP_N8N_WEBHOOK_URL;
    this.sessionId = null;
    this.origin = null;
    this.apiKey = config.apiKey || process.env.REACT_APP_API_KEY;
  }

  // Initialize session with origin tracking
  async initializeSession(origin = null) {
    try {
      // Generate session ID if not provided by backend
      this.sessionId = this.generateSessionId();
      this.origin = origin || window.location.origin;
      
      // If you have a backend endpoint to register sessions
      if (this.baseUrl) {
        const response = await fetch(`${this.baseUrl}/api/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
          },
          body: JSON.stringify({
            sessionId: this.sessionId,
            origin: this.origin,
            timestamp: new Date().toISOString()
          })
        });

        if (response.ok) {
          const data = await response.json();
          this.sessionId = data.sessionId || this.sessionId;
        }
      }

      return this.sessionId;
    } catch (error) {
      console.error('Failed to initialize session:', error);
      // Fallback to local session ID
      this.sessionId = this.generateSessionId();
      return this.sessionId;
    }
  }

  // Generate unique session ID in the format that @n8n/chat might expect
  generateSessionId() {
    // Try a simpler format that might match @n8n/chat expectations
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Send message to n8n workflow using the exact format from @n8n/chat package
  async sendMessage(message, messageHistory = []) {
    if (!this.sessionId) {
      await this.initializeSession();
    }

    try {
      // Use the exact format that @n8n/chat package uses for embedded mode
      const payload = {
        chatInput: message.text,
        sessionId: this.sessionId
        // Removing action field - @n8n/chat package doesn't include it by default
      };

      console.log('Sending payload to n8n (embedded format):', payload);
      
      // Try without query parameter first (embedded mode might not need it)
      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('n8n response status:', response.status);
      
      const data = await response.json();
      console.log('n8n response data:', data);

      if (!response.ok) {
        // If n8n workflow is failing, provide a helpful fallback response
        if (response.status === 500 && data.message === "Error in workflow") {
          return {
            id: `bot_${Date.now()}`,
            text: `I received your message "${message.text}". The n8n workflow is active but there may be an issue with the AI configuration or response format. The workflow expects embedded mode format.`,
            sender: 'bot',
            timestamp: new Date(),
            sessionId: this.sessionId,
            error: true
          };
        }
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.message || 'Unknown error'}`);
      }
      
      // Return formatted bot response - @n8n/chat expects different response formats
      return {
        id: `bot_${Date.now()}`,
        text: data.output || data.response || data.message || data.text || 'Sorry, I encountered an error.',
        sender: 'bot',
        timestamp: new Date(),
        sessionId: this.sessionId
      };

    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Return error message to user
      return {
        id: `bot_${Date.now()}`,
        text: 'Sorry, I\'m having trouble connecting right now. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        sessionId: this.sessionId,
        error: true
      };
    }
  }

  // Get chat history (if backend supports it)
  async getChatHistory() {
    if (!this.sessionId || !this.baseUrl) {
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/sessions/${this.sessionId}/messages`, {
        headers: {
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.messages || [];
      }
    } catch (error) {
      console.error('Failed to get chat history:', error);
    }

    return [];
  }

  // Save message to backend (if supported)
  async saveMessage(message) {
    if (!this.baseUrl || !this.sessionId) {
      return;
    }

    try {
      await fetch(`${this.baseUrl}/api/sessions/${this.sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          ...message,
          sessionId: this.sessionId,
          origin: this.origin
        })
      });
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  }

  // Get session info
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      origin: this.origin
    };
  }

  // Reset session
  resetSession() {
    this.sessionId = null;
    this.origin = null;
  }
}

export default ChatService;
