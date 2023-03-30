import React, { useRef, useState } from 'react'
import CompanyLogo from '../../svgs/Logo.svg'
import FavOutline from '../../svgs/FavourityOutline.svg'
import CalendarIcon from '../../svgs/Calendar.svg'
import NotificationIcon from '../../svgs/Notification.svg'
import DropDownIcon from '../../svgs/DropDownIcon.svg'
import { Link } from 'react-router-dom'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const TopHeader = () => {
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef()

  const toggleDropdown = (type) => {
    if (type === 'mobile') {
      setOpen(true)
    }
  }

  const handleCloseMobile = () => setOpen(false)
  useOnClickOutside(dropdownRef, handleCloseMobile)

  return (
    <div>
      <div className='h-[72px] booking__wrapper w-full px-3 md:px-20 bg-white flex items-center justify-between'>
        <CompanyLogo />
        <div className='hidden md:flex items-center justify-between md:space-x-6'>
          <Link className='hover:text-slate-700' to='/'>
            Find Workspace
          </Link>
          {/*<Link className="hover:text-slate-700" to="/">List Workspace</Link>*/}
        </div>
        <div className='flex justify-between items-center space-x-3 h-10'>
          {[<FavOutline />, <CalendarIcon />].map((icon, index) => (
            <div
              key={index}
              className='flex h-8 w-8 items-center justify-center cursor-pointer rounded-full icon-holder'
            >
              {icon}
            </div>
          ))}
          <div className='flex h-8 w-8 relative items-center justify-center cursor-pointer rounded-full icon-holder'>
            <span className='absolute bg-red-700 h-2 w-2 rounded-full inset-y-0 right-0'></span>
            <NotificationIcon />
          </div>

          <img
            src='https://images.pexels.com/photos/10222192/pexels-photo-10222192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt=''
            className='object-center w-10 h-10 rounded-full object-cover mr-2'
          />
          <DropDownIcon
            className='cursor-pointer'
            onClick={(e) => toggleDropdown('mobile')}
          />
        </div>
      </div>
      {open && (
        <div className='flex items-center bg-slate-400 flex-col text-white text-lg py-3 justify-between w-full transition-all ease-in delay-200 md:hidden'>
          <Link className='hover:text-slate-700 py-3' to='/'>
            Find Workspace
          </Link>
          {/*<Link className="hover:text-slate-700" to="/">List Workspace</Link>*/}
        </div>
      )}
    </div>
  )
}

export default TopHeader
