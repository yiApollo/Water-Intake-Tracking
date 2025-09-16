const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.POSTGRES_DB || 'waterdb',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: 5432,
});

// Create table if not exists
pool.query(`CREATE TABLE IF NOT EXISTS water_intake (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  date DATE NOT NULL,
  amount INTEGER NOT NULL
)`);

// Register water intake
app.post('/api/intake', async (req, res) => {
  const { user_id, date, amount } = req.body;
  if (!date || !amount) return res.status(400).json({ error: 'Missing fields' });
  try {
    await pool.query(
      'INSERT INTO water_intake (user_id, date, amount) VALUES ($1, $2, $3)',
      [user_id || 'default', date, amount]
    );
    res.status(201).json({ message: 'Intake registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get daily total
app.get('/api/intake', async (req, res) => {
  const { user_id, date } = req.query;
  try {
    const result = await pool.query(
      'SELECT SUM(amount) as total FROM water_intake WHERE user_id = $1 AND date = $2',
      [user_id || 'default', date]
    );
    res.json({ total: result.rows[0].total || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get history
app.get('/api/history', async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await pool.query(
      'SELECT date, SUM(amount) as total FROM water_intake WHERE user_id = $1 GROUP BY date ORDER BY date',
      [user_id || 'default']
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
