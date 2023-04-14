const SubmitButton = ({
    children,
    disabled = false
}: SubmitButtonProps) => {

    return (
        <button
            disabled={disabled}
            className='transition ease-in h-12 border-black border-4 rounded-full bg-indigo-600 hover:bg-indigo-800 text-white text-2xl'>
            { children }
        </button>
    )
}

export default SubmitButton