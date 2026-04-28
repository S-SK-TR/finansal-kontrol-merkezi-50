import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface AuthRequest extends Request {
  userId?: number
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Oturum açılmamış' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    req.userId = decoded.userId
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Geçersiz token' })
  }
}