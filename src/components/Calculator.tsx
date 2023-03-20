import type { ChangeEvent, FormEvent, FormEventHandler, ReactNode } from 'react'
import { useState, useEffect, useCallback, useReducer } from 'react'
import Form from '@components/form/Form'
import cupcake from '@assets/cupcake.svg'

const Calculator = () => {
    const [amount, setAmount] = useState(1000)
    const [formType, setFormType] = useState('expense')
    const [inputData, setInputData] = useState({})
    const [inputAmount, setInputAmount] = useState(0)
    const isExpense = formType === 'expense'

    const calcAmount = (formData: {[key: string]: FormDataEntryValue}) => {
        setInputData(formData)
        const myValue = Object.values(formData).reduce((total, value) => total + (+value), 0)
        setInputAmount(myValue)
    }

    const toggleType = () => {
        isExpense ? setFormType('income') : setFormType('expense')
    }

    useEffect(() => {
        setAmount(current => isExpense ? current - inputAmount : current + inputAmount)
    }, [inputAmount])

    return (
        <>
            <div className='text-4xl'>{ amount }</div>
            <button onClick={toggleType}>REGISTER MY {isExpense ? 'INCOME' : 'EXPENSE'}</button>
            <Form amount={amount} onCalc={calcAmount} type={formType}/>
            <div>{ inputAmount }</div>
        </>
    )
}

export default Calculator