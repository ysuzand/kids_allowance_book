import express from 'express'
import db from './db/index.js'
import cors from 'cors'
const app = express()
const port = 4000

app.use(cors({
    origin: 'http://localhost:5173'
}))
/**
 * -----------------------------
 * :OPERATION: | :METHOD: | :PATH:
 * -----------------------------
 * Create a user | POST | '/api/user/'
 * Get your savings | GET | '/api/savings/:uid'
 * Add your new saving | POST | '/api/savings/:uid'
 */
app.get('/api/savings', (req, res) => {
    const sql = 'SELECT * FROM saving_group'
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.json({
                "message":"error"
            })
            return
        }

        res.json({
            "message":"success",
            "data":rows
        })
    })
  })

// app.post('/api/user/:id/savings', (req, res) => {
//     const sql = 'INSERT INTO users (name, password) VALUES (?,?)'
//     const params = []
// })

app.listen(port, () => {
    console.log(`Server is running on: ${port}`)
})