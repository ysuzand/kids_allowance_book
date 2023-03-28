import type { ChangeEvent } from 'react'
import { useState } from 'react'
import Icon from '@components/Icon'

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
            <Icon color={color} iconSrc={icon} />
            <div className='flex relative w-5/6'>
            <label htmlFor={id} className='w-0 invisible'>{id}</label>
            <input
                id={id}
                name={id}
                onChange={e => onChange(e)}
                value={value}
                placeholder={`${id}: 0`}
                className='border-black rounded-full w-full py-1 pl-4 pr-14 border-4 capitalize'
                type={type}
            />
            <span className='absolute right-6 top-3'>Kr</span>
            </div>
        </div>
    )
}

export default Input