import React from 'react'
import { BsPlus } from 'react-icons/bs'

export const Button2 = ({ buttonName, type, color, onClick, textColor, disabled }) => {
  return (
    <button className={`w-[150px] h-[54px] flex items-center justify-center text-[18px] font-semibold capitalize ${textColor ?? 'text-white'} rounded-full ${color ? color : `${disabled ? 'bg-blue-300' : 'bg-color-primary'}`}`} type={type} onClick={onClick} disabled={disabled ?? false}>
      {buttonName}
    </button>
  )
}

function Button({ buttonName, color, isPrefixIcon, onClick }) {
  return (
    <button className={`${color ?? 'bg-color-primary'} text-white flex gap-2 text-lg font-semibold items-center px-4 py-3 rounded-full`} onClick={onClick}>
      {isPrefixIcon ? <BsPlus size={30} /> : null}
      <span className='capitalize'>{buttonName}</span>
    </button>
  )
}

export default Button
