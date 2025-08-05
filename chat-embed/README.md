# 💬 Embeddable Chat Widget

A modern, production-ready React chat widget with n8n integration for AI-powered conversations. Perfect for customer support, lead generation, or any interactive chat experience.

![Chat Widget Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![n8n](https://img.shields.io/badge/n8n-Compatible-orange)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Chat**: Instant messaging with AI-powered responses
- **n8n Integration**: Seamless webhook integration with n8n workflows
- **Session Management**: Persistent chat sessions with origin tracking
- **Message History**: Optional backend integration for message persistence

### 🎨 User Experience
- **Markdown Rendering**: Full markdown support for AI responses with syntax highlighting
- **Code Block Features**: Syntax highlighting and one-click copy buttons for code
- **Loading Indicators**: Animated typing dots during AI processing
- **Auto-resize Input**: Text area grows with content
- **Error Handling**: Graceful error messages with retry functionality
- **Responsive Design**: Works perfectly on desktop and mobile
- **Accessibility**: WCAG compliant with proper ARIA labels

### 🔧 Developer Experience
- **Multiple Embedding Options**: Inline, fixed position, or full-width
- **Easy Configuration**: Environment variables or runtime configuration
- **Debug Tools**: Built-in debugging utilities
- **TypeScript Ready**: Full TypeScript support (optional)
- **Modern Architecture**: Clean React components with hooks

## 🚀 Quick Start

### 1. Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/chat-embed.git
cd chat-embed

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your n8n webhook URL
```

### 2. Development

```bash
# Start development server
npm start

# Visit http://localhost:3000 to see the chat widget
# Open public/embed-example.html for embedding examples
```

### 3. Production Build

```bash
# Build for production
npm run build

# The build folder contains optimized files ready for deployment
```

## 🔗 n8n Integration

### Quick Setup

1. **Create n8n Workflow**: Set up a webhook trigger in n8n
2. **Configure Environment**: Add your webhook URL to `.env`
3. **Test Integration**: Send a message to verify the connection

```env
REACT_APP_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
```

### Expected Payload Format

Your n8n workflow receives:
```json
{
  "chatInput": "User message text",
  "sessionId": "session-1234567890-abc123"
}
```

### Expected Response Format

Your n8n workflow should return:
```json
{
  "output": "AI response text"
}
```

> 📖 **Detailed Integration Guide**: See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for complete setup instructions.

## 🎯 Embedding Options

### 1. Inline Embedding

Perfect for support pages or contact forms:

```html
<div id="chat-container"></div>
<script src="https://your-domain.com/widget.js"></script>
<script>
  const chat = window.createChat('chat-container', {
    title: 'Customer Support',
    n8nWebhookUrl: 'https://your-n8n.com/webhook/chat'
  });
</script>
```

### 2. Fixed Position (Like Intercom)

Floating chat button in the corner:

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

### 3. Full Width

Takes the full width of its container:

```html
<div id="fullwidth-chat"></div>
<script>
  const chat = window.createChat('fullwidth-chat', {
    title: 'AI Assistant',
    position: 'fullwidth',
    n8nWebhookUrl: 'https://your-n8n.com/webhook/chat'
  });
</script>
```

> 🎨 **Live Examples**: Open `public/embed-example.html` to see all embedding options in action.

## ⚙️ Configuration Options

```javascript
const chat = window.createChat('container-id', {
  // Display Options
  title: 'Chat Title',                    // Header title
  placeholder: 'Type your message...',    // Input placeholder
  position: 'inline',                     // 'inline', 'fixed', 'fullwidth'
  
  // Backend Integration
  n8nWebhookUrl: 'https://...',          // Required: n8n webhook URL
  baseUrl: 'https://...',                // Optional: Backend API for persistence
  apiKey: 'your-key',                    // Optional: API authentication
  
  // Initial Messages
  initialMessages: [                      // Optional: Pre-populate chat
    {
      id: 1,
      text: 'Hello! How can I help?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]
});
```

## 🛠️ Development

### Project Structure

```
src/
├── components/          # React components
│   ├── ChatContainer.js    # Main chat container
│   ├── MessageList.js      # Message display
│   ├── MessageInput.js     # Input component
│   ├── Message.js          # Individual message with markdown
│   ├── CodeBlock.js        # Syntax highlighted code blocks
│   ├── LoadingIndicator.js # Typing animation
│   └── ErrorMessage.js     # Error handling
├── services/           # Business logic
│   └── ChatService.js     # API communication
├── styles/            # Component styles
│   ├── CodeBlock.css      # Code block styling
│   └── ...               # Other component styles
└── ChatWidget.js      # Widget entry point
```

### Available Scripts

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Debug Tools

The widget exposes debugging utilities:

```javascript
// Get session information
console.log(window.chatDebug.getSessionInfo());

// View current messages
console.log(window.chatDebug.messages);

// Access chat service
console.log(window.chatDebug.chatService);
```

## 🎨 Markdown & Code Features

### Rich Text Rendering
The chat widget now supports full markdown rendering for AI responses, making conversations more engaging and informative:

- **Headers**: H1-H6 with proper hierarchy and styling
- **Text Formatting**: **Bold**, *italic*, and `inline code`
- **Lists**: Both bulleted and numbered lists
- **Links**: Clickable links that open in new tabs
- **Blockquotes**: Styled quote blocks for emphasis

### Advanced Code Support
Perfect for technical support, programming assistance, or documentation:

```javascript
// Code blocks with syntax highlighting
function greetUser(name) {
  return `Hello, ${name}! Welcome to our chat.`;
}
```

**Features:**
- **Syntax Highlighting**: Support for 100+ programming languages
- **Copy Button**: One-click copying of code blocks
- **Language Detection**: Automatic language identification
- **Responsive Design**: Mobile-friendly code display

### Supported Languages
JavaScript, Python, HTML, CSS, JSON, SQL, Bash, and many more...

## 📊 Recent Improvements

### ✅ Enhanced UX
- **NEW**: Full markdown rendering with syntax highlighting
- **NEW**: Copy code buttons for easy code sharing
- Added animated loading indicators
- Improved input validation and auto-resize
- Better error handling with retry functionality
- Enhanced mobile responsiveness

### ✅ Technical Enhancements
- **NEW**: React-markdown integration with custom components
- **NEW**: React-syntax-highlighter for code blocks
- Fixed manifest.json for PWA compliance
- Improved component architecture
- Better session management
- Enhanced debugging tools

### ✅ Production Ready
- Comprehensive error handling
- Security best practices
- Performance optimizations
- Complete documentation

## 🔒 Security & Best Practices

### Security Checklist
- ✅ **No API Keys in Client**: All sensitive keys are server-side only
- ✅ **Input Validation**: All user inputs are validated and sanitized
- ✅ **CORS Protection**: Proper CORS configuration
- ✅ **Rate Limiting**: Built-in request throttling
- ✅ **Origin Tracking**: Request origin validation

### Performance Features
- ✅ **Optimized Bundle**: Tree-shaking and code splitting
- ✅ **Lazy Loading**: Components load on demand
- ✅ **Caching**: Intelligent caching strategies
- ✅ **Responsive**: Mobile-first design approach

## 📚 Documentation

- **[Backend Integration Guide](./BACKEND_INTEGRATION.md)** - Complete n8n setup
- **[Embedding Examples](./public/embed-example.html)** - Live demos

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

**Ready to integrate?** Start with the [Backend Integration Guide](./BACKEND_INTEGRATION.md) to connect your n8n workflow! 🚀
