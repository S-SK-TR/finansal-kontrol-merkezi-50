import express from 'express'
import { db } from '../db'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Get dashboard summary
router.get('/summary', authenticate, (req, res) => {
  try {
    // Get total income
    const totalIncome = db.prepare(
      `SELECT SUM(amount) as total
       FROM transactions
       JOIN categories ON transactions.category_id = categories.id
       WHERE transactions.user_id = ? AND categories.type = 'income'`
    ).get(req.userId) as { total: number }

    // Get total expense
    const totalExpense = db.prepare(
      `SELECT SUM(amount) as total
       FROM transactions
       JOIN categories ON transactions.category_id = categories.id
       WHERE transactions.user_id = ? AND categories.type = 'expense'`
    ).get(req.userId) as { total: number }

    // Get monthly trend
    const monthlyTrend = db.prepare(
      `SELECT strftime('%Y-%m', date) as month, SUM(amount) as amount
       FROM transactions
       JOIN categories ON transactions.category_id = categories.id
       WHERE transactions.user_id = ? AND categories.type = 'income'
       GROUP BY month
       ORDER BY month DESC
       LIMIT 6`
    ).all(req.userId) as Array<{ month: string; amount: number }>

    res.json({
      totalIncome: totalIncome.total || 0,
      totalExpense: totalExpense.total || 0,
      netBalance: (totalIncome.total || 0) - (totalExpense.total || 0),
      monthlyTrend: monthlyTrend.reverse(),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Özet alınamadı' })
  }
})

export default router