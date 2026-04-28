import express from 'express'
import { db } from '../db'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Get all categories
router.get('/', authenticate, (req, res) => {
  try {
    const categories = db.prepare(
      'SELECT * FROM categories WHERE user_id = ?'
    ).all(req.userId) as Array<{
      id: number
      name: string
      type: 'income' | 'expense'
      color: string
    }>

    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kategoriler alınamadı' })
  }
})

// Create new category
router.post('/', authenticate, (req, res) => {
  try {
    const { name, type, color } = req.body

    const stmt = db.prepare(
      'INSERT INTO categories (user_id, name, type, color) VALUES (?, ?, ?, ?)'
    )
    const result = stmt.run(req.userId, name, type, color)

    const newCategory = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid) as {
      id: number
      name: string
      type: 'income' | 'expense'
      color: string
    }

    res.status(201).json(newCategory)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kategori oluşturulamadı' })
  }
})

export default router