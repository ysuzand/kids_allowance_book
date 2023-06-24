const Icon = ({
	color,
	iconSrc,
	className = '',
	alt = ''
}: {
	color: string;
	iconSrc: string;
	className?: string;
	alt: string;
}) => {

	return (
		<div className={`${color} rounded-full w-12 h-12 flex items-center justify-center border-4 border-black ${className}`}>
			<img src={iconSrc} width='28' height='28' alt={alt}/>
		</div>
	)
}

export default Icon