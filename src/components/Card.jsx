import React from 'react'
import { BsCheck } from 'react-icons/bs'
import { HiOutlineTrash } from 'react-icons/hi'
import { MdEdit } from 'react-icons/md'

export const Card = ({ activityName, createAt, onClick, onClickDelete }) => {
  return (
    <div data-cy="activity-item" className='card-activity'>
      <span data-cy="activity-item-title" className='font-bold text-lg cursor-pointer capitalize h-4/5' onClick={onClick}>{activityName}</span>
      <div className='flex justify-between items-center gray-color-text'>
        <span data-cy="activity-item-date" className='text-sm capitalize'>{createAt}</span>
        <HiOutlineTrash size={24} onClick={onClickDelete} data-cy="activity-item-delete-button" className='cursor-pointer hover:text-black' />
      </div>
    </div>
  )
}

export const CardListItem = ({ onClickDelete, data, onChecklist, onEditItem }) => {
  return (
    <div data-cy="todo-item" className='w-full h-[80px] bg-white flex items-center justify-between px-7 rounded-xl shadow-card'>
      <div className="flex w-5/6 items-center">
        <div data-cy="todo-item-checkbox" className={`${data?.is_active === 0 ? 'bg-color-primary' : 'bg-white'} w-5 h-5 border text-white mr-[22px] cursor-pointer`} onClick={onChecklist}>
          {data?.is_active === 0 ? <BsCheck size={18} /> : null}
        </div>
        <div className='flex gap-3 items-center'>
          <div data-cy="todo-item-priority-indicator" className={`p-[0.32rem] rounded-full ${data?.priority === 'very-high' ? 'bg-very-high' : data?.priority === 'high' ? 'bg-high' : data?.priority === 'normal' ? 'bg-medium' : data?.priority === 'low' ? 'bg-low' : 'bg-very-low'}`} />
          <span data-cy="todo-item-title" className={`${data?.is_active === 0 ? 'gray-color-text' : ''} w-3/4 truncate`}>{data?.is_active === 0 ? <del>{data.title}</del> : `${data?.title}`}</span>
          <MdEdit data-cy="todo-item-edit-button" className='gray-color-text2 cursor-pointer' size={35} onClick={onEditItem} />
        </div>
      </div>
      <HiOutlineTrash size={20} onClick={onClickDelete} data-cy="todo-item-delete-button" className='cursor-pointer gray-color-text hover:text-black' />
    </div>
  )
}
