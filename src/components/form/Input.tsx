import { ChangeEvent } from 'react'


const Input = ({
    type,
    id,
    icon,
    color,
    onChange = (event: ChangeEvent) => {},
    value
}: InputProps) => {
    return (
        <div className='w-full flex'>
            <div className={`${color} rounded-full w-12 h-12 flex items-center justify-center`}>
                <img src={icon} width='32' height='32' />
            </div>
            <label htmlFor={id}>{id}</label>
            <input
                id={id}
                name={id}
                onChange={e => onChange(e)}
                value={value}
                placeholder='0'
                className="border-4 py-1 px-4 border-black rounded-full"
                type={type}
            />
        </div>
    )
}

export default Input