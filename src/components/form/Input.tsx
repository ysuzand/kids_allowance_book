import { ChangeEvent } from 'react'


const Input = ({
    type,
    id,
    placeholder = '',
    onChange = (event: ChangeEvent) => {},
    value
}: InputProps) => {
    return (
        <div className='w-full'>
            <label htmlFor={id}>{id}</label>
            <input
                id={id}
                name={id}
                onChange={e => onChange(e)}
                value={value}
                placeholder={placeholder}
                className="border-4 py-1 px-4 border-black rounded-full"
                type={type}
            />
        </div>
    )
}

export default Input