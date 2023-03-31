import { useState, useEffect } from 'react'
import { GetTotalDB, UpdateTotalDB } from '@utils/fetch'
import { useUserInfo } from '@providers/UserProvider'
import Form from '@components/form/Form'
import Switch from '@components/Switch'

const Calculator = ({className}: {className: string}) => {
    const [total, setTotal] = useState(0)
    const [formType, setFormType] = useState('expense')
    const [inputData, setInputData] = useState({})
    const isExpense = formType === 'expense'
    const { uid } = useUserInfo()

    const updateTotal = (calcValues: {formValue: {[key: string]: FormDataEntryValue}; subTotal: number}) => {
        const subTotal = calcValues.subTotal
        const updatedAmount = isExpense ? total - subTotal : total + subTotal
        setTotal(updatedAmount)
        UpdateTotalDB({total: updatedAmount}, uid)
        setInputData(calcValues.formValue) // DB instead.
    }

    const switchForm = (radioValue: string) => {
        setFormType(radioValue)
    }

    useEffect(() => {
        if (uid !== 0) {
            GetTotalDB(uid)
            .then(res => { setTotal(res.data.data.total)})
        }
    },[uid])

    return (
        <div className={`${className}`}>
            <div className='flex justify-center items-end'>
                <img src='/assets/bank.svg' alt='bank' width='64' height='64' />
                <div className='text-4xl'>{ total }</div>
            </div>
            <Switch onChange={switchForm}/>
            <Form amount={total} onCalc={updateTotal} type={formType}/>
        </div>
    )
}

export default Calculator