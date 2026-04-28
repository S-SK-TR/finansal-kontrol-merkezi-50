import { cn } from '../../lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actions?: React.ReactNode
}

export function Card({
  title,
  description,
  actions,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm',
        className
      )}
      {...props}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between p-4 pb-0">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      <div className="p-4 pt-2">{children}</div>
    </div>
  )
}