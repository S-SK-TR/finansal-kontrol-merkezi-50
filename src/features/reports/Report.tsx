import { useQuery } from '@tanstack/react-query'
import { api } from '../../core/api'
import { Card } from '../../components/ui/Card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'

interface ReportData {
  categories: Array<{
    name: string
    amount: number
    type: 'income' | 'expense'
  }>
  totalIncome: number
  totalExpense: number
}

export function Report() {
  const [timeRange, setTimeRange] = useState<'month' | 'year'>('month')

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports', timeRange],
    queryFn: async () => {
      const response = await api.get('/reports', {
        params: { range: timeRange }
      })
      return response.data as ReportData
    },
  })

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <Button
          variant={timeRange === 'month' ? 'default' : 'outline'}
          onClick={() => setTimeRange('month')}
        >
          Bu Ay
        </Button>
        <Button
          variant={timeRange === 'year' ? 'default' : 'outline'}
          onClick={() => setTimeRange('year')}
        >
          Bu Yıl
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Gelir/Gider Dağılımı">
          <div className="h-80">
            {reportData?.categories && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportData.categories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {reportData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card title="Finansal Özet">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Toplam Gelir:</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                ${reportData?.totalIncome.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Toplam Gider:</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                ${reportData?.totalExpense.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Net Kar:</span>
              <span className={`font-medium ${
                (reportData?.totalIncome || 0) > (reportData?.totalExpense || 0)
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                ${((reportData?.totalIncome || 0) - (reportData?.totalExpense || 0)).toFixed(2)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}