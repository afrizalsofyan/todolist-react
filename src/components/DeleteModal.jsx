import React from 'react'
import WarningIcon from '../assets/icons/icons-warning-triangle.png'
import { Button2 } from './Button'
import IconWarning from '../assets/icons/icons-warning-circle.png'
function DeleteModal({ nameItem, onCancel, onDelete, successDelete, onContinue, type }) {
  return (
    <div>
      {!successDelete ? (
        <div data-cy="modal-delete" className='w-full h-full bg-gray-800/50 fixed top-0 overflow-y-auto'>
          <div data-cy={`${type === 'item' ? 'todo' : type}-modal-delete`} className='flex justify-center items-center py-10'>
            <div className='w-[490px] h-[355px] bg-white rounded-[12px] flex flex-col gap-10 justify-between items-center py-10'>
              <div className=''>
                <img data-cy="modal-delete-icon" src={WarningIcon} alt='warning-icn' />
              </div>
              <div data-cy="modal-delete-title" className='flex flex-col text-center'>
                <span>{`Apakah anda yakin menghapus ${type}`}</span>
                <span className='font-bold'>{`"${nameItem}"`}</span>
              </div>
              <div className='flex gap-5'>
                <div data-cy="modal-delete-cancel-button">
                  <Button2 buttonName={'batal'} color='bg-color-white' textColor={'gray-color-text4'} type={'button'} onClick={onCancel} />
                </div>
                <div data-cy="modal-delete-confirm-button">
                  <Button2 buttonName={'hapus'} color='bg-very-high' type={'button'} onClick={onDelete} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full bg-gray-800/50 fixed top-0 flex justify-center items-center overflow-y-auto' onClick={onContinue}>
          <div className='flex gap-4 w-1/3 p-4 bg-white rounded-xl'>
            <img src={IconWarning} alt='icn-success-warning' className='w-5 h-5' data-cy='modal-icnformation-cion' />
            <span data-cy="modal-information-title">Activity berhasil dihapus</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteModal
