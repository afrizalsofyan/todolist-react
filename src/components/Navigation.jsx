import React from 'react'
import { MdArrowBackIos, MdEdit } from 'react-icons/md'
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

function Navigation({ pageName, isGoBack, isEdit, onClickButton, isFilter, goBackTo, data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [valTitle, setValTitle] = React.useState(null)
  const [editField, setEditField] = React.useState(false)
  // const [idntityClick, setIndntityClick] = React.useState(0)
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
  React.useEffect(() => {
    setValTitle(data?.title)
  }, [data])
  console.log(data)
  return (
    <div className='grid grid-cols-2 w-full'>
      <div className='flex gap-3 items-center'>
        {isGoBack ? <MdArrowBackIos size={28} onClick={() => navigate(goBackTo)} className='cursor-pointer' /> : null}
        {editField ? <input className='capitalize text-4xl font-bold w-2/3 truncate bg-transparent focus:outline-none border-b-2 pb-2 border-black' title={pageName} value={valTitle} onChange={handleChange} /> : <span className='capitalize text-4xl font-bold max-w-[66%] truncate bg-transparent' title={isEdit ? valTitle : pageName}>{isEdit ? valTitle : pageName}</span>}
        {isEdit ? <MdEdit size={18} className='gray-color-text3 cursor-pointer' onClick={handleSave} /> : null}
      </div>
      <div className='flex justify-end gap-4'>
        {isFilter ? (
          <>
            <div className='p-3 rounded-full gray-color-text border cursor-pointer' onClick={() => setShowDropdown(!showDropdown)}>
              <BiSortAlt2 size={30} />
            </div>
            <div className='relative'>
              {showDropdown ? (
                <>
                  <div className='absolute flex flex-col bg-white top-20 -left-10 shadow-card rounded-[6px] z-10'>
                    {sortMenu.map((e, i) => {
                      return (
                        <div key={'key-sort' + i} className='h-[52px] w-[235px] flex items-center border-b px-[21px] gap-4 capitalize'><img src={e.img} alt={`${e.name}-icn-sort`} />{e.name}</div>
                      )
                    })}
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}
        <Button isPrefixIcon={true} buttonName='tambah' onClick={onClickButton} />
      </div>
    </div>
  )
}

export default Navigation
