import type { ChangeEvent } from 'react'
import { useState } from 'react'
import Icon from '@components/Icon'

const Input = ({
    type,
    id,
    icon,
    color,
    width,
    placeholder,
    suffix,
    onChange = (event: ChangeEvent): void => {},
    value
}: InputProps) => {    
    return (
        <div className='w-full flex gap-1'>
            { icon && color ? <Icon color={color} iconSrc={icon} /> : null }
            <div className='flex relative w-5/6'>
            <label htmlFor={id} className='w-0 invisible'>{id}</label>
            <input
                id={id}
                name={id}
                onChange={e => onChange(e)}
                value={value}
                placeholder={placeholder ?? `${id}: 0`}
                className={`border-black rounded-full py-1 pl-4 border-4 capitalize w-full ${width === 'full' ? 'pr-14' :''}`}
                type={type}
            />
            <span className='absolute right-6 top-3 text-gray-500'>{suffix ?? 'Kr'}</span>
            </div>
        </div>
    )
}

export default Input