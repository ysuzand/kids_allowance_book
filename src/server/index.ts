import express from 'express'
import {
    getTotal,
    updateTotal,
    addExpenses,
    addIncome,
    checkThisMonthExpenses,
    checkThisMonthIncome,
    updateExpenses,
    updateIncome
} from './controllers/savings'
import {
    findUser,
    createUser,
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
//@TODO: add app.post('/api/login/user-input')
app.post('/api/login/user-input', createUser)
/**
 * CRUD API
 */
app.get('/api/savings/:uid', getTotal)
app.patch('/api/savings/:uid', updateTotal)

app.get('/api/savings/:uid/expenses/:yearmonth', checkThisMonthExpenses)
app.patch('/api/savings/:uid/expenses', updateExpenses) //@TODO
app.put('/api/savings/:uid/expenses', addExpenses)

app.get('/api/savings/:uid/income/:yearmonth', checkThisMonthIncome)
app.patch('/api/savings/:uid/income', updateIncome) //@TODO
app.put('/api/savings/:uid/income', addIncome)


app.listen(port, () => {
    console.log(`Server is running on: ${port}`)
})