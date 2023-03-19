import type { ChangeEvent, FormEvent, FormEventHandler, ReactNode } from 'react'
import { useState, useEffect, useCallback, useReducer } from 'react'
import Form from '@components/form/Form'
import cupcake from '@assets/cupcake.svg'

const Calculator = () => {
    const [amount, setAmount] = useState(1000)
    const [minusAmount, setMinusAmount] = useState(0)

    const calcAmount = (formData: {[key: string]: FormDataEntryValue}) => {
        const minusValue = Object.values(formData).reduce((total, value) => total + (+value), 0)
        setMinusAmount(minusValue)
    }

    useEffect(() => {
        setAmount(current => current - minusAmount)
    }, [minusAmount])

    return (
        <>
            <Form amount={amount} onCalc={calcAmount}/>
            { minusAmount }
        </>
    )
}

export default Calculator