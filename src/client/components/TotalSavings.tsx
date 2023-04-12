const TotalSavings = ({total}: TotalSavingsProps) => {
    return(
        <div className='flex justify-center items-end'>
            <img src='/assets/bank.svg' alt='bank' width='64' height='64' />
            <div className='text-7xl'>{ total }</div>
        </div>
    )
}

export default TotalSavings