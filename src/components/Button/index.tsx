import React from 'react'
import clsx from 'clsx'
import './style.scss'

interface ButtonProps {
	text?: string
	color?:
		| 'blue'
	icon?: 
		| 'send'
		| 'backspace'
		| 'listAdd'
	className?: string
	onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({text, color, className, icon, onClick}) => {
	return (
		<button
			onClick={onClick}
			className={clsx('button', className, color ? color : 'defaultColor' )}
		>
			<div className="button-container">
				{icon && <span className={clsx(icon && `icon-${icon}`, text && 'icon')}></span>}
				{text && text}
			</div>
		</button>
	)
}
