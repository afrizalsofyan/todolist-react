import React from 'react'
import WarningIcon from '../assets/icons/icons-warning-triangle.png'
import { Button2 } from './Button'

function DeleteModal({ nameItem, onCancel, onDelete }) {
  return (
    <div className='w-full h-[1024px] bg-gray-800/50 absolute top-0 flex justify-center pt-20'>
      <div className='w-[490px] h-[355px] bg-white rounded-[12px] flex flex-col gap-10 justify-between items-center py-10'>
        <div className=''>
          <img src={WarningIcon} alt='warning-icn' />
        </div>
        <div className='flex flex-col text-center'>
          <span>Apakah anda yakin menghapus activity</span>
          <span className='font-bold'>{`"${nameItem}"`}</span>
        </div>
        <div className='flex gap-5'>
          <Button2 buttonName={'batal'} color='bg-color-white' textColor={'gray-color-text4'} type={'button'} onClick={onCancel} />
          <Button2 buttonName={'hapus'} color='bg-very-high' type={'button'} onClick={onDelete} />
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
