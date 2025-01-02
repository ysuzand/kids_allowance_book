import { CheckAuth } from '@utils/ajax'
import { useState, useEffect } from 'react'
import IconButton from '@components/Icon'
import LoginWithUserInput from './LoginWithUserInput'
import { getAuthSession } from '@utils/storage'

const hardCodedUser = 'Star'
const Login = ({
	onAuth
}: {
	onAuth: (isAuth: boolean, userInfo: UserInfo | null) => void
}) => {
	const [isEasyLogin, setIsEasyLogin] = useState(true);

	useEffect(() => {
		const session = getAuthSession()

		if(!session) {
			setIsEasyLogin(false)
		} 
	}, [])

	const handleEasyLogin = async (uid: number) => {
		let uuid = ''
		try {
			uuid = localStorage.getItem('session') ?? ''
			if (!uuid) {
				onAuth(false, null)
				console.info('TODO: redirect to proper login page.')
				setIsEasyLogin(false)
			} else {
				console.log(uid, uuid)
				const res = await CheckAuth({uid, uuid})
			console.log("auth success!", res)
			onAuth(true, res.data)
			}
		}
		catch(e) {
			console.log(e)
		}
	}
	return (
		<section>
			{
				isEasyLogin
				? <>
						<h1>Click your user name to login</h1>
						<div className='my-8 flex justify-center'>
							<button onClick={() => handleEasyLogin(1)} className='flex flex-col w-fit'>
								<IconButton
									color='bg-sky-500'
									iconSrc='/assets/user-icons/star.svg'
									alt='login'
								/>
								<div className='w-full'>Star</div>
							</button>
						</div>
						<p
							onClick={() => setIsEasyLogin(false)}
							className='hover:underline cursor-pointer'
						>
							Click here if you are you not {hardCodedUser}.
						</p>
					</>
				: <LoginWithUserInput />
			}
			
		</section>
	)
}

export default Login