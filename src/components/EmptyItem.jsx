import React from 'react'

function EmptyItem({ img, onClick }) {
  return (
    <div className='w-[767px] h-[490px] flex items-center justify-center' onClick={onClick}>
      <img src={img} alt='empty-img' className='object-fill' />
    </div>
  )
}

export default EmptyItem