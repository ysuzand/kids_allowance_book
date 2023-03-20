import type { ChangeEvent } from 'react'
import { useState } from 'react'

const Input = ({
    type,
    id,
    icon,
    color,
    onChange = (event: ChangeEvent) => {},
    value
}: InputProps) => {    
    return (
        <div className='w-full flex gap-1'>
            <div
                className={`${color} rounded-full w-12 h-12 flex items-center justify-center border-4 border-black`}
            >
                <img src={icon} width='28' height='28' />
            </div>
            <div className='flex relative w-5/6'>
            <label htmlFor={id} className='w-0 invisible'>{id}</label>
            <input
                id={id}
                name={id}
                onChange={e => onChange(e)}
                value={value}
                placeholder='0'
                className='border-black rounded-full w-full py-1 pl-4 pr-14 border-4'
                type={type}
            />
            <span className='absolute right-6 top-3'>Kr</span>
            </div>
        </div>
    )
}

export default Input