'use client';

import { useState } from 'react';
import Chat from '../components/Chat';
import FileUpload from '../components/FileUpload';
import ModelSelector from '../components/ModelSelector';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<'grok' | 'claude' | 'gpt'>('grok');

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">RAG AI Assistant</h1>
            <p className="text-zinc-400 mt-2 text-lg">Загружай документы — спрашивай на русском</p>
          </div>
          <ModelSelector value={selectedModel} onChange={setSelectedModel} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Левая колонка — загрузка файлов */}
          <div className="lg:col-span-4">
            <FileUpload />
          </div>

          {/* Правая колонка — чат */}
          <div className="lg:col-span-8">
            <Chat model={selectedModel} />
          </div>
        </div>

        <div className="text-center text-zinc-500 text-sm mt-12">
          David Rebrukh — Full Stack AI Developer • 2026
        </div>
      </div>
    </div>
  );
}
