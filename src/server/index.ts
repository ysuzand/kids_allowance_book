import express from 'express'
import {
    getTotal,
    updateTotal,
    addExpenses,
    addIncome
} from './controllers/savings'
import {
    findUser
} from './controllers/user'
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
 * CRUD API
 */
app.get('/api/savings/:uid', getTotal)
app.put('/api/savings/:uid/expenses', addExpenses)
app.put('/api/savings/:uid/income', addIncome)
app.patch('/api/savings/:uid', updateTotal)

app.listen(port, () => {
    console.log(`Server is running on: ${port}`)
})