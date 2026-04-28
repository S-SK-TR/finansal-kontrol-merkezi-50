import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../db'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    const stmt = db.prepare(
      'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)'
    )
    const result = stmt.run(email, passwordHash, name)

    // Create default categories for new user
    const userId = result.lastInsertRowid
    db.prepare(
      'INSERT INTO categories (user_id, name, type, color) VALUES (?, ?, ?, ?)'
    ).run(userId, 'Maaş', 'income', '#10b981')
    db.prepare(
      'INSERT INTO categories (user_id, name, type, color) VALUES (?, ?, ?, ?)'
    ).run(userId, 'Alışveriş', 'expense', '#f59e0b')
    db.prepare(
      'INSERT INTO categories (user_id, name, type, color) VALUES (?, ?, ?, ?)'
    ).run(userId, 'Yemek', 'expense', '#ef4444')

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

    res.status(201).json({
      user: {
        id: userId,
        email,
        name,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as {
      id: number
      email: string
      password_hash: string
      name: string
    }

    if (!user) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Giriş sırasında bir hata oluştu' })
  }
})

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Çıkış yapıldı' })
})

// Get current user
router.get('/me', (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Oturum açılmamış' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(decoded.userId) as {
      id: number
      email: string
      name: string
    }

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' })
    }

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Geçersiz token' })
  }
})

export default router