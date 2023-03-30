import React, { useState, useEffect, useLayoutEffect } from 'react'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import WorkspaceExcerpt from './workspaceExcerpt'
import { DashboardLoader } from '../../Loader/Loader'
import { useSelector } from 'react-redux'
import SelectElement from '../../Select'
import { RemoteIcon } from '../../../assets/shared/RemoteIcon'
import SimpleSearchInput from '../../SimpleSearchInput'

const BookingsSpaces = ({
  error,
  toggle,
  loading,
  success,
  setDelete,
  account_type,
  currentPagelist,
}) => {
  const { t } = useTranslation()
  const url = window.location.href
  const [sort, setSort] = useState('none')
  const [layout, setLayout] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const workspaceData = useSelector((state) => state.workspaces.workspace)
  const totalWorkspaces = useSelector((state) => state.workspaces.totalSpaces)

  const sortMethod = {
    none: { method: (a, b) => null },
    lowestToHighest: { method: (a, b) => (a.price > b.price ? 1 : -1) },
    highestToLowest: { method: (a, b) => (a.price > b.price ? -1 : 1) },
  }

  const content = workspaceData
    ?.filter((workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .sort(sortMethod[sort]?.method)
    .map((data) => {
      return (
        <WorkspaceExcerpt
          data={data}
          key={data.id}
          layout={layout}
          setDelete={setDelete}
          account_type={account_type}
        />
      )
    })

  const handleGridView = () => {
    let listBtn = document.getElementById('listView')
    let gridBtn = document.getElementById('gridView')
    listBtn?.addEventListener('click', function () {
      listBtn?.classList?.toggle('clicked-list')
      gridBtn?.classList?.remove('clicked-grid')
    })
  }
  const handleListView = () => {
    let gridBtn = document.getElementById('gridView')
    let listBtn = document.getElementById('listView')
    gridBtn?.addEventListener('click', function () {
      gridBtn?.classList?.toggle('clicked-grid')
      listBtn?.classList?.remove('clicked-list')
    })
  }

  useEffect(() => {
    handleGridView()
    handleListView()

    return () => {}
  }, [])

  useLayoutEffect(() => {
    let listBtn = document.getElementById('listView')
    listBtn?.classList?.toggle('clicked-list')
    return () => {}
  }, [])

  return (
    <main className=' workspaceContainer lg:w-full lg: lg:my-5 '>
      <>
        {!account_type === 'Sales' && (
          <div className='lg:hidden md:hidden sm:flex sm:flex-row sm:justify-start sm:items-center sm:gap-4 sm:p-5 '>
            <Link
              to={'/dashboard/spaces'}
              className={
                url.includes('/workspaces') ? 'text-[#0559FD]' : 'text-black'
              }
            >
              {' '}
              {t('All')}{' '}
            </Link>
            <Link
              to={'/dashboard/spaces/booked'}
              className={
                url.includes('/booked') ? 'text-[#0559FD]' : 'text-black'
              }
            >
              {' '}
              {t('Booked')}{' '}
            </Link>
            <Link
              to={'/dashboard/spaces/unbooked'}
              className={
                url.includes('/unbooked') ? 'text-[#0559FD]' : 'text-black'
              }
            >
              {' '}
              {t('Unbooked')}{' '}
            </Link>
          </div>
        )}

        <div className='bg-white shadow-2fl rounded-t-lg py-5 mt-4 mb-1 lg:px-2 lg:mx-5 md:px-4 sm:px-4 '>
          <div
            className='lg:flex lg:justify-between lg:items-center md:flex md:justify-between md:items-center sm:flex sm:justify-between
            sm:items-center '
          >
            <div className='flex justify-center items-center gap-2'>
              <span className='text-[#0559FD] text-[25px] font-small'>
                {account_type === 'Sales'
                  ? `${currentPagelist?.length} of ${totalWorkspaces}`
                  : totalWorkspaces}
              </span>
              <p className='text-[18px] font-small'>{t('Spaces')}</p>
            </div>

            {account_type !== 'Sales' && (
              <Link
                to='/addspace'
                className='flex justify-center items-center gap-2 lg:w-[120px] lg:h-[48px] md:w-[100px] md:h-[40px] sm:w-[100px] sm:h-[40px] rounded bg-[#0559FD] 
            text-white hover:text-white'
              >
                <img
                  className='w-4 fill-white'
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Add.svg'
                  alt='Add'
                />
                <p>Add New</p>
              </Link>
            )}
          </div>

          <div
            className=' flex lg:flex-row lg:justify-between lg:items-center md:flex-row md:justify-between md:items-center sm:flex-row 
          sm:justify-between sm:my-3 '
          >
            <div className='lg:flex lg:flex-row lg:gap-4 sm:gap-2 md:flex-row sm:flex-col'>
              {account_type === 'Sales' ? (
                <React.Fragment>
                  <SelectElement
                    t={t}
                    label={'Sort By Price:'}
                    selectedValue={(v) => setSort(v)}
                    options={[
                      { label: 'lowest price', value: 'lowestToHighest' },
                      { label: 'highest price', value: 'highestToLowest' },
                    ]}
                  />

                  <SimpleSearchInput
                    placeholder={'Search for a space'}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </React.Fragment>
              ) : (
                <SelectElement
                  t={t}
                  label={'Sort By Price:'}
                  selectedValue={(v) => setSort(v)}
                  options={[
                    { label: 'lowest price', value: 'lowestToHighest' },
                    { label: 'highest price', value: 'highestToLowest' },
                  ]}
                />
              )}
            </div>

            <div className='flex items-center py-2 lg:relative '>
              <div className='lg:flex lg:flex-row lg:items-center lg:gap-2 md:flex-row sm:flex-col '>
                <FilterButton toggle={toggle} />
                <DisplayStyleButton
                  icon={'List'}
                  view={'listView'}
                  onClick={() => setLayout(true)}
                />
                <DisplayStyleButton
                  icon={'Grid'}
                  view={'gridView'}
                  onClick={() => setLayout(false)}
                />
              </div>
            </div>
          </div>

          {layout && (
            <div className='flex justify-between items-center xl:gap-5 lg:gap-5 md:gap-5 sm:gap-5 w-full '>
              <p className=' xl:w-[25%] lg:w-[25%] md:w-[25%] sm:w-[50%] text-xs'>
                {' '}
                {t('Space Name')}
              </p>
              <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:flex sm:hidden text-xs'>
                {' '}
                {t('Date')}{' '}
              </p>
              <p className=' xl:w-[7%] lg:w-[7%] md:w-[7%] lg:flex md:flex sm:hidden text-xs'>
                {' '}
                {t('Time')}{' '}
              </p>
              <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:flex sm:hidden text-xs'>
                {' '}
                {t('Status')}{' '}
              </p>
              <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[30%] text-xs'>
                {' '}
                {t('Price')}{' '}
              </p>
              {/* <p className="xl:w-[25%] lg:w-[25%] md:w-[25%] lg:flex md:flex sm:hidden">
              {" "}
              {t("Location")}{" "}
            </p> */}
              <span className='xl:w-[3%] lg:w-[3%] md:w-[3%] sm:w-[3%] text-xs'></span>
            </div>
          )}
        </div>
        {loading ? (
          <div className='h-[100%]'>
            <DashboardLoader
              // failure={failure}
              isLoading={loading}
              // successful={spacesStatus}
              error={error}
              success={success}
              // loadingfinished={loadingfinished}
            />
          </div>
        ) : (
          <>
            {layout ? (
              <section className='rounded-bl-lg rounded-br-lg flex flex-col gap-2 lg:mx-5 md:mx-2 sm:mx-2'>
                {content}
              </section>
            ) : (
              <section className='rounded-bl-lg rounded-br-lg grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-1 px-4 content-between'>
                {content}
              </section>
            )}
          </>
        )}
      </>
    </main>
  )
}

export default BookingsSpaces

//COMPONENTS
const FilterButton = ({ toggle }) => (
  <div
    onClick={() => toggle()}
    className='flex items-center cursor-pointer hover:bg-[#dbdada73] rounded-lg py-1 px-2'
  >
    <RemoteIcon
      h={'h-8'}
      w={'w-8'}
      localStyles={'pr-0'}
      name={'Filter-Filled'}
    />
    Filter
  </div>
)

const DisplayStyleButton = ({ icon, view, onClick }) => (
  <button id={view} type='button' className='p-1' onClick={onClick}>
    <img
      alt={icon}
      className='h-6 w-6'
      src={`https://trybookings-assets.s3.eu-west-2.amazonaws.com/${icon}.svg`}
    />
  </button>
)
