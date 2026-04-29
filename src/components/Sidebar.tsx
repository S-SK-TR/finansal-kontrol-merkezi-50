import { NavLink } from 'react-router-dom'
import { IconWrapper } from '../ui/IconWrapper'
import { Home, PieChart, Wallet, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../../features/auth/useAuth'

const navItems = [
  { to: '/', icon: Home, label: 'Anasayfa' },
  { to: '/transactions', icon: Wallet, label: 'İşlemler' },
  { to: '/reports', icon: PieChart, label: 'Raporlar' },
  { to: '/settings', icon: Settings, label: 'Ayarlar' },
]

export function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 hidden md:block">
      <div className="h-16 flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-xl text-zinc-900 dark:text-zinc-100">FKM</span>
      </div>
      <nav className="p-2 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <IconWrapper icon={icon} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={logout}
        >
          <IconWrapper icon={LogOut} />
          <span>Çıkış Yap</span>
        </Button>
      </div>
    </aside>
  )
}