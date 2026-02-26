'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'; // временно используем простой div

interface Props {
  value: 'grok' | 'claude' | 'gpt';
  onChange: (value: 'grok' | 'claude' | 'gpt') => void;
}

export default function ModelSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 bg-zinc-900 rounded-xl p-1">
      {[
        { id: 'grok', label: 'Grok', emoji: '🚀' },
        { id: 'claude', label: 'Claude', emoji: '🌲' },
        { id: 'gpt', label: 'GPT-4o', emoji: '🔥' }
      ].map(m => (
        <button
          key={m.id}
          onClick={() => onChange(m.id as any)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            value === m.id 
              ? 'bg-white text-black shadow' 
              : 'hover:bg-zinc-800'
          }`}
        >
          {m.emoji} {m.label}
        </button>
      ))}
    </div>
  );
}
