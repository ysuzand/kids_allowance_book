import type { ChangeEvent, FormEvent } from 'react'
import { useState, createElement, useMemo} from 'react'
import { getFormValueObject, exploitKeysFromData } from '@utils/format'
import Input from '@components/form/Input'
import Select from '@components/form/Select'
import SubmitButton from '@components/form/Submit'
import { expenseFormMap, incomeFormMap } from '../../map/form'


type InputComponent = ({ type, id, icon, color, width, placeholder, suffix, onChange, value }: InputProps) => JSX.Element
type InputSelectComponent = ({ options, id, defaultValue }: InputSelectProps) => JSX.Element
interface IFormItem {
    [key: string]: 
        InputComponent
        |
        InputSelectComponent
}

const formItem: IFormItem = {
    'Input': Input, 
    'Select': Select
}

const initFormValues: {[key: string]: number | string} = {
    'food': '',
    'school': '',
    'hobby': '',
    'fashion': '',
    'income': '',
    'year': '',
    'month': ''
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
        const inputValue = +e.target.value
        inputValue === 0
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
        const removeYearMonthFromFormValue: FormValue = exploitKeysFromData<FormValue>(formValue, ['year', 'month'])
        const subTotal = Object.values(removeYearMonthFromFormValue).reduce((total: number, value) => total + (+value), 0)
        setSubTotal(subTotal)
        
        return subTotal
    }

    const createForm = (type: string) => {
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
                                            formItem[component] as InputComponent,
                                            {
                                                ...componentRow.props,
                                                value: state[componentRow.props.id],
                                                onChange: handleInputValue,
                                                key: 'nested-' + j
                                            }
                                        )
                                    }
                                    return createElement(
                                        formItem[component] as  InputSelectComponent, 
                                        {
                                            ...componentRow.props,
                                            onChange: handleInputValue,
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
                        formItem[item.component] as InputComponent,
                        {  
                            ...item.props,
                            value: state[item.props.id],
                            onChange: handleInputValue,
                            key: i
                        }
                    )
                }
                return createElement(
                    formItem[item.component] as InputSelectComponent, 
                    {   ...item.props,
                        onChange: handleInputValue,
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

    const expenseForm = createForm('expense')
    const incomeForm = createForm('income')
    
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