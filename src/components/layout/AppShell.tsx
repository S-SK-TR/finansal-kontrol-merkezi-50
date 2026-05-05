import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

const AppShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div
        initial={{ width: isSidebarOpen ? 280 : 0 }}
        animate={{ width: isSidebarOpen ? 280 : 0 }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card/80 backdrop-blur-sm transition-all duration-300',
          'glass-card'
        )}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </motion.div>

      {/* Main Content */}
      <div className={cn(
        'flex flex-1 flex-col transition-all duration-300',
        isSidebarOpen ? 'ml-[280px]' : 'ml-0'
      )}>
        <Navbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell