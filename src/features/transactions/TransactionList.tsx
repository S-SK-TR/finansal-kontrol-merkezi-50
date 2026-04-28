import { useQuery } from '@tanstack/react-query'
import { api } from '../../core/api'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { IconWrapper } from '../../components/ui/IconWrapper'
import { Edit, Trash2 } from 'lucide-react'

interface Transaction {
  id: string
  amount: number
  description: string
  date: string
  category: {
    name: string
    type: 'income' | 'expense'
  }
}

interface TransactionListProps {
  limit?: number
}

export function TransactionList({ limit }: TransactionListProps) {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', limit],
    queryFn: async () => {
      const response = await api.get('/transactions', {
        params: { limit }
      })
      return response.data as Transaction[]
    },
  })

  if (isLoading) return <div>Yükleniyor...</div>

  return (
    <div className="space-y-4">
      {transactions?.map((transaction) => (
        <Card key={transaction.id} className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-sm px-2 py-1 rounded-full ${
                transaction.category.type === 'income'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {transaction.category.name}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </div>
            <div className="font-medium mt-1">{transaction.description}</div>
          </div>
          <div className={`font-medium ${
            transaction.category.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {transaction.category.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <IconWrapper icon={Edit} />
            </Button>
            <Button variant="ghost" size="icon">
              <IconWrapper icon={Trash2} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}