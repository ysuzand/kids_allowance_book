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
 * -----------------------------
 * :OPERATION: | :METHOD: | :PATH:
 * -----------------------------
 * Create a user | POST | '/api/user/'
 * Get your savings | GET | '/api/savings?uid=?'
 * Add your new saving | POST | '/api/savings/:uid?total=?'
 */
app.get('/api/savings/:uid', controllers.getTotal)
app.patch('/api/savings/:uid', controllers.updateTotal)

app.listen(port, () => {
    console.log(`Server is running on: ${port}`)
})