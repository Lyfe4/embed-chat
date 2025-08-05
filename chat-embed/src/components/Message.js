import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import '../styles/Message.css';

const Message = ({ message }) => {
  const { text, sender, timestamp } = message;
  const isUser = sender === 'user';

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${isUser ? 'message-user' : 'message-bot'}`}>
      <div className="message-bubble">
        <div className="message-text">
          {isUser ? (
            <p>{text}</p>
          ) : (
            <ReactMarkdown
              components={{
                // Customize how different markdown elements are rendered
                p: ({ children }) => <p className="markdown-paragraph">{children}</p>,
                h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
                h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
                h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
                h4: ({ children }) => <h4 className="markdown-h4">{children}</h4>,
                h5: ({ children }) => <h5 className="markdown-h5">{children}</h5>,
                h6: ({ children }) => <h6 className="markdown-h6">{children}</h6>,
                code: ({ inline, className, children }) => (
                  <CodeBlock inline={inline} className={className}>
                    {children}
                  </CodeBlock>
                ),
                ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
                ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
                li: ({ children }) => <li className="markdown-li">{children}</li>,
                blockquote: ({ children }) => <blockquote className="markdown-blockquote">{children}</blockquote>,
                strong: ({ children }) => <strong className="markdown-strong">{children}</strong>,
                em: ({ children }) => <em className="markdown-em">{children}</em>,
                a: ({ href, children }) => (
                  <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        </div>
        <span className="message-time">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;
