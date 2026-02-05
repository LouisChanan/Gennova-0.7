import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles } from 'lucide-react';
import { analyzeDNAWithGemini } from '../services/geminiService';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', text: 'Hi Sarah! I\'ve analyzed your DNA profile. What would you like to know about your talents or nutrition?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await analyzeDNAWithGemini(input);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-full flex items-center justify-center text-white">
                <Bot size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">Gennova AI</h3>
                <p className="text-xs text-teal-600 font-medium flex items-center">
                    <Sparkles size={10} className="mr-1" />
                    Genetic Expert
                </p>
            </div>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 shadow-sm text-slate-700 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none p-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your DNA..."
            className="flex-1 bg-transparent border-none outline-none text-sm p-2 text-slate-800 placeholder-gray-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-colors ${
                input.trim() ? 'bg-teal-500 text-white shadow-md' : 'bg-gray-300 text-gray-500'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};