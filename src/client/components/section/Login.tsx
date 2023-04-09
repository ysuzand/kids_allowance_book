import { CheckAuth } from '@utils/ajax'
import IconButton from '@components/Icon'


const Login = ({
    onAuth
}: {
    onAuth: (isAuth: boolean) => void
}) => {
    const handleLogin = async (uid: number) => {
        try {
            const res = await CheckAuth({uid})
            console.log("auth success!")
            onAuth(true)
        }
        catch(e) {
            console.log(e)
        }
    }
    return (
        <section>
            <h1>Click your user name to login</h1>
            <div className='my-8 flex justify-center'>
                <button onClick={() => handleLogin(1)} className='flex flex-col w-fit'>
                    <IconButton color='bg-sky-500' iconSrc='/assets/user-icons/star.svg'/>
                    <div className='w-full'>Star</div>
                </button>
            </div>
        </section>
    )
}

export default Login