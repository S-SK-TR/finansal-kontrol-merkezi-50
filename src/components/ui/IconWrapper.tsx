import { cn } from '../../../lib/utils'

interface IconWrapperProps {
  icon: React.ElementType
  size?: number
  className?: string
}

export function IconWrapper({ icon: Icon, size = 20, className }: IconWrapperProps) {
  return <Icon size={size} className={cn('text-zinc-500 dark:text-zinc-400', className)} />
}