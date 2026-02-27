'use client';

interface Props {
  value: 'grok' | 'claude' | 'gpt';
  onChange: (value: 'grok' | 'claude' | 'gpt') => void;
}

export default function ModelSelector({ value, onChange }: Props) {
  const models = [
    { id: 'grok', label: 'Grok', emoji: '🚀' },
    { id: 'claude', label: 'Claude', emoji: '🌲' },
    { id: 'gpt', label: 'GPT-4o', emoji: '🔥' }
  ];

  return (
    <div className="flex gap-2 bg-zinc-900 rounded-2xl p-1.5 border border-zinc-800">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onChange(model.id as any)}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            value === model.id 
              ? 'bg-white text-black shadow-lg' 
              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          <span>{model.emoji}</span>
          <span>{model.label}</span>
        </button>
      ))}
    </div>
  );
}
