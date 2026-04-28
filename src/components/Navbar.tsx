import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'
import { Button } from './ui/Button'
import { IconWrapper } from './ui/IconWrapper'
import { Bell, Moon, Sun } from 'lucide-react'
import { useTheme } from '../core/useTheme'

interface NavbarProps {
  title?: string
}

export function Navbar({ title }: NavbarProps) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-zinc-200 dark:border-zinc-800">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title || 'Finansal Kontrol Merkezi'}
      </h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <IconWrapper icon={theme === 'dark' ? Sun : Moon} />
        </Button>
        <Button variant="ghost" size="icon">
          <IconWrapper icon={Bell} />
        </Button>
        {user && (
          <Button variant="ghost" onClick={logout}>
            Çıkış Yap
          </Button>
        )}
      </div>
    </header>
  )
}