import React from 'react'
import './style.scss'

interface InputProps {
  name?: string
  value?: string | number
  placeholder?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void 
  onKeyEnter?:() => void
}

const Input: React.FC<InputProps> = ({name, value, placeholder, onChange, onKeyEnter}) => {

  const handlerDownControlKey = (e: any) => {
		if (onKeyEnter) {
			if (e.key === 'Enter') onKeyEnter()
		}
	}

  return (
    <input
      name={name}
      value={value}
      className='input'
      onChange={onChange}
      placeholder={placeholder}
      onKeyUp={(e) => handlerDownControlKey(e)}
    />
  )
}

export default Input
