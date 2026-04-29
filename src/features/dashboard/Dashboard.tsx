import { Card } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { IconWrapper } from '../../../components/ui/IconWrapper'
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../core/api'
import { TransactionList } from '../../transactions/TransactionList'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SummaryData {
  totalIncome: number
  totalExpense: number
  netBalance: number
  monthlyTrend: Array<{ month: string; amount: number }>
}

export function Dashboard() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const response = await api.get('/dashboard/summary')
      return response.data as SummaryData
    },
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Toplam Gelir" className="bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {isLoading ? '...' : `$${summary?.totalIncome.toFixed(2)}`}
            </div>
            <IconWrapper icon={TrendingUp} className="text-green-500 dark:text-green-400" />
          </div>
        </Card>
        <Card title="Toplam Gider" className="bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {isLoading ? '...' : `$${summary?.totalExpense.toFixed(2)}`}
            </div>
            <IconWrapper icon={TrendingDown} className="text-red-500 dark:text-red-400" />
          </div>
        </Card>
        <Card title="Net Bakiye" className="bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {isLoading ? '...' : `$${summary?.netBalance.toFixed(2)}`}
            </div>
            <IconWrapper icon={Wallet} className="text-blue-500 dark:text-blue-400" />
          </div>
        </Card>
        <Card title="Hızlı İşlem">
          <Button className="w-full">
            <IconWrapper icon={Plus} />
            Yeni İşlem
          </Button>
        </Card>
      </div>

      <Card title="Aylık Trend">
        <div className="h-80">
          {summary?.monthlyTrend && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      <Card title="Son İşlemler">
        <TransactionList limit={5} />
      </Card>
    </div>
  )
}