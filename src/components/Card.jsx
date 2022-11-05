import React from 'react'
import { BsCheck } from 'react-icons/bs'
import { HiOutlineTrash } from 'react-icons/hi'
import { MdEdit } from 'react-icons/md'

export const Card = ({ activityName, createAt, onClick, onClickDelete }) => {
  return (
    <div className='card-activity'>
      <span className='font-bold text-lg cursor-pointer capitalize h-4/5' onClick={onClick}>{activityName}</span>
      <div className='flex justify-between items-center gray-color-text'>
        <span className='text-sm capitalize'>{createAt}</span>
        <HiOutlineTrash size={24} onClick={onClickDelete} className='cursor-pointer hover:text-black' />
      </div>
    </div>
  )
}

export const CardListItem = ({ onClickDelete, data, onChecklist, onEditItem }) => {
  return (
    <div className='w-full h-[80px] bg-white flex items-center justify-between px-7 rounded-xl shadow-card'>
      <div className="flex w-5/6 items-center">
        <div className={`${data?.is_active === 0 ? 'bg-color-primary' : 'bg-white'} w-5 h-5 border text-white mr-[22px] cursor-pointer`} onClick={onChecklist}>
          {data?.is_active === 0 ? <BsCheck size={18} /> : null}
        </div>
        <div className='flex gap-3 items-center'>
          <div className={`p-[0.32rem] rounded-full ${data?.priority === 'very-high' ? 'bg-very-high' : data?.priority === 'high' ? 'bg-high' : data?.priority === 'normal' ? 'bg-medium' : data?.priority === 'low' ? 'bg-low' : 'bg-very-low'}`} />
          <span className={`${data?.is_active === 0 ? 'gray-color-text' : ''} w-3/4 truncate`}>{data?.is_active === 0 ? <del>{data.title}</del> : `${data?.title}`}</span>
          <MdEdit className='gray-color-text2' size={24} onClick={onEditItem} />
        </div>
      </div>
      <HiOutlineTrash size={20} onClick={onClickDelete} className='cursor-pointer gray-color-text hover:text-black' />
    </div>
  )
}
