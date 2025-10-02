import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, User, Bot, Clock, Wifi, WifiOff } from 'lucide-react';

// CSS Styles
const styles = `
  .chatbot-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
  }

  .chatbot-toggle-button {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-radius: 50%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .chatbot-toggle-button:hover {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    transform: scale(1.05);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04);
  }

  .chatbot-window {
    position: fixed;
    bottom: 100px;
    right: 24px;
    width: 384px;
    height: 512px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 49;
  }

  .chatbot-header {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .chatbot-header-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .chatbot-avatar {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chatbot-header-text {
    display: flex;
    flex-direction: column;
  }

  .chatbot-title {
    font-weight: 600;
    font-size: 14px;
    margin: 0;
  }

  .chatbot-status {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    opacity: 0.9;
  }

  .chatbot-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .chatbot-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background: #f9fafb;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .message {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .message.user {
    flex-direction: row-reverse;
  }

  .message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .message-avatar.user {
    background: #3b82f6;
    color: white;
  }

  .message-avatar.bot {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
  }

  .message-avatar.error {
    background: #ef4444;
    color: white;
  }

  .message-content {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .message-bubble {
    padding: 12px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.4;
  }

  .message-bubble.user {
    background: #3b82f6;
    color: white;
    border-bottom-right-radius: 6px;
  }

  .message-bubble.bot {
    background: white;
    color: #374151;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    border-bottom-left-radius: 6px;
  }

  .message-bubble.error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
    border-bottom-left-radius: 6px;
  }

  .message-timestamp {
    font-size: 12px;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .message.user .message-timestamp {
    justify-content: flex-end;
  }

  .ai-indicator {
    margin-top: 8px;
    font-size: 12px;
    color: #3b82f6;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .ai-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
  }

  .typing-indicator {
    display: flex;
    justify-content: flex-start;
  }

  .typing-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .typing-bubble {
    background: white;
    padding: 12px;
    border-radius: 16px;
    border-bottom-left-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
  }

  .typing-dots {
    display: flex;
    gap: 4px;
  }

  .typing-dot {
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
    animation: bounce 1.4s infinite;
  }

  .typing-dot:nth-child(2) {
    animation-delay: 0.1s;
  }

  .typing-dot:nth-child(3) {
    animation-delay: 0.2s;
  }

  @keyframes bounce {
    0%, 60%, 100% {
      opacity: 0.3;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-10px);
    }
  }

  .quick-actions {
    padding: 12px 16px;
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }

  .quick-actions-label {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .quick-actions-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .quick-action-button {
    background: white;
    color: #3b82f6;
    border: 1px solid #bfdbfe;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .quick-action-button:hover {
    background: #eff6ff;
  }

  .chatbot-input {
    padding: 16px;
    background: white;
    border-top: 1px solid #e5e7eb;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .message-input {
    flex: 1;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 24px;
    outline: none;
    font-size: 14px;
    transition: border-color 0.2s;
  }

  .message-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .message-input:disabled {
    background: #f9fafb;
    color: #9ca3af;
  }

  .send-button {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .send-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
  }

  .send-button:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .chatbot-window {
      position: fixed;
      top: 16px;
      left: 16px;
      right: 16px;
      bottom: 16px;
      width: auto;
      height: auto;
    }

    .chatbot-container {
      bottom: 16px;
      right: 16px;
    }
  }

  /* Scrollbar styling */
  .chatbot-messages::-webkit-scrollbar {
    width: 4px;
  }

  .chatbot-messages::-webkit-scrollbar-track {
    background: transparent;
  }

  .chatbot-messages::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 2px;
  }
`;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = 'http://localhost:8000'; // Your deployed backend URL

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "👋 Hello! Welcome to Shyampari Edutech. I'm your AI assistant here to help with information about our tutoring services, demo classes, fee structure, and more. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        usingAI: false
      }
    ]);
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Quick action buttons
  const quickActions = [
    "What services do you offer?",
    "How does the demo process work?",
    "What are your fees?",
    "Which boards do you support?",
    "Tell me about your tutors",
    "What are your timings?"
  ];

  const sendMessage = async (messageText = null) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsConnected(true);

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: data.timestamp,
        usingAI: data.using_ai || false
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error:', error);
      setIsConnected(false);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting to our servers. Please check if the backend is running or try again later. You can also contact us directly at contact@shyampariedutech.com",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .split('\n')
      .map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ));
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Inject styles
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="chatbot-container">
      <div className="chatbot-window">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-avatar">
              <Bot size={20} />
            </div>
            <div className="chatbot-header-text">
              <h3 className="chatbot-title">Shyampari Edutech</h3>
              <div className="chatbot-status">
                {isConnected ? (
                  <>
                    <Wifi size={12} />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={12} />
                    <span>Connecting...</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="chatbot-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className={`message-avatar ${message.sender} ${message.isError ? 'error' : ''}`}>
                {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className="message-content">
                <div className={`message-bubble ${message.sender} ${message.isError ? 'error' : ''}`}>
                  {message.sender === 'bot' ? formatMessage(message.text) : message.text}
                  {message.sender === 'bot' && message.usingAI && (
                    <div className="ai-indicator">
                      <div className="ai-dot"></div>
                      <span>AI Powered</span>
                    </div>
                  )}
                </div>
                <div className="message-timestamp">
                  <Clock size={10} />
                  <span>{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-content">
                <div className="message-avatar bot">
                  <Bot size={16} />
                </div>
                <div className="typing-bubble">
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="quick-actions">
            <div className="quick-actions-label">Quick questions:</div>
            <div className="quick-actions-buttons">
              {quickActions.slice(0, 4).map((action, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(action)}
                  className="quick-action-button"
                >
                  {action.length > 25 ? action.substring(0, 25) + '...' : action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="message-input"
              disabled={isTyping}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="send-button"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;