import { PropsWithChildren } from 'react'

const SubmitButton = ({children}: PropsWithChildren) => {

    return <button className='h-12 border-black border-4 rounded-full'>{ children }</button>
}

export default SubmitButton