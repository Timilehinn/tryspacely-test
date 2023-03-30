import React, { useState } from 'react'
import FilterIcon from '../../svgs/FilterIcon.svg'
import SearchField from '../../components/search'
import Spacer from '../../components/spacer'
import CAMCDatePicker from '../datepicker'
import { setCanFilter, setClearFilter } from '../../slices/filterOptions'
import { useDispatch } from 'react-redux'

const Filter = ({ toggleFilter }) => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useState('')

  const handleChange = (e) => {
    setSearchParams(e.target.value)
  }

  const handleClearFilter = () => {
    dispatch(setCanFilter(false))
    dispatch(setClearFilter(true))
  }

  return (
    <div className='w-full border-b'>
      <div className='items-center px-3 md:px-20 h-14 lg:hidden md:hidden sm:flex'>
        <div className='border-r h-14 w-56 mr-3 md:mr-6 hidden items-center md:hidden sm:flex '>
          <SearchField
            style={{ marginTop: -50 }}
            placeholder='Enter location, eg Lagos'
            onChange={handleChange}
            value={searchParams}
            name='searchWorkspace'
          />
        </div>

        <div className='lg:hidden md:hidden sm:flex sm:items-center'>
          <Spacer width={20} />
          <CAMCDatePicker fromFilter={true} />
        </div>

        <div
          onClick={toggleFilter}
          className='lg:hidden md:hidden sm:items-center sm:justify-center sm:flex h-10 md:ml-8 cursor-pointer w-20'
        >
          <FilterIcon />
        </div>

        <Spacer width={31} />
      </div>
    </div>
  )
}

export default Filter
