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
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, model }),
      });
      const data = await res.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ошибка соединения с backend. Запусти FastAPI!' }]);
    }
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col h-[620px]">
      {/* Заголовок чата */}
      <div className="border-b border-zinc-800 p-6 flex items-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-medium">AI Assistant — {model.toUpperCase()}</span>
      </div>

      {/* Сообщения */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 mt-20">
            👋 Привет! Загрузи документы слева и задай вопрос
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3.5 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-white text-black' 
                : 'bg-zinc-800'
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

      {/* Поле ввода */}
      <div className="p-6 border-t border-zinc-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Спроси что угодно про твои документы..."
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
        <p className="text-center text-[10px] text-zinc-600 mt-3">Работает локально • backend должен быть запущен</p>
      </div>
    </div>
  );
}
