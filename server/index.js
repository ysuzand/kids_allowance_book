import express from 'express'
import controllers from './controllers/index.js'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
const port = 4000

app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:5173'
}))

/**
 * AUTH
 */
app.post('/api/login',controllers.findUser)

/**
 * API
 * -----------------------------
 * :OPERATION: | :METHOD: | :PATH:
 * -----------------------------
 * Get your savings | GET | '/api/savings?uid=?'
 * Add your new saving | PATCH | '/api/savings/:uid'
 */
app.get('/api/savings/:uid', controllers.getTotal)
app.patch('/api/savings/:uid', controllers.updateTotal)

app.listen(port, () => {
    console.log(`Server is running on: ${port}`)
})