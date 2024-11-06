import express from 'express'
import db from '#configs/mysql.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM lesson')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await db.query(`SELECT * FROM lesson WHERE id =?`, [id])
    const [photo_rows] = await db.query(
      `SELECT * FROM lesson_photo WHERE lesson_id =?`,
      [id]
    )
    const [teacher_rows] = await db.query(`SELECT * FROM teacher WHERE id=?`, [
      rows[0].teacher_id,
    ])
    res.json({
      lesson: rows,
      photo: photo_rows,
      teacher: teacher_rows,
    })
  } catch (error) {
    res.status(500).json({ error: '拿不到細節資料' })
  }
})

export default router
