import React from 'react'

function EmptyItem({ img, onClick, emptyType }) {
  return (
    <div data-cy={`${emptyType ?? 'activity'}-empty-state`} className='w-[300px] md:w-[767px] h-[490px] flex items-center justify-center cursor-pointer' onClick={onClick}>
      <img src={img} alt='empty-img' className='object-fill' />
    </div>
  )
}

export default EmptyItem
