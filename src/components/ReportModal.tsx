import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, FileText, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { useFinanceStore } from '../store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: Props) {
  const { transactions, getTotalBalance, getMonthlyIncome, getMonthlyExpense, getYearlyIncome, getYearlyExpense, getCategoryData } = useFinanceStore();

  const totalBalance = getTotalBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpense = getMonthlyExpense();
  const yearlyIncome = getYearlyIncome();
  const yearlyExpense = getYearlyExpense();
  const categoryData = getCategoryData();

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] z-[61] overflow-hidden"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col h-full m-4 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Finansal Rapor</h2>
                    <p className="text-xs text-zinc-500">Oluşturulma Tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrint}
                    className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Printer size={18} /> <span className="hidden sm:inline">Yazdır</span>
                  </button>
                  <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto space-y-8 print:p-0">
                {/* Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Net Bakiye</p>
                    <p className="text-3xl font-bold">₺{totalBalance.toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Aylık Özet</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-emerald-500 flex items-center gap-1"><TrendingUp size={12} /> Gelir</p>
                        <p className="text-xl font-bold">₺{monthlyIncome.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-rose-500 flex items-center gap-1 justify-end"><TrendingDown size={12} /> Gider</p>
                        <p className="text-xl font-bold">₺{monthlyExpense.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Yıllık Özet</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-emerald-500">Gelir</p>
                        <p className="text-xl font-bold">₺{yearlyIncome.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-rose-500">Gider</p>
                        <p className="text-xl font-bold">₺{yearlyExpense.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <PieChart size={20} className="text-zinc-400" /> Kategori Bazlı Harcamalar
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold">₺{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Son İşlemler Detayı</h3>
                  <div className="overflow-hidden border border-zinc-800 rounded-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-950 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                          <th className="p-4">Tarih</th>
                          <th className="p-4">İşlem</th>
                          <th className="p-4">Kategori</th>
                          <th className="p-4 text-right">Miktar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {transactions.slice(0, 10).map((t) => (
                          <tr key={t.id} className="text-sm">
                            <td className="p-4">{new Date(t.date).toLocaleDateString('tr-TR')}</td>
                            <td className="p-4 font-medium">{t.name}</td>
                            <td className="p-4">{t.category}</td>
                            <td className={`p-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-zinc-300'}`}>
                              {t.type === 'income' ? '+' : '-'}₺{t.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-between items-center text-xs text-zinc-500">
                <p>FKM Premium Finansal Rapor</p>
                <p>© 2026 Finansal Kontrol Merkezi</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
