import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { initDb } from './db'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import categoryRoutes from './routes/categories'
import transactionRoutes from './routes/transactions'
import dashboardRoutes from './routes/dashboard'
import reportRoutes from './routes/reports'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Database
initDb()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/reports', reportRoutes)

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Bir hata oluştu' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})