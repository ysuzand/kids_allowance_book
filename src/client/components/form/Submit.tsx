import { Css } from "@utils/index"

const SubmitButton = ({
	children,
	disabled = false,
	className = ''
}: SubmitButtonProps) => {

	return (
		<button
			disabled={disabled}
			className={
				Css([
					'transition ease-in h-12 border-black border-4 rounded-full bg-indigo-600 hover:bg-indigo-800 text-white text-2xl',
					className])}
			>
			{ children }
		</button>
	)
}

export default SubmitButton