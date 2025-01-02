import Input from '@components/form/Input'
import SubmitButton from '@components/form/Submit'
import { SyntheticEvent } from 'react'
import { CreateAuth } from '@utils/ajax'

const LoginWithUserInput = () => {
	const checkAuth = (e: SyntheticEvent) => {
		e.preventDefault();
		
		const target = e.target as typeof e.target & {
			name: { value: string };
			password: { value: string };
		  };
	
		const name = target.name.value;
		const password = target.password.value;

		CreateAuth({name, password})
		console.log('@TODO: Check auth in api/login/user-input')
	}
	return (
		<form onSubmit={checkAuth}>
			<Input
				type='text'
				id='name'
				placeholder='Username' />
			<Input
				type='password'
				id='password'
				placeholder='Password' />
			<SubmitButton className='px-4'>
				Login
			</SubmitButton>
		</form>
	)
}

export default LoginWithUserInput