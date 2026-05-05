import { useState } from 'react'
import { Menu, Bell, Search, User } from 'lucide-react'
import { useFinanceStore } from '../../store'
import { ProfileModal } from '../ProfileModal'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { userProfile } = useFinanceStore()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between">
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-zinc-900 rounded-lg lg:hidden text-zinc-400"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative w-64 md:w-96 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="İşlem ara..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-zinc-200"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-zinc-50 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950" />
        </button>
        
        <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{userProfile.name}</p>
            <p className="text-xs text-zinc-500">{userProfile.membership} Üye</p>
          </div>
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden hover:ring-2 hover:ring-emerald-500/50 transition-all"
          >
             <img src={userProfile.avatar} alt="avatar" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar