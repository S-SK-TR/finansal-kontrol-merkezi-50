import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

let db: Database.Database

// Initialize database
function initDb() {
  db = new Database('finance.db', { verbose: console.log })

  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      type TEXT CHECK(type IN ('income','expense')) NOT NULL,
      color TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      category_id INTEGER,
      amount REAL NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(category_id) REFERENCES categories(id)
    );
  `)

  // Create default categories for new users
  db.prepare(
    `INSERT INTO categories (user_id, name, type, color) 
     SELECT ?, 'Maaş', 'income', '#10b981' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE user_id = ? AND name = 'Maaş');`
  ).run(1, 1)

  db.prepare(
    `INSERT INTO categories (user_id, name, type, color) 
     SELECT ?, 'Alışveriş', 'expense', '#f59e0b' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE user_id = ? AND name = 'Alışveriş');`
  ).run(1, 1)

  db.prepare(
    `INSERT INTO categories (user_id, name, type, color) 
     SELECT ?, 'Yemek', 'expense', '#ef4444' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE user_id = ? AND name = 'Yemek');`
  ).run(1, 1)
}

export { db, initDb }