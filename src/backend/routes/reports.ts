import express from 'express'
import { db } from '../db'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Get financial reports
router.get('/', authenticate, (req, res) => {
  try {
    const range = req.query.range || 'month'
    const now = new Date()
    let startDate: Date

    if (range === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    } else {
      startDate = new Date(now.getFullYear(), 0, 1)
    }

    // Get categories with amounts
    const categories = db.prepare(
      `SELECT c.name, c.type, SUM(t.amount) as amount
       FROM categories c
       LEFT JOIN transactions t ON c.id = t.category_id
       WHERE c.user_id = ? AND t.date >= ?
       GROUP BY c.id`
    ).all(req.userId, startDate.toISOString().split('T')[0]) as Array<{
      name: string
      type: 'income' | 'expense'
      amount: number
    }>

    // Get totals
    const totalIncome = db.prepare(
      `SELECT SUM(amount) as total
       FROM transactions
       JOIN categories ON transactions.category_id = categories.id
       WHERE transactions.user_id = ? AND categories.type = 'income' AND transactions.date >= ?`
    ).get(req.userId, startDate.toISOString().split('T')[0]) as { total: number }

    const totalExpense = db.prepare(
      `SELECT SUM(amount) as total
       FROM transactions
       JOIN categories ON transactions.category_id = categories.id
       WHERE transactions.user_id = ? AND categories.type = 'expense' AND transactions.date >= ?`
    ).get(req.userId, startDate.toISOString().split('T')[0]) as { total: number }

    res.json({
      categories: categories.filter(c => c.amount > 0),
      totalIncome: totalIncome.total || 0,
      totalExpense: totalExpense.total || 0,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Rapor alınamadı' })
  }
})

export default router