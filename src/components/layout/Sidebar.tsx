import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Home, BarChart2, FileText, Settings, Users, LogOut } from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Raporlar', icon: BarChart2, path: '/raporlar' },
  { name: 'Belgeler', icon: FileText, path: '/belgeler' },
  { name: 'Kullanıcılar', icon: Users, path: '/kullanicilar' },
  { name: 'Ayarlar', icon: Settings, path: '/ayarlar' }
]

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-border px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-foreground"
        >
          FKM
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
              location.pathname === item.path
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {isOpen && (
              <span className="truncate">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="mr-3 h-4 w-4" />
          {isOpen && 'Çıkış Yap'}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar