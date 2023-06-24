import Input from '@components/form/Input'
import SubmitButton from '@components/form/Submit'
import { FormEvent } from 'react'

const LoginWithUserInput = () => {
	const checkAuth = (e: FormEvent) => {
		e.preventDefault()
		console.log('@TODO: Check auth in api/login/user-input')
	}
	return (
		<form onSubmit={checkAuth}>
			<Input
				type='text'
				id='username'
				placeholder='Username' />
			<Input
				type='password'
				id='password'
				placeholder='Password' />
				<SubmitButton
					className='px-4'>
				Login</SubmitButton>
		</form>
	)
}

export default LoginWithUserInput