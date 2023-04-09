const InputSelect = ({
    options,
    id,
    width,
    defaultValue
}: InputSelectProps) => {
    return (
        <>
        <label htmlFor={id} className='w-0 invisible'>{id}</label>
        <select
            id={id}
            name={id}
            defaultValue={defaultValue}
            className={`border-4 border-black px-4 rounded-full ${width !== 'full' && 'w-32'}`}>
            { options.map(
                (option, i) => 
                    <option key={i} value={ option.value }>
                        { option.label }
                    </option>
            )}
        </select>
        </>
    )
}

export default InputSelect