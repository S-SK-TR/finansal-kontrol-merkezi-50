import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  icon: string;
}

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  removeTransaction: (id: string) => void;
  getTotalBalance: () => number;
  getMonthlyIncome: () => number;
  getMonthlyExpense: () => number;
  getCategoryData: () => { name: string; value: number; color: string }[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Gıda': '#10b981',      // emerald-500
  'Teknoloji': '#3b82f6', // blue-500
  'Eğlence': '#8b5cf6',   // violet-500
  'Maaş': '#f59e0b',      // amber-500
  'Ulaşım': '#ef4444',    // red-500
  'Diğer': '#71717a',     // zinc-500
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [
        { id: '1', name: 'Apple Store', amount: 2499, category: 'Teknoloji', date: new Date().toISOString(), type: 'expense', icon: '🍎' },
        { id: '2', name: 'Netflix', amount: 149, category: 'Eğlence', date: new Date().toISOString(), type: 'expense', icon: '🎬' },
        { id: '3', name: 'Maaş Ödemesi', amount: 45000, category: 'Maaş', date: new Date().toISOString(), type: 'income', icon: '💰' },
      ],

      addTransaction: (transaction) => set((state) => ({
        transactions: [
          {
            ...transaction,
            id: Math.random().toString(36).substring(2, 9),
            date: new Date().toISOString(),
          },
          ...state.transactions,
        ],
      })),

      removeTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      })),

      getTotalBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
      },

      getMonthlyIncome: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((acc, t) => acc + t.amount, 0);
      },

      getMonthlyExpense: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((acc, t) => acc + t.amount, 0);
      },

      getCategoryData: () => {
        const { transactions } = get();
        const expenseOnly = transactions.filter(t => t.type === 'expense');
        const categories = [...new Set(expenseOnly.map(t => t.category))];
        
        return categories.map(cat => ({
          name: cat,
          value: expenseOnly.filter(t => t.category === cat).reduce((acc, t) => acc + t.amount, 0),
          color: CATEGORY_COLORS[cat] || CATEGORY_COLORS['Diğer']
        })).sort((a, b) => b.value - a.value);
      }
    }),
    {
      name: 'fkm-finance-storage',
    }
  )
);
