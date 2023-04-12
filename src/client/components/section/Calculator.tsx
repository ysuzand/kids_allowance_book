import {
    useState,
    useEffect
} from 'react'
import {
    GetTotalAjax,
    UpdateTotalAjax,
    AddExpenseAjax,
    AddIncomeAjax
} from '@utils/ajax'
import { useUserInfo } from '@providers/UserProvider'
import Form from '@components/form/Form'
import Switch from '@components/Switch'
import TotalSavings from '@components/TotalSavings'
import { formatFormValues } from '@utils/format'

const Calculator = ({className}: {className: string}) => {
    const [total, setTotal] = useState(0)
    const [formType, setFormType] = useState('expense')
    const [inputData, setInputData] = useState({})
    const isExpense = formType === 'expense'
    const { uid } = useUserInfo()

    const updateTotal = <R,>(calcValues: {formValue: FormValue; subTotal: number}) => {
        const subTotal = calcValues.subTotal
        const updatedAmount = isExpense ? total - subTotal : total + subTotal
        const formValues = calcValues.formValue
        setTotal(updatedAmount)
        //@ts-ignore @TODO: type check.
        console.log(formatFormValues(formValues, formType))
        // formatFormValues<R>(formValues, type)
        //@ts-ignore @TODO: type check.
        // formType === 'expense' ? AddExpenseAjax(formValues, uid) : AddIncomeAjax(formValues, uid)
        
        
        // UpdateTotalAjax({total: updatedAmount}, uid)
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
            <TotalSavings total={total}/>
            <Switch onChange={switchForm}/>
            <hr className='mb-4' />
            <Form onCalc={updateTotal} type={formType}/>
        </div>
    )
}

export default Calculator