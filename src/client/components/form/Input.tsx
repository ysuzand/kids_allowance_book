import type { ChangeEvent, WheelEventHandler } from 'react'
import { useState } from 'react'
import Icon from '@components/Icon'

const Input = ({
	type,
	id,
	icon,
	color,
	width,
	placeholder,
	suffix,
	onChange = (event: ChangeEvent): void => {},
	value
}: InputProps) => {
	// Ref: https://medium.com/modernnerd-code/how-to-disabled-scrolling-on-html-number-input-in-react-6548841166fb
	const preventNumberWheel: WheelEventHandler<HTMLInputElement> = e => {
		const target = e.target as HTMLInputElement
		// Prevent the input value change
		target?.blur()
		// Prevent the page/container scrolling
		e.stopPropagation()
		// Refocus immediately, on the next tick
		setTimeout(() => {
			target?.focus()
		}, 0)
	}
	return (
		<div className='w-full flex gap-1'>
			{ icon && color ? <Icon color={color} iconSrc={icon} alt='' aria-hidden='true' /> : null }
			<div className='flex relative w-5/6'>
			<label htmlFor={id} className='w-0 invisible'>{id}</label>
			<input
				id={id}
				name={id}
				onChange={e => onChange(e)}
				onWheel={type === 'number' ? preventNumberWheel : undefined}
				value={value}
				placeholder={placeholder ?? `${id}: 0`}
				className={`border-black rounded-full py-1 pl-4 border-4 capitalize w-full ${width === 'full' ? 'pr-14' :''}`}
				type={type}
				maxLength={25}
			/>
			{ suffix && <span className='absolute right-6 top-3 text-gray-500'>{suffix ?? 'Kr'}</span> }
			</div>
		</div>
	)
}

export default Input