import {
    useState,
    useEffect
} from 'react'
import {
    GetTotalAjax,
    UpdateTotalAjax,
    AddExpenseAjax,
    AddIncomeAjax,
    GetExpenseRecordAjax,
    GetIncomeRecordAjax
} from '@utils/ajax'
import { useUserInfo } from '@providers/UserProvider'
import Form from '@components/form/Form'
import Switch from '@components/Switch'
import TotalSavings from '@components/TotalSavings'
import { formatFormValuesForSchema } from '@utils/format'

const Calculator = () => {
    const [total, setTotal] = useState(0)
    const [formType, setFormType] = useState('expense')
    const isExpense = formType === 'expense'
    const { uid } = useUserInfo()

    const update = async (calcValues: {formValue: FormValue; subTotal: number}) => {
        const { subTotal } = calcValues
        handleTotal(subTotal)
        
        const readyData: FormValueReadyToSend = formatFormValuesForSchema(calcValues.formValue)
        const doesExist = await checkIfExistThisMonth(readyData)
        handleAjax(readyData, doesExist ?? false)
    }

    const handleTotal = (subTotal: number) => {
        const updatedAmount = isExpense ? total - subTotal : total + subTotal
        setTotal(updatedAmount)
    }

    const checkIfExistThisMonth = async (readyData: FormValueReadyToSend): Promise<boolean> => {  
        try {
            const response = formType === 'expense' 
            ? await GetExpenseRecordAjax(readyData.yearmonth, uid)
            : await GetExpenseRecordAjax(readyData.yearmonth, uid)

            if (response.data.success) return response.data.exist 
            throw 'Something went wrong.'
        }
        catch (err) {
            throw err
        }
    }

    const handleAjax = (data: FormValueReadyToSend, exist: boolean) => {
        formType === 'expense'
            ? AddExpenseAjax(data, uid, exist)
            : AddIncomeAjax(data, uid, exist)
        // UpdateTotalAjax({total}, uid)
    }

    useEffect(() => {
        if (uid !== 0) {
            GetTotalAjax(uid)
            .then(res => { setTotal(res.data.data.total)})
        }
    },[uid])

    return (
        <div>
            <TotalSavings total={total}/>
            <Switch onChange={setFormType}/>
            <hr className='mb-4' />
            <Form onCalc={update} type={formType}/>
        </div>
    )
}

export default Calculator