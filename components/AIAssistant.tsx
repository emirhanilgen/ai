import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { diagnoseProblem } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  onComplete: (summary: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Merhaba! Ben TamirAdam Asistan. Evinizdeki sorun nedir? Size en uygun ustayı bulmam için bana anlatın.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const responseText = await diagnoseProblem(userText);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      
      // Simulate redirection after diagnosis
      setTimeout(() => {
        onComplete(userText);
      }, 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
      <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Akıllı Arıza Tespiti</h3>
          <p className="text-xs text-slate-500">Gemini AI tarafından desteklenmektedir</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary-100' : 'bg-indigo-100'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-primary-600" /> : <Bot className="w-4 h-4 text-indigo-600" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs ml-12">
            <Loader2 className="w-3 h-3 animate-spin" />
            Analiz ediliyor...
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Örn: Musluk damlatıyor..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};