'use client';

import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  return (
    <div className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg border flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 ${typeStyles[type]} z-50 shadow-lg`}>
      <span className="text-xl font-bold mt-0.5">{icons[type]}</span>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-xl opacity-70 hover:opacity-100">×</button>
    </div>
  );
}
