'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface Props {
  model: 'grok' | 'claude' | 'gpt';
}

export default function Chat({ model }: Props) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const question = input;
    setInput('');
    setLoading(true);

    // ДЕМО-РЕЖИМ — красивые ответы без backend
    setTimeout(() => {
      const mockResponses = [
        `Отличный вопрос! По документам, которые ты загружал, я вижу, что...`,
        `На основе контекста: ${question.toLowerCase().includes('как') ? 'Это делается через LangChain + pgvector' : 'Всё работает через FastAPI и Supabase.'}`,
        `Grok/Claude/GPT сейчас отвечают так: это production-ready RAG с latency < 800ms.`,
        `Круто, что ты тестируешь! Это мой первый full-stack AI проект в портфолио 🙂`,
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: randomResponse + `\n\n(демо-режим • настоящий RAG работает локально)` 
      }]);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col h-[620px]">
      <div className="border-b border-zinc-800 p-6 flex items-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-medium">AI Assistant — {model.toUpperCase()} (Live Demo)</span>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-zinc-400 mt-20">
            👋 Привет! Загрузи документы слева и спроси что угодно<br />
            <span className="text-xs">(демо-режим — отвечает мгновенно)</span>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3.5 rounded-3xl ${
              msg.role === 'user' ? 'bg-white text-black' : 'bg-zinc-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 px-5 py-3 rounded-3xl flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin" />
              Думаю...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-zinc-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Спроси что угодно..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-white text-lg"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-white text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-zinc-200 disabled:opacity-50 transition"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <p className="text-center text-xs text-zinc-600 mt-3">
          Live Demo • Полный RAG работает локально (FastAPI)
        </p>
      </div>
    </div>
  );
}
