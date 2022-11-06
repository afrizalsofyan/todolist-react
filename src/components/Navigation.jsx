import React from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import { BiSortAlt2 } from 'react-icons/bi'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import NewerSort from '../assets/icons/newer-icon.png'
import OlderSort from '../assets/icons/older-icon.png'
import AtoZSort from '../assets/icons/a-z-sort.png'
import ZtoASort from '../assets/icons/z-a-sort.png'
import NotComplateSort from '../assets/icons/not-complate.png'
import { useDispatch } from 'react-redux'
import { updateActivity } from '../redux/action/activity'
import EditIcn from '../assets/icons/edit.svg'

function Navigation({ pageName, isGoBack, isEdit, onClickButton, isFilter, goBackTo, data, isLoading, onSelectSort, titleType, buttonFor }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [valTitle, setValTitle] = React.useState(null)
  const [editField, setEditField] = React.useState(false)
  const sortMenu = [{ img: NewerSort, name: 'terbaru' }, { img: OlderSort, name: 'terlama' }, { img: AtoZSort, name: 'a-z' }, { img: ZtoASort, name: 'z-a' }, { img: NotComplateSort, name: 'belum selesai' }]
  const handleChange = (e) => {
    setValTitle(e.target.value)
  }
  const handleSave = () => {
    if (editField === false) {
      setEditField(!editField)
    } else {
      dispatch(updateActivity({ id: data?.id, title: valTitle }))
      setEditField(!editField)
      pageName = valTitle
    }
  }
  const handleSort = (val, idx) => {
    onSelectSort && onSelectSort(val, idx)
  }
  React.useEffect(() => {
    setValTitle(data?.title)
  }, [data])
  return (
    <div className='flex flex-col items-center md:grid grid-cols-2 w-full gap-4 md:gap-0'>
      <div className='flex gap-3 items-center w-full justify-center md:justify-start'>
        {isGoBack ? <div data-cy="todo-back-button" onClick={() => navigate(goBackTo)} className='cursor-pointer'><MdArrowBackIos size={28} /></div> : null}
        {editField ? <input data-cy={`${titleType ?? 'activity'}-title`} className='capitalize text-3xl font-bold w-1/2 md:w-2/3 truncate bg-transparent focus:outline-none border-b-2 pb-2 border-black' title={pageName} value={valTitle} onChange={handleChange} /> : <span data-cy={`${titleType ?? 'activity'}-title`} className='capitalize text-3xl font-bold max-w-[50%] md:max-w-[66%] truncate bg-transparent' title={isEdit ? valTitle : pageName} onClick={handleSave}>{isEdit ? valTitle : pageName}</span>}
        {isEdit ? <div data-cy="todo-title-edit-button" className='cursor-pointer' onClick={handleSave} ><img src={EditIcn} alt='edit-icn' /></div> : null}
      </div>
      <div className='flex justify-end gap-4'>
        {isFilter ? (
          <>
            <button data-cy="todo-sort-button" className='p-3 rounded-full gray-color-text border cursor-pointer' onClick={() => setShowDropdown(!showDropdown)}>
              <BiSortAlt2 size={30} />
            </button>
            <div className='relative'>
              {showDropdown ? (
                <>
                  <div className='absolute flex flex-col bg-white top-20 -left-10 shadow-card rounded-[6px] z-10'>
                    {sortMenu.map((e, i) => {
                      return (
                        <div data-cy="sort-selection-selected" key={'key-sort' + i} className='h-[52px] w-[235px] flex items-center border-b px-[21px] gap-4 capitalize hover:bg-gray-100 cursor-pointer' onClick={() => handleSort(e, i)}><div data-cy="sort-selection-icon"><img src={e.img} alt={`${e.name}-icn-sort`} /></div><span data-cy="sort-selection-title">{e.name}</span></div>
                      )
                    })}
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}
        <Button isPrefixIcon={true} buttonName='tambah' onClick={onClickButton} isLoading={isLoading} buttonFor={buttonFor} />
      </div>
    </div>
  )
}

export default Navigation
