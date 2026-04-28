import express from 'express'
import { db } from '../db'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Get all transactions
router.get('/', authenticate, (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined

    let query = `
      SELECT t.*, c.name as category_name, c.type as category_type
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ?
      ORDER BY t.date DESC
    `

    if (limit) {
      query += ' LIMIT ?'
    }

    const stmt = db.prepare(query)
    const transactions = limit
      ? stmt.all(req.userId, limit)
      : stmt.all(req.userId)

    res.json(transactions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'İşlemler alınamadı' })
  }
})

// Create new transaction
router.post('/', authenticate, (req, res) => {
  try {
    const { amount, description, date, categoryId } = req.body

    const stmt = db.prepare(
      'INSERT INTO transactions (user_id, amount, description, date, category_id) VALUES (?, ?, ?, ?, ?)'
    )
    const result = stmt.run(req.userId, amount, description, date, categoryId)

    const newTransaction = db.prepare(
      `SELECT t.*, c.name as category_name, c.type as category_type
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.id = ?`
    ).get(result.lastInsertRowid) as {
      id: number
      amount: number
      description: string
      date: string
      category_id: number
      category_name: string
      category_type: 'income' | 'expense'
    }

    res.status(201).json(newTransaction)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'İşlem oluşturulamadı' })
  }
})

export default router