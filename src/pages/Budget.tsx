import React from 'react';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon, Plus, Target, AlertTriangle } from 'lucide-react';
import { useFinanceStore } from '../store';

const Budget = () => {
  const { budgets } = useFinanceStore();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bütçe Yönetimi</h1>
          <p className="text-zinc-400">Harcama limitlerini belirle ve tasarruf hedeflerine ulaş.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2">
          <Plus size={18} /> Yeni Bütçe Oluştur
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Budgets List */}
        <div className="glass-card p-8 space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Target className="text-emerald-500" /> Aktif Limitler
          </h3>
          <div className="space-y-8">
            {budgets.map((budget) => {
              const percent = Math.min((budget.spent / budget.limit) * 100, 100);
              const isWarning = percent > 80;
              const isDanger = percent >= 100;

              return (
                <div key={budget.category} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="font-bold text-zinc-200">{budget.category}</h4>
                      <p className="text-xs text-zinc-500">
                        ₺{budget.spent.toLocaleString()} / ₺{budget.limit.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isDanger ? 'bg-rose-500/10 text-rose-500' : 
                        isWarning ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        %{percent.toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        isDanger ? 'bg-rose-500' : 
                        isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                  {isDanger && (
                    <p className="text-[10px] text-rose-500 flex items-center gap-1 font-medium">
                      <AlertTriangle size={10} /> Limit aşıldı!
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Savings Goals or Info */}
        <div className="glass-card p-8 flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <PieChartIcon size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Akıllı Tasarruf</h3>
            <p className="text-zinc-400 mt-2 max-w-xs mx-auto">
              Geçen aya göre harcamalarını %12 oranında azalttın. Harika gidiyorsun!
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Potansiyel Birikim</p>
              <p className="text-xl font-bold text-emerald-500">₺4,250</p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Hedef Tamamlama</p>
              <p className="text-xl font-bold text-blue-500">%74</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
