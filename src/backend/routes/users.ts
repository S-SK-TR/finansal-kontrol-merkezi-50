import express from 'express'
import { db } from '../db'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Get current user profile
router.get('/me', authenticate, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(req.userId) as {
      id: number
      email: string
      name: string
    }

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Profil alınamadı' })
  }
})

// Update user profile
router.put('/me', authenticate, (req, res) => {
  try {
    const { name, email } = req.body

    const stmt = db.prepare(
      'UPDATE users SET name = ?, email = ? WHERE id = ?'
    )
    stmt.run(name, email, req.userId)

    const updatedUser = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(req.userId) as {
      id: number
      email: string
      name: string
    }

    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Profil güncellenemedi' })
  }
})

export default router