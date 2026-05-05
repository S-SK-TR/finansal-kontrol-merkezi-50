import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { BarChart2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useFinanceStore } from '../store';

const data = [
  { name: 'Oca', gelir: 40000, gider: 24000 },
  { name: 'Şub', gelir: 45000, gider: 28000 },
  { name: 'Mar', gelir: 42000, gider: 32000 },
  { name: 'Nis', gelir: 48000, gider: 29000 },
  { name: 'May', gelir: 51000, gider: 31000 },
  { name: 'Haz', gelir: 45000, gider: 35000 },
];

const Analysis = () => {
  const { getMonthlyIncome, getMonthlyExpense } = useFinanceStore();
  
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finansal Analizler</h1>
          <p className="text-zinc-400">Gelir ve gider trendlerini detaylı grafiklerle incele.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold flex items-center gap-2">
             <Calendar size={14} /> Son 6 Ay
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Expense Chart */}
        <div className="glass-card p-8 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Gelir vs Gider Trendi</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1 text-emerald-500"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Gelir</div>
              <div className="flex items-center gap-1 text-rose-500"><span className="w-2 h-2 rounded-full bg-rose-500" /> Gider</div>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₺${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="gelir" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                <Area type="monotone" dataKey="gider" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance Bar Chart */}
        <div className="glass-card p-8 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold mb-8">Aylık Kar/Zarar Analizi</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.map(d => ({ ...d, kar: d.gelir - d.gider }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₺${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                />
                <Bar dataKey="kar" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-emerald-500">
          <p className="text-xs font-bold text-zinc-500 uppercase mb-2">En Yüksek Gelir Ayı</p>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold">Mayıs</h4>
            <span className="text-emerald-500 font-bold">₺51,000</span>
          </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-rose-500">
          <p className="text-xs font-bold text-zinc-500 uppercase mb-2">En Yüksek Gider Ayı</p>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold">Haziran</h4>
            <span className="text-rose-500 font-bold">₺35,000</span>
          </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-blue-500">
          <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Ortalama Aylık Birikim</p>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold">₺15,400</h4>
            <span className="text-blue-500 font-bold">+%8.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
