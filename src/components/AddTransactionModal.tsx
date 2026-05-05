import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Tag, CreditCard } from 'lucide-react';
import { useFinanceStore } from '../store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ['Gıda', 'Teknoloji', 'Eğlence', 'Maaş', 'Ulaşım', 'Diğer'];
const ICONS: Record<string, string> = {
  'Gıda': '☕',
  'Teknoloji': '💻',
  'Eğlence': '🎬',
  'Maaş': '💰',
  'Ulaşım': '🚗',
  'Diğer': '📦'
};

export function AddTransactionModal({ isOpen, onClose }: Props) {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Gıda');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    addTransaction({
      name,
      amount: parseFloat(amount),
      type,
      category,
      icon: ICONS[category] || '📦'
    });

    // Reset and close
    setName('');
    setAmount('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md z-[51]"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <h2 className="text-xl font-bold">Yeni İşlem Ekle</h2>
                <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Type Selector */}
                <div className="flex bg-zinc-950 p-1 rounded-2xl border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setType('expense')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                      type === 'expense' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Minus size={16} /> Gider
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('income')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                      type === 'income' ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Plus size={16} /> Gelir
                  </button>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} /> İşlem Adı
                  </label>
                  <input
                    autoFocus
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Market Alışverişi"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                  />
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <CreditCard size={12} /> Miktar (₺)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                  />
                </div>

                {/* Category Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    Kategori
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all ${
                          category === cat 
                            ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-lg' 
                            : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span className="block text-lg mb-1">{ICONS[cat]}</span>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 mt-4"
                >
                  İşlemi Kaydet
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
