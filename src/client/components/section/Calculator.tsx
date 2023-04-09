import {
    useState,
    useEffect
} from 'react'
import {
    GetTotalAjax,
    UpdateTotalAjax,
    PutSavingsAjax
} from '@utils/ajax'
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
        const formValues = calcValues.formValue
        setTotal(updatedAmount)
        PutSavingsAjax(formValues, uid)
        // UpdateTotalAjax({total: updatedAmount}, uid)
        console.log(formValues)
        setInputData(calcValues.formValue) // Ajax instead.
    }

    const switchForm = (radioValue: string) => {
        setFormType(radioValue)
    }

    useEffect(() => {
        if (uid !== 0) {
            GetTotalAjax(uid)
            .then(res => { setTotal(res.data.data.total)})
        }
    },[uid])

    return (
        <div className={`${className}`}>
            <div className='flex justify-center items-end'>
                <img src='/assets/bank.svg' alt='bank' width='64' height='64' />
                <div className='text-7xl'>{ total }</div>
            </div>
            <Switch onChange={switchForm}/>
            <hr className='mb-4' />
            <Form onCalc={updateTotal} type={formType}/>
        </div>
    )
}

export default Calculator