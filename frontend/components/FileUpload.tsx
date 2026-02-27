'use client';

import { Upload } from 'lucide-react';
import { useState } from 'react';

const BACKEND_URL = 'https://rag-ai-assistant-production.up.railway.app';

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setUploaded(prev => [...prev, file.name]);
      }
    } catch (err) {
      alert('Ошибка загрузки');
    }
    setUploading(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 h-full">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
          <Upload className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Загрузи документы</h3>
        <p className="text-zinc-400 mb-8">PDF, DOCX, TXT — до 10 МБ</p>

        <label className="cursor-pointer block bg-white hover:bg-zinc-100 transition text-black font-medium py-4 px-10 rounded-2xl text-lg">
          {uploading ? 'Загрузка...' : 'Выбрать файл'}
          <input type="file" className="hidden" onChange={handleUpload} accept=".pdf,.docx,.txt" />
        </label>
      </div>

      {uploaded.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-zinc-400 mb-3">Загружено:</p>
          {uploaded.map((f, i) => (
            <div key={i} className="text-sm bg-zinc-800 rounded-xl px-4 py-2.5 mb-2">✅ {f}</div>
          ))}
        </div>
      )}
    </div>
  );
}
