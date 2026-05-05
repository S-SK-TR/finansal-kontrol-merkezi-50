import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, Landmark, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinanceStore } from '../store';

const Accounts = () => {
  const { accounts, getTotalBalance } = useFinanceStore();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hesaplarım</h1>
          <p className="text-zinc-400">Tüm varlıklarını ve kartlarını buradan yönetebilirsin.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2">
          <Plus size={18} /> Yeni Hesap Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <motion.div
            key={account.id}
            whileHover={{ y: -5 }}
            className="glass-card p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 -mr-4 -mt-4 opacity-5 group-hover:opacity-10 transition-opacity">
              {account.type === 'Cash' && <Wallet size={120} />}
              {account.type === 'Bank' && <Landmark size={120} />}
              {account.type === 'Credit Card' && <CreditCard size={120} />}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                account.balance >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {account.type === 'Cash' && <Wallet size={24} />}
                {account.type === 'Bank' && <Landmark size={24} />}
                {account.type === 'Credit Card' && <CreditCard size={24} />}
              </div>
              <div>
                <h3 className="font-bold text-zinc-200">{account.name}</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">{account.type}</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-zinc-500">Güncel Bakiye</p>
              <p className="text-2xl font-bold">₺{account.balance.toLocaleString()}</p>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-medium transition-colors">
                Detaylar
              </button>
              <button className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-medium transition-colors">
                Transfer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Account Activity Summary */}
      <div className="glass-card p-8">
        <h3 className="text-xl font-bold mb-6">Hesap Hareketleri Özeti</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <ArrowUpRight size={20} />
              </div>
              <div>
                <p className="font-medium">Bankadan Nakite Transfer</p>
                <p className="text-xs text-zinc-500">2 saat önce • Ziraat Bankası &rarr; Nakit</p>
              </div>
            </div>
            <p className="font-bold">₺500</p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <ArrowDownRight size={20} />
              </div>
              <div>
                <p className="font-medium">Kredi Kartı Ödemesi</p>
                <p className="text-xs text-zinc-500">Dün • Ziraat Bankası &rarr; Kredi Kartı</p>
              </div>
            </div>
            <p className="font-bold">₺2,450</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
