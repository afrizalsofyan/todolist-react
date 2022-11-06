import { Formik } from 'formik';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createTodo, updateTodo } from '../redux/action/todo';
import { Button2 } from './Button';
import * as Yup from 'yup'

const validationFormInput = Yup.object().shape({
  itemName: Yup.string().required()
})

function AddListItem({ onHideModal, itemData, onComplate, onHide }) {
  const params = useParams()
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [priority, setPriority] = React.useState(null)
  const [valTitle, setValTitle] = React.useState('')
  const priorityOption = [{ color: 'bg-very-high', optionName: 'very high' }, { color: 'bg-high', optionName: 'high' }, { color: 'bg-medium', optionName: 'normal' }, { color: 'bg-low', optionName: 'low' }, { color: 'bg-very-low', optionName: 'very low' }]
  const handleSubmit = (val) => {
    let data;
    if (itemData) {
      data = { id: itemData.id, is_active: itemData?.is_active, priority: priority?.optionName?.split(' ').join('-'), title: val.itemName }
      dispatch(updateTodo(data))
    } else {
      data = { activityGroupId: params?.idActivity, title: val.itemName, priority: priority?.optionName?.split(' ').join('-') }
      dispatch(createTodo(data))
    }
    onComplate()
  }
  return (
    <div data-cy="modal-add" className='w-full h-full fixed top-0 overflow-y-auto'>
      <div className='w-full h-full bg-gray-800/50 fixed top-0' onClick={onHide}></div>
      <div className='flex justify-center items-center'>
        <Formik initialValues={{ itemName: itemData ? itemData.title : '' }} onSubmit={handleSubmit} validationSchema={validationFormInput} >
          {({ handleChange, handleSubmit, values, isValid, errors }) => (
            <form className='w-[830px] h-[423px] bg-white shadow-card flex flex-col rounded-[12px] z-50' onSubmit={handleSubmit} onChange={handleChange}>
              <div className='flex justify-between border-b pb-3 px-[30px] pt-[30px]'>
                <span data-cy="modal-add-title" className='font-semibold text-lg'>Tambah List Item</span>
                <IoCloseOutline size={30} onClick={onHideModal} data-cy="modal-add-close-button" className='cursor-pointer' />
              </div>
              <div className='flex flex-col gap-7 px-[30px] py-[23px] border-b'>
                <div className='flex flex-col gap-2'>
                  <span data-cy="modal-add-name-title" className='text-sm font-semibold'>NAMA LIST ITEM</span>
                  <div data-cy="modal-add-name-input" >
                    <input type={'text'} name='itemName' placeholder='Tambahkan nama list item' className={`w-full h-[52px] flex items-center px-[18px] outline-none rounded-[6px] ${errors.itemName ? 'border-2 border-red-500' : 'border'}`} value={values.itemName} onChange={(e) => { handleChange('itemName'); setValTitle(e.target.value); }} />
                  </div>
                  {errors.itemName ? <span className='text-red-500 text-xs'>Field is required</span> : null}
                </div>
                <div className='flex flex-col gap-2'>
                  <span data-cy="modal-add-priority-title" className='text-sm font-semibold'>PRIORITY</span>
                  <div className='flex flex-col'>
                    <div className='w-[205px] flex gap-7 items-center justify-between border py-3 px-2 rounded-[6px] cursor-pointer' onClick={() => setShowDropdown(!showDropdown)}>
                      <div data-cy="modal-add-priority-item" className='flex gap-3 items-center'>
                        {itemData ? (
                          <>
                            <div className={`w-[14px] h-[14px] rounded-full ${priority?.color ? priority?.color : itemData?.priority === 'very-high' ? 'bg-very-high' : itemData?.priority === 'high' ? 'bg-high' : itemData?.priority === 'normal' ? 'bg-medium' : itemData?.priority === 'low' ? 'bg-low' : 'bg-very-low'}`} />
                            <span className='capitalize'>{priority?.optionName ? (priority?.optionName === 'normal' ? 'medium' : priority?.optionName) : itemData?.priority === 'normal' ? 'medium' : itemData?.priority.split('-').join(' ')}</span>
                          </>
                        ) : (
                          <>
                            <div className={`w-[14px] h-[14px] rounded-full ${priority?.color ?? priorityOption[0].color}`} />
                            <span className='capitalize'>{priority?.optionName === 'normal' ? 'medium' : priority?.optionName ?? priorityOption[0].optionName}</span>
                          </>
                        )}
                      </div>
                      <div data-cy="modal-add-priority-dropdown" >
                        <MdKeyboardArrowDown size={24} />
                      </div>
                    </div>
                    {showDropdown ? (
                      <div className='relative mt-2'>
                        <div className='flex flex-col bg-white w-[205px] absolute rounded-md border border-blue-400'>
                          {priorityOption.map((e, i) => {
                            return (
                              <div key={'option-name ' + i} className={`flex gap-7 items-center justify-between py-2 px-2 cursor-pointer ${e.optionName === priority?.optionName ? 'bg-color-primary text-white' : ''}`} onClick={() => { setPriority(e); setShowDropdown(!showDropdown); }}>
                                <div className='flex gap-3 items-center'>
                                  <div className={`w-[14px] h-[14px] rounded-full ${e.color}`} />
                                  <span className='capitalize'>{e.optionName === 'normal' ? 'medium' : e.optionName}</span>
                                </div>
                                {e.optionName === priority?.optionName ? <BiCheck size={18} /> : null}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-[15px] px-[30px]">
                <Button2 dataCy={'modal-add-save-button'} buttonName={'simpan'} type='submit' onClick={handleSubmit} disabled={!isValid || valTitle === ''} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddListItem;
