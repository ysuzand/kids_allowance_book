import { PropsWithChildren } from 'react'

const SubmitButton = ({children}: PropsWithChildren) => {

    return (
        <button className='transition ease-in h-12 border-black border-4 rounded-full bg-indigo-600 hover:bg-indigo-800 text-white text-2xl'>
            { children }
        </button>
    )
}

export default SubmitButton