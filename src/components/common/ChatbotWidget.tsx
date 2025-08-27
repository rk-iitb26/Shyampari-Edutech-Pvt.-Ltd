import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { findItemLocation } from './documentation';

// Define interfaces for better type safety
interface Position {
  x: number;
  y: number;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

/**
 * A helper function to convert custom path syntax like <path> into standard Markdown links.
 * @param text The text from the bot.
 * @returns Text with Markdown links formatted to look like a button.
 */
const formatResponseForMarkdown = (text: string): string => {
  // This regex finds all instances of <path>
  const linkRegex = /<(\/[^>]+)>/g;
  
  // CHANGED: The replacement now creates a bold link inside parentheses to appear like a button.
  return text.replace(linkRegex, '(**[Click Here to Redirect]($1)**)');
};


const ChatbotWidget: React.FC = () => {
  // ... state and other component logic remains the same ...
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm the EduFlow assistant. Ask me where to find features like 'assignments', 'tutors', or 'profile'.", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!widgetRef.current) return;
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !widgetRef.current) return;
      const widgetWidth = widgetRef.current.offsetWidth;
      const widgetHeight = widgetRef.current.offsetHeight;

      const newX = window.innerWidth - e.clientX - (widgetWidth - dragOffset.x);
      const newY = window.innerHeight - e.clientY - (widgetHeight - dragOffset.y);
      
      const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - widgetWidth));
      const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - widgetHeight));
      
      setPosition({ x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleToggleChat = (e: React.MouseEvent) => {
    const wasDragging = isDragging;
    setTimeout(() => {
        if (!wasDragging && e.detail === 1) {
            setIsOpen(prev => !prev);
        }
    }, 0);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage: Message = { id: Date.now(), text: inputMessage, isBot: false };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      setTimeout(() => {
        let replyText = findItemLocation(inputMessage);
        replyText = formatResponseForMarkdown(replyText);
        
        const botResponse: Message = { id: Date.now() + 1, text: replyText, isBot: true };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 700);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
  };

  return (
    <>
      <div
        ref={widgetRef}
        className={`fixed z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200 flex items-center justify-center ${isDragging ? 'scale-110' : ''}`}
        style={{ right: `${position.x}px`, bottom: `${position.y}px`, userSelect: 'none' }}
        onMouseDown={handleMouseDown}
        onClick={handleToggleChat}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </div>

      {isOpen && (
        <div
          className="fixed z-40 w-80 h-[450px] bg-white rounded-lg shadow-xl border flex flex-col"
          style={{ right: `${position.x + 70}px`, bottom: `${position.y}px` }}
        >
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <h3 className="font-semibold">EduFlow Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 rounded p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`mb-3 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-3 rounded-lg max-w-[90%] ${message.isBot ? 'bg-gray-100 text-gray-800 text-left' : 'bg-blue-600 text-white text-right'}`}>
                  {message.isBot ? (
                    <div className="prose prose-sm prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:font-bold prose-a:no-underline">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-100 text-gray-800">
                  <span className="animate-pulse">● ● ●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask about a feature..." className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isLoading} />
              <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400" disabled={isLoading || !inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;