import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Wallet, 
  BarChart2, 
  Briefcase, 
  PieChart, 
  Settings, 
  LogOut, 
  X,
  TrendingUp
} from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Hesaplarım', icon: Wallet, path: '/accounts' },
  { name: 'Analizler', icon: BarChart2, path: '/analysis' },
  { name: 'Yatırımlar', icon: Briefcase, path: '/investments' },
  { name: 'Bütçe', icon: PieChart, path: '/budget' },
]

interface SidebarProps {
  onClose?: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation()

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">FKM <span className="text-emerald-400">Pro</span></span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-zinc-900 rounded-lg lg:hidden text-zinc-400"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-sm border border-emerald-500/20' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'}
              `}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-zinc-800 space-y-2">
        <Link
          to="/settings"
          onClick={onClose}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${location.pathname === '/settings' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'}
          `}
        >
          <Settings size={20} />
          <span>Ayarlar</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar