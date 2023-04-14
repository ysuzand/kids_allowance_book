import { ChangeEvent, useState } from 'react'
const Switch = ({
    onChange
}: {
    onChange: (value: string) => void
}) => {
    const [selected, setSelected] = useState('expense')
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value)
        onChange(e.target.value)
    }
    return (
        <form className='relative w-80 mx-auto mb-4'>
            <div className={`h-12 w-40 bg-orange-500 border-4 border-black transition-transform rounded-full ${selected === 'expense' ? 'translate-x-40' : 'translate-x-0'}`}></div>
            <div className='flex flex-row absolute top-0'>
                <label className='flex justify-center items-center h-12 w-40 text-xl'>
                    <input
                        type='radio'
                        name='switch'
                        value='income'
                        onChange={handleCheck}
                        checked={selected === 'income'}
                        className='hidden'
                    />
                    <span>Income</span>
                </label>
                <label className='flex justify-center items-center h-12 w-40 text-xl'>
                    <input
                        type='radio'
                        name='switch'
                        value='expense'
                        onChange={handleCheck}
                        checked={selected === 'expense'}
                        className='hidden'
                    />
                    <span>Expense</span>
                </label>
            </div>
        </form>
    )
}

export default Switch