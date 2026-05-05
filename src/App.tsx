import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  BarChart2, 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  PieChart, 
  Bell,
  Search,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  Trash2,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinanceStore, Transaction } from './store';
import { AddTransactionModal } from './components/AddTransactionModal';
import { ReportModal } from './components/ReportModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/providers/ThemeProvider';

const queryClient = new QueryClient();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    transactions, 
    removeTransaction, 
    getTotalBalance, 
    getMonthlyIncome, 
    getMonthlyExpense,
    getYearlyIncome,
    getYearlyExpense,
    getCategoryData 
  } = useFinanceStore();

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  const categoryData = useMemo(() => getCategoryData(), [transactions]);
  
  const totalBalance = getTotalBalance();
  const income = period === 'monthly' ? getMonthlyIncome() : getYearlyIncome();
  const expense = period === 'monthly' ? getMonthlyExpense() : getYearlyExpense();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-zinc-950 text-zinc-50 flex overflow-hidden font-sans">
          <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />

          {/* Sidebar */}
          <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-md hidden md:flex flex-col p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">FKM <span className="text-emerald-400">Pro</span></span>
            </div>

            <nav className="flex-1 space-y-2">
              <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
              <NavItem icon={<Wallet size={20} />} label="Hesaplarım" />
              <NavItem icon={<BarChart2 size={20} />} label="Analizler" />
              <NavItem icon={<Briefcase size={20} />} label="Yatırımlar" />
              <NavItem icon={<PieChart size={20} />} label="Bütçe" />
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-800 space-y-2">
              <NavItem icon={<Settings size={20} />} label="Ayarlar" />
              <NavItem icon={<LogOut size={20} />} label="Çıkış Yap" />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto relative">
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />

            {/* Header */}
            <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
              <div className="relative w-96 hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="İşlem ara..." 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-zinc-50 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">Serdar A.</p>
                    <p className="text-xs text-zinc-500">Premium Üye</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Serdar" alt="avatar" />
                  </div>
                </div>
              </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Welcome Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Merhaba, Serdar 👋</h1>
                    <p className="text-zinc-400">Finansal durumun bugün oldukça stabil görünüyor.</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsReportOpen(true)}
                      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm font-medium transition-colors"
                    >
                      Rapor Al
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <Plus size={18} /> Yeni İşlem Ekle
                    </button>
                  </div>
                </motion.div>

                {/* Period Toggle */}
                <motion.div variants={itemVariants} className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
                  <button
                    onClick={() => setPeriod('monthly')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      period === 'monthly' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Aylık
                  </button>
                  <button
                    onClick={() => setPeriod('yearly')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      period === 'yearly' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Yıllık
                  </button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="Toplam Bakiye" 
                    amount={`₺${totalBalance.toLocaleString()}`} 
                    change="+12.5%" 
                    up 
                    icon={<Wallet className="text-emerald-400" />} 
                  />
                  <StatCard 
                    title={`${period === 'monthly' ? 'Aylık' : 'Yıllık'} Gelir`} 
                    amount={`₺${income.toLocaleString()}`} 
                    change="+3.2%" 
                    up 
                    icon={<ArrowUpRight className="text-blue-400" />} 
                  />
                  <StatCard 
                    title={`${period === 'monthly' ? 'Aylık' : 'Yıllık'} Gider`} 
                    amount={`₺${expense.toLocaleString()}`} 
                    change="-8.4%" 
                    down 
                    icon={<ArrowDownRight className="text-rose-400" />} 
                  />
                  <StatCard 
                    title="Yatırım Değeri" 
                    amount="₺64,300" 
                    change="+15.8%" 
                    up 
                    icon={<Briefcase className="text-violet-400" />} 
                  />
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Transactions */}
                  <motion.div variants={itemVariants} className="lg:col-span-2 glass-card overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                      <h3 className="font-bold">Son İşlemler</h3>
                      <div className="text-xs text-zinc-500">{filteredTransactions.length} işlem bulundu</div>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[500px] divide-y divide-zinc-800">
                      <AnimatePresence mode='popLayout'>
                        {filteredTransactions.length > 0 ? (
                          filteredTransactions.map((t) => (
                            <TransactionItem 
                              key={t.id} 
                              transaction={t} 
                              onDelete={() => removeTransaction(t.id)} 
                            />
                          ))
                        ) : (
                          <div className="p-20 text-center text-zinc-500">
                            Henüz işlem bulunmuyor.
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Budget Chart */}
                  <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col">
                    <h3 className="font-bold mb-6">Harcama Dağılımı</h3>
                    <div className="h-64 mb-6">
                      {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              stroke="none"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '12px' }}
                              itemStyle={{ color: '#fff' }}
                            />
                          </RePieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-zinc-600 text-sm italic">
                          Veri bekleniyor...
                        </div>
                      )}
                    </div>
                    <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                      {categoryData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} /> {item.name}
                          </span>
                          <span className="font-medium text-zinc-200">₺{item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
      ${active 
        ? 'bg-emerald-500/10 text-emerald-400 shadow-sm border border-emerald-500/20' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'}
    `}>
      {icon}
      {label}
    </button>
  );
}

function StatCard({ title, amount, change, up, down, icon }: any) {
  return (
    <div className="glass-card p-6 group hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          up ? 'bg-emerald-500/10 text-emerald-400' : 
          down ? 'bg-rose-500/10 text-rose-400' : 'bg-zinc-800 text-zinc-400'
        }`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm text-zinc-500 mb-1">{title}</p>
        <p className="text-2xl font-bold tracking-tight">{amount}</p>
      </div>
    </div>
  );
}

function TransactionItem({ transaction, onDelete }: { transaction: Transaction, onDelete: () => void }) {
  const isIncome = transaction.type === 'income';
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="p-4 hover:bg-zinc-900/50 transition-colors flex items-center justify-between group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
          {transaction.icon}
        </div>
        <div>
          <p className="font-semibold group-hover:text-emerald-400 transition-colors">{transaction.name}</p>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>{new Date(transaction.date).toLocaleDateString('tr-TR')}</span>
            <span>•</span>
            <span>{transaction.category}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className={`text-sm font-bold ${isIncome ? 'text-emerald-400' : 'text-zinc-50'}`}>
          {isIncome ? '+' : '-'}₺{transaction.amount.toLocaleString()}
        </div>
        <button 
          onClick={onDelete}
          className="p-2 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-rose-500 transition-all hover:bg-rose-500/10 rounded-lg"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default App;
