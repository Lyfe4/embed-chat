# Backend Integration Guide

Your chat widget now supports full backend integration with session management, origin tracking, and n8n webhook connectivity for AI bot responses.

## 🚀 Quick Start

### 1. Configure Your Backend URLs

**Option A: Environment Variables (Recommended)**
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual URLs
REACT_APP_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
REACT_APP_API_BASE_URL=https://your-backend-api.com
REACT_APP_API_KEY=your-api-key-here
```

**Option B: Direct Configuration**
```javascript
const chat = window.createChat('chat-container', {
    title: 'AI Support',
    n8nWebhookUrl: 'https://your-n8n-instance.com/webhook/chat',
    baseUrl: 'https://your-backend-api.com',
    apiKey: 'your-api-key-here'
});
```

### 2. Test Your Integration

1. Start your React app: `npm start`
2. Open `embed-with-backend.html` in your browser
3. Replace the placeholder URLs with your actual endpoints
4. Send a test message

## 📡 n8n Webhook Integration

### Webhook Payload Structure

Your n8n workflow will receive this payload (confirmed working format):

```json
{
  "chatInput": "Hello, I need help",
  "sessionId": "chat_1704067200000_abc123def",
  "action": "sendMessage",
  "metadata": {
    "origin": "https://example.com",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "messageId": 1704067200001,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### Expected Response Format

Your n8n workflow should return (confirmed working format):

```json
{
  "output": "Hello! How can I help you today?"
}
```

**Note:** The response must use `"output"` as the key, not `"response"` or `"message"`.

### n8n Workflow Setup

1. Create a new workflow in n8n
2. Add a **Webhook** node as the trigger
3. Set the webhook path (e.g., `/webhook/chat`)
4. Add your AI processing nodes (OpenAI, Claude, etc.)
5. Return the response in the expected format

## 🗄️ Backend API (Optional)

If you want to persist chat sessions and messages, implement these endpoints:

### Session Management

**Create Session**
```
POST /api/sessions
Content-Type: application/json
Authorization: Bearer your-api-key

{
  "sessionId": "chat_1704067200000_abc123def",
  "origin": "https://example.com",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Get Chat History**
```
GET /api/sessions/{sessionId}/messages
Authorization: Bearer your-api-key
```

**Save Message**
```
POST /api/sessions/{sessionId}/messages
Content-Type: application/json
Authorization: Bearer your-api-key

{
  "id": 1704067200001,
  "text": "Hello, I need help",
  "sender": "user",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "sessionId": "chat_1704067200000_abc123def",
  "origin": "https://example.com"
}
```

## 🔧 Configuration Options

### ChatService Configuration

```javascript
const chatConfig = {
  baseUrl: 'https://your-backend-api.com',        // Optional: For session persistence
  n8nWebhookUrl: 'https://your-n8n.com/webhook', // Required: For AI responses
  apiKey: 'your-api-key-here'                     // Optional: For authentication
};
```

### Widget Configuration

```javascript
const widget = window.createChat('container-id', {
  title: 'Chat Title',
  placeholder: 'Type your message...',
  position: 'inline', // 'inline', 'fixed', 'fullwidth'
  
  // Backend configuration
  baseUrl: 'https://your-backend-api.com',
  n8nWebhookUrl: 'https://your-n8n.com/webhook/chat',
  apiKey: 'your-api-key-here'
});
```

## 🎯 Embedding Options

### 1. iframe Embedding (Simplest)

```html
<iframe 
  src="https://your-chat-domain.com" 
  width="400" 
  height="600"
  frameborder="0">
</iframe>
```

### 2. JavaScript Widget Embedding

```html
<!-- Load the widget script -->
<script src="https://your-chat-domain.com/widget.js"></script>

<!-- Create chat instance -->
<div id="my-chat"></div>
<script>
  const chat = window.createChat('my-chat', {
    title: 'Support Chat',
    n8nWebhookUrl: 'https://your-n8n.com/webhook/chat'
  });
</script>
```

### 3. Fixed Position Chat (Like Intercom)

```html
<div id="floating-chat"></div>
<script>
  const chat = window.createChat('floating-chat', {
    title: 'Help & Support',
    position: 'fixed',
    n8nWebhookUrl: 'https://your-n8n.com/webhook/chat'
  });
</script>
```

## 🐛 Debugging

### Debug Tools

The chat widget exposes debug information:

```javascript
// Get session information
console.log(window.chatDebug.getSessionInfo());

// Get current messages
console.log(window.chatDebug.messages);

// Access the chat service directly
console.log(window.chatDebug.chatService);
```

### Common Issues

**1. CORS Errors**
- Ensure your n8n instance allows requests from your domain
- Add proper CORS headers to your backend API

**2. Webhook Not Receiving Data**
- Check your n8n webhook URL is correct
- Verify the webhook is active in n8n
- Check n8n execution logs

**3. Session Not Persisting**
- Verify your backend API endpoints are working
- Check API key authentication
- Ensure proper CORS configuration

## 🔒 Security Considerations

1. **API Keys**: Never expose API keys in client-side code for production
2. **CORS**: Configure proper CORS policies on your backend
3. **Rate Limiting**: Implement rate limiting on your n8n webhook
4. **Input Validation**: Validate all inputs in your n8n workflow
5. **Authentication**: Consider implementing user authentication for sensitive chats

## 📊 Session Management

### Session ID Format
```
chat_{timestamp}_{random_string}
Example: chat_1704067200000_abc123def
```

### Origin Tracking
The widget automatically tracks:
- `window.location.origin` - The domain where the chat is embedded
- `document.referrer` - How the user arrived at the page
- `navigator.userAgent` - Browser information

### Message History
- Last 10 messages are sent with each request for context
- Full history can be loaded from backend if available
- Messages are automatically saved if backend is configured

## 🚀 Production Deployment

1. **Build the widget**: `npm run build`
2. **Host the built files** on your CDN/server
3. **Configure environment variables** for production
4. **Set up your n8n workflow** with proper error handling
5. **Test embedding** on your target websites

## 📝 Example n8n Workflow

```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "chat",
        "httpMethod": "POST"
      }
    },
    {
      "name": "OpenAI",
      "type": "n8n-nodes-base.openAi",
      "parameters": {
        "operation": "chat",
        "model": "gpt-3.5-turbo",
        "messages": {
          "messageValues": [
            {
              "role": "system",
              "content": "You are a helpful customer support assistant."
            },
            {
              "role": "user",
              "content": "={{ $json.message }}"
            }
          ]
        }
      }
    },
    {
      "name": "Respond",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "responseBody": {
          "response": "={{ $json.choices[0].message.content }}"
        }
      }
    }
  ]
}
```

## 🆘 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify your n8n webhook is receiving requests
3. Test your backend API endpoints directly
4. Use the debug tools provided in the widget

For more help, check the example files:
- `embed-with-backend.html` - Complete working example
- `.env.example` - Environment configuration template
