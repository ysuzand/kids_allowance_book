import type {
    ChangeEvent,
    FormEvent,
    FunctionComponent
} from 'react'
import {
    useState,
    createElement
} from 'react'
import { 
    getFormValueObject,
    extractKeysFromData
} from '@utils/format'
import Input from '@components/form/Input'
import Select from '@components/form/Select'
import SubmitButton from '@components/form/Submit'
import { expenseFormMap, incomeFormMap } from '../../map/form'

interface IFormItem {
    [key: string]: 
        |FunctionComponent<InputProps>
        |FunctionComponent<InputSelectProps>
}
type FormValueState = {[key: string]: number | string}

const formItem: IFormItem = {
    Input, 
    Select
}

const initFormValues: FormValueState = {
    'food': '',
    'school': '',
    'hobby': '',
    'fashion': '',
    'income': '',
    'year': '',
    'month': '',
    'memo': ''
}

const createForm = (type: string, state: FormValueState, inputValueHandler: (...args: any) => void) => {
    const form = type === 'expense' ? expenseFormMap : incomeFormMap
    return form.map((item, i) => {
        // If several components need to be in one row.
        if ('components' in item) {
            return (
                <div key={i} className='flex justify-end gap-2 h-12'>
                    {
                        (item.components as ComponentInArray[]).map((componentRow, j) => {
                            if (typeof formItem[componentRow.component] !== 'undefined') {
                                const component = componentRow.component as string
                                if (component === 'Input') {
                                    return createElement(
                                        formItem[component] as FunctionComponent<InputProps>,
                                        {
                                            ...componentRow.props,
                                            value: state[componentRow.props.id],
                                            onChange: inputValueHandler,
                                            key: 'nested-' + j
                                        }
                                    )
                                }
                                return createElement(
                                    formItem[component] as FunctionComponent<InputSelectProps>, 
                                    {
                                        ...componentRow.props,
                                        onChange: inputValueHandler,
                                        key: 'nested-' + j
                                    }
                                )
                            }
                        })
                    }
                </div>
            ) 
        }
        // If one component per row.
        else if (item.component && typeof formItem[item.component] !== 'undefined') {
            if (item.component === 'Input') {             
                return createElement(
                    formItem[item.component] as FunctionComponent<InputProps>,
                    {  
                        ...item.props,
                        value: state[item.props.id],
                        onChange: inputValueHandler,
                        key: i
                    }
                )
            }
            return createElement(
                formItem[item.component] as FunctionComponent<InputSelectProps>, 
                {   ...item.props,
                    onChange: inputValueHandler,
                    key: i
                }
            )
        }
        return createElement(
            item.component!,
            { children: item.content, key: i }
        )
    })
}

const Form = ({
    type,
    onCalc
}: {
    type: string;
    onCalc: (value: {formValue: FormValue; subTotal: number}) => void;
}) => {
    const [state, setState] = useState<{[key: string]: number | string}>(initFormValues)
    const [subTotal, setSubTotal] = useState(0)

    const initForm = () => {
        setState(initFormValues)
    }

    const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const item = e.target.id
        const inputValue = e.target.value
        typeof inputValue === 'number' && inputValue === 0
        ? setState({...state, [item]: ''})
        : setState({...state, [item]: inputValue})        
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const { formValue } = getFormValueObject(e.target as HTMLFormElement)
        const subTotal = calcSubTotal(formValue)
        onCalc({formValue, subTotal})
        initForm()
    }

    const calcSubTotal = (formValue: FormValue) => {
        const removeTextFields: FormValue = extractKeysFromData<FormValue>(formValue, ['year', 'month', 'memo'])
        const subTotal = Object.values(removeTextFields).reduce((total: number, value) => total + (+value), 0)
        setSubTotal(subTotal)
        
        return subTotal
    }
    
    const expenseForm = createForm('expense', state, handleInputValue)
    const incomeForm = createForm('income', state, handleInputValue)
    
    return (
        <>
            <form className='flex flex-col gap-10' onSubmit={onSubmit}>
                <div className='flex flex-row'>
                    <div className='flex flex-col gap-4 w-full'>
                        {
                            type === 'expense'
                            ? expenseForm
                            : incomeForm
                        }
                    </div>
                </div>
                <SubmitButton>
                    {type === 'expense' ? 'Calculate' : 'Add'}
                </SubmitButton>
            </form>
            <div>SubTotal: {subTotal}</div>
        </>
    )
}

export default Form