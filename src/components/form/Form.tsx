import { ChangeEvent, FormEvent, useCallback, useReducer } from 'react'
import { useState, createElement, useMemo } from 'react'
import Input from '@components/form/Input'
import SubmitButton from '@components/form/Submit'
import cupcake from '@assets/cupcake.svg'
import { expenseFormMap, incomeFormMap } from '../../map/form'
import { Wait } from '@utils/index'

const reducer = (
    state: {
        [key: string]: number;
    }[] | undefined,
    action: {
        type: string,
        id: string,
        input: number;
    }
) => {
    if (action.type === 'SET_INPUT') {
        const newItem = { [action.id]: action.input }
        const newItemKeys = state?.map(item => Object.keys(item)).flat() ?? []
        state = !state
        ? [newItem]
        : newItemKeys.includes(action.id)
            ? state //@TODO: replace item
            : [...state, newItem]
    
    
        console.log(state)
        return state
    }
}

const FormItem: {[key: string]: ({ type, id, onChange }: InputProps) => JSX.Element} = {
    'Input': Input
}

let initFormValues: {[key: string]: number | string} = {
    'snacks': '',
    'school': '',
    'hobby': '',
    'fashion': ''
}

const Form = ({
    amount,
    type,
    onCalc
}: {
    amount: number;
    type: string;
    onCalc: (value: {[key: string]: FormDataEntryValue}) => void;
}) => {
    const [state, setState] = useState<{[key: string]: number | string}>(initFormValues)
    const [subTotal, setSubTotal] = useState(0)
    const [error, setError] = useState('')
    // const [item, dispatch] = useReducer(reducer, [])

    const initForm = () => {
        setState(initFormValues)
    }

    const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const item = e.target.id
        const inputValue = +e.target.value
       
        inputValue === 0
        ? setState({...state, [item]: ''})
        : setState({...state, [item]: inputValue})
        // dispatch({
        //     type: 'SET_INPUT',
        //     id: e.target.id,
        //     input: inputValue
        // })
        
        // setSubTotal(currentTotal => currentTotal + inputValue)
        
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)
        const valueObject = Object.fromEntries(data.entries());
        onCalc(valueObject)
        initForm()
    }

    const createForm = (type: string) => {
        const form = type === 'expense' ? expenseFormMap : incomeFormMap
        return (form as FormItem[]).map((item, i) => {
            if (typeof FormItem[item.component] !== 'undefined') {
                if (item.component === 'Input') {                    
                    return createElement(
                        FormItem[item.component],
                        {  
                            ...item.props,
                            value: state[item.props.id],
                            onChange: handleInputValue,
                            key: i
                        }
                    )
                }
                return createElement(FormItem[item.component],  {...item.props, key: i})
            }
            return createElement(item.component, { children: item.content, key: i })
        })

    }
        
 

    
    return (
        <>
            <form className='flex flex-col gap-10' onSubmit={onSubmit}>
                <div className='flex flex-col gap-4'>
                { createForm(type).map(item => item) }
                </div>
                <SubmitButton>{type === 'expense' ? 'Calculate' : 'Add'}</SubmitButton>
            </form>
            <div>SubTotal: {subTotal}</div>
        </>
    )
}


export default Form