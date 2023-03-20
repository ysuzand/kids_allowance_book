import { ChangeEvent, FormEvent, useCallback } from 'react'
import { useState, createElement } from 'react'
import Input from '@components/form/Input'
import SubmitButton from '@components/form/Submit'
import cupcake from '@assets/cupcake.svg'
import { formMap } from '../../map/form'
import { Wait } from '@utils/index'

// const reducer = (
//     state: {
//         category: string;
//         minusAmount: number;
//     }[],
//     action: {
//         type: string,
//         amount: number
//     }
// ) => {
//     if (action.type === 'init') return []
//     return [...state, { category: action.type, minusAmount: action.amount }]
// }

const FormItem: {[key: string]: ({ type, id, onChange }: InputProps) => JSX.Element} = {
    'Input': Input
}

let initFormValues: {[key: string]: number | string} = {
    'snacks': '',
    'school': '',
    'hobby': ''
}

const Form = ({
    amount,
    onCalc
}: {
    amount: number;
    onCalc: (value: {[key: string]: FormDataEntryValue}) => void;
}) => {
    const [state, setState] = useState<{[key: string]: number | string}>(initFormValues)

    const initForm = () => {
        setState(initFormValues)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const item = e.target.id
        setState({...state, [item]: e.target.value})
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)
        const valueObject = Object.fromEntries(data.entries());
        onCalc(valueObject)
       initForm()
    }

    const getFormItems = () => 
        (formMap as FormItem[]).map((item, i) => {
            if (typeof FormItem[item.component] !== 'undefined') {
                if (item.component === 'Input') {                    
                    return createElement(
                        FormItem[item.component],
                        {  
                            ...item.props,
                            value: state[item.props.id],
                            onChange,
                            key: i
                        }
                    )
                }
                return createElement(FormItem[item.component],  {...item.props, key: i})
            }
            return createElement(item.component, { children: item.content, key: i })
        })
    
    return (
        <>
            <div className='text-4xl'>{ amount }</div>
            <form className='flex gap-2 flex-col' onSubmit={onSubmit}>
                { getFormItems().map(item => item)}
                <SubmitButton>Calculate</SubmitButton>
            </form>
            
        </>
    )
}


export default Form