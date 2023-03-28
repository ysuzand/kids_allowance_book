import type { ChangeEvent, FormEvent, FormEventHandler, PropsWithChildren, ReactNode } from 'react'
import { useState, useEffect, useCallback, useReducer } from 'react'
import { Fetch } from '@utils/fetch'
import Form from '@components/form/Form'
import Switch from '@components/Switch'

const Calculator = ({className}: {className: string}) => {
    const [amount, setAmount] = useState(0)
    const [formType, setFormType] = useState('expense')
    const [inputData, setInputData] = useState({})
    const [inputAmount, setInputAmount] = useState(0)
    const isExpense = formType === 'expense'

    const calcAmount = (calcValues: {formValue: {[key: string]: FormDataEntryValue}; subTotal: number}) => {
        setInputData(calcValues.formValue) // DB instead.
        // const myValue = Object.values(formValue).reduce((total, value) => total + (+value), 0)
        setInputAmount(calcValues.subTotal)
    }

    const switchForm = (radioValue: string) => {
        setFormType(radioValue)
    }

    useEffect(() => {
        setAmount(current => isExpense ? current - inputAmount : current + inputAmount)
        setInputAmount(0)
    }, [inputAmount])

    useEffect(() => {
        Fetch('/savings')
        .then(res => console.log(res.data))
    },[])

    return (
        <div className={`${className}`}>
            <div className='flex justify-center items-end'>
                <img src='/assets/bank.svg' alt='bank' width='64' height='64' />
                <div className='text-4xl'>{ amount }</div>
            </div>
            <Switch onChange={switchForm}/>
                    <Form amount={amount} onCalc={calcAmount} type={formType}/>
            <div>{ inputAmount }</div>
        </div>
    )
}

export default Calculator