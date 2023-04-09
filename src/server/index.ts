import express from 'express'
import {
    getTotal,
    updateTotal,
    addSavingDetails,
    findUser
} from './controllers/index'
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
app.post('/api/login', findUser)

/**
 * API
 * -----------------------------
 * :OPERATION: | :METHOD: | :PATH:
 * -----------------------------
 * Get your savings | GET | '/api/savings?uid=?'
 * Add your new total | PATCH | '/api/savings/:uid'
 */
app.get('/api/savings/:uid', getTotal)
app.put('/api/savings/add', addSavingDetails)
app.patch('/api/savings/:uid', updateTotal)

app.listen(port, () => {
    console.log(`Server is running on: ${port}`)
})