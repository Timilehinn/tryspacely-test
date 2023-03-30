import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import tw from 'tailwind-styled-components'
import { useTranslation } from 'react-i18next'

import {
  setSpaceModal,
  setWorkspaceDetails,
} from '../../../slices/workspaceSlice'

import Rating from './rating'
import { extractCityCountry, scrollToTop, truncate } from '../../../lib/factory'

import { useApproveSpace } from '../../../hooks'
import { EyeIcon } from '../../../assets/shared/Eye'
import { EditIcon } from '../../../assets/shared/Edit'
import { DeleteIcon } from '../../../assets/shared/Delete'
import { RemoteIcon } from '../../../assets/shared/RemoteIcon'

const WorkspaceExcerpt = ({ setDelete, data, layout, account_type }) => {
  const ref = useRef()

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { status, approveSpace } = useApproveSpace()

  const [contextMenu, setContextMenu] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (contextMenu && ref.current && !ref.current.contains(e.target)) {
        setContextMenu(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [contextMenu])

  return (
    <>
      {/**LIST DISPLAY*/}
      {layout ? (
        <main className='flex justify-between items-center lg:gap-5 md:gap-5 sm:gap-5 relative shadow-2fl '>
          <div className='xl:w-[25%] lg:w-[25%] md:w-[25%] sm:w-[50%] flex flex-row items-center gap-3'>
            <img
              className='xl:w-8 xl:h-[30px] lg:w-14 lg:h-12 m-2 mr-0 md:w-[50px] md:h-[40px]
              sm:w-[88px] sm:h-[50px] rounded '
              src={
                data.photos !== 0
                  ? data.photos[0]?.url
                  : 'https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
              }
              alt='Workspace'
              key={data.photos[0]?.id}
            />
            <div className=''>
              <div className='text-[#141115] text-xs my-1 font-medium text-left'>
                {truncate(data.name, 30)}
              </div>
              <div className='text-[#141115] text-[10px] my-1  text-left'>
                {truncate(data.address, 30)}
              </div>
            </div>
          </div>

          {/* <div className="xl:w-[5%] lg:w-[5%] md:w-[5%] lg:flex md:flex sm:hidden text-xs">
            <Rating rating={data.reviews} />
          </div> */}
          <div className='xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[30%] text-xs'>
            {format(new Date(data.created_at), 'dd MMM, yyyy')}
          </div>
          <div className='xl:w-[7%] lg:w-[7%] md:w-[7%] sm:w-[30%] text-xs'>
            {format(new Date(data.created_at), 'h:mm a')}
          </div>

          <div className=' xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:flex sm:hidden '>
            {data?.status?.toLowerCase() === 'approved' ? (
              <StatusButton
                $status={data?.status?.toLowerCase()}
                className='rounded-md lg:flex md:flex text-xs py-1 px-2 w-max'
              >
                <RemoteIcon name={'Approved'} />
                {data.status}
              </StatusButton>
            ) : (
              <div className='flex w-max '>
                <StatusButton
                  $status={data?.status?.toLowerCase()}
                  className='rounded-md lg:flex md:flex text-xs py-1 px-2 w-max'
                >
                  <RemoteIcon name={'Pending'} />
                  Pending
                </StatusButton>
                <ApproveButton
                  $status={status}
                  disabled={status === 'Approving'}
                  onClick={() => approveSpace(data.slug)}
                >
                  {status}
                </ApproveButton>
              </div>
            )}
          </div>

          <div className='xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:flex sm:hidden text-xs'>
            <span className='mr-3'>₦</span>
            {truncate(data.price.toLocaleString(), 15)}
          </div>

          <div className='xl:w-[3%] lg:w-[3%] md:w-[3%] sm:w-[3%] sm:mr-3 text-xs'>
            <button
              onClick={() => setContextMenu(data.id)}
              className='relative'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                id='Outline'
                viewBox='0 0 24 24'
                width='20'
                height='23'
              >
                <circle cx='2' cy='12' r='2' fill='#000000' />
                <circle cx='12' cy='12' r='2' fill='#000000' />
                <circle cx='22' cy='12' r='2' fill='#000000' />
              </svg>
              {contextMenu === data.id && (
                <div
                  ref={ref}
                  className='absolute w-[140px] h-[100px] flex flex-col justify-center
                          items-center mx-auto px-1 bg-white rounded-md shadow-2fl z-10 lg:top-5 lg:right-[-42px] sm:top-5 sm:right-4 text-xs'
                >
                  <button
                    onClick={() => {
                      dispatch(setSpaceModal(data.id))
                      dispatch(setWorkspaceDetails(data))
                      scrollToTop()
                    }}
                    className='hover:bg-[#EEEEEE] w-full h-[40px] flex justify-start items-center gap-2 px-2 rounded-md text-xs'
                  >
                    <EditIcon />
                    Edit
                  </button>

                  {account_type === 'Sales' ? (
                    <Link
                      className='hover:text-[#141115] hover:bg-[#EEEEEE] w-full h-[40px] flex justify-start items-center gap-2 px-2 rounded-md'
                      to={`/dashboard/space-details/${data.slug}`}
                      key={data.id}
                    >
                      <EyeIcon />
                      View details
                    </Link>
                  ) : (
                    <button
                      onClick={() => setDeleteModal(data.id)}
                      className='hover:bg-[#EEEEEE] w-full h-[40px] flex justify-start items-center gap-2 px-2 rounded-md text-xs'
                    >
                      <img
                        src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Delete.svg'
                        alt='delete'
                      />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </button>
          </div>

          {deleteModal === data.id && (
            <>
              <div className='overlay'></div>
              <article
                ref={ref}
                className='lg:h-[198px] lg:w-[400px] lg:left-[15rem] md:w-[400px] md:h-[198px] md:left-[10rem]
              sm:left-[10px] sm:w-[90%] sm:h-[190px]
              gap-1 mx-auto px-5 bg-white shadow-2fl rounded-md absolute z-10 flex flex-col justify-center  '
              >
                <div className=''>
                  <DeleteIcon />
                </div>

                <p className='font-semibold pt-2 text-xs'>
                  {' '}
                  {t('Delete this workspace?')}{' '}
                </p>
                <span className='text-xs'>
                  {' '}
                  {t('There is no trash bin. You cannot restore it')}{' '}
                </span>

                <div className='flex gap-5 ml-auto justify-end flex-end pt-6 '>
                  <button
                    onClick={() => setDeleteModal(false)}
                    className='w-[79px] h-[38px] bg-transparent border-2 rounded-md text-xs'
                  >
                    {' '}
                    Cancel{' '}
                  </button>

                  <button
                    onClick={() => setDelete(data.id)}
                    className='bg-[#DA3D2A] w-[79px] h-[38px] text-xs text-white rounded-md '
                  >
                    {' '}
                    Delete{' '}
                  </button>
                </div>
              </article>
            </>
          )}
        </main>
      ) : (
        // GRID DISPLAY
        <section className=' bg-[#FCFCFC] grid  grid-cols-1'>
          <div className='relative'>
            {data?.status?.toLowerCase() === 'approved' ? null : (
              <StatusButton className='absolute top-0 left-0  px-[8px] py-[2px] rounded-[0px] rounded-br-lg '>
                <RemoteIcon name={'Pending'} />
                Pending
              </StatusButton>
            )}
            <img
              className='w-full lg:h-[194px] md:h-[194px] sm:h-[150px] rounded-t-lg '
              src={
                data.photos !== 0
                  ? data.photos[0]?.url
                  : 'https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
              }
              alt=''
              key={data.photos[0]?.id}
            />

            <button
              onClick={() => setContextMenu(data.id)}
              className='absolute top-3 right-3 z-10 rotate-90 '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                id='Outline'
                viewBox='0 0 24 24'
                width='20'
                height='23'
              >
                <circle cx='2' cy='12' r='2' fill='white' />
                <circle cx='12' cy='12' r='2' fill='white' />
                <circle cx='22' cy='12' r='2' fill='white' />
              </svg>
            </button>
            {/* OPTION */}
            {contextMenu === data.id && (
              <div
                ref={ref}
                className='absolute w-[140px] h-[100px] flex flex-col justify-center
                items-center mx-auto px-1 bg-white rounded-md shadow-2fl z-10 top-5 right-8'
              >
                <button
                  onClick={() => {
                    dispatch(setWorkspaceDetails(data))
                    dispatch(setSpaceModal(data.id))
                    scrollToTop()
                  }}
                  className='hover:bg-[#EEEEEE] w-full h-[40px] flex justify-start items-center gap-2 px-2 rounded-md'
                >
                  <EditIcon />
                  Edit
                </button>

                {account_type === 'Sales' ? (
                  <Link
                    className='hover:text-[#141115] hover:bg-[#EEEEEE] w-full h-[40px] flex justify-start items-center gap-2 px-2 rounded-md'
                    to={`/dashboard/space-details/${data.slug}`}
                    key={data.id}
                  >
                    <EyeIcon />
                    View details
                  </Link>
                ) : (
                  <button
                    onClick={() => setDeleteModal(data.id)}
                    className='hover:bg-[#EEEEEE] w-full h-[40px] flex justify-start items-center gap-2 px-2 rounded-md'
                  >
                    <img
                      src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Delete.svg'
                      alt='delete'
                    />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
          <div className='flex flex-col p-2 w-full border-b-[0.4px] border-[#D4D4D4]'>
            <div className='flex justify-between w-full '>
              <div className='flex flex-col'>
                <span className='flex flex-row items-center gap-2'>
                  <p className='text-[#141115] font-normal'>
                    {' '}
                    {truncate(data.name, 10)}{' '}
                  </p>
                  <img
                    src='/https://trybookings-assets.s3.eu-west-2.amazonaws.com/icons8-star-16.png'
                    alt=''
                  />
                  <span className='text-[#F9DC5C] font-medium text-xs'>
                    {' '}
                    <Rating rating={data.reviews} />{' '}
                  </span>
                </span>
                <span className='text-[#AAAAAA] text-xs'> Workspace name </span>
              </div>
              {/* <div className=" xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:flex sm:hidden "> */}
              {data?.status?.toLowerCase() === 'approved' ? (
                <StatusButton $status={data?.status?.toLowerCase()}>
                  <RemoteIcon name={'Approved'} />
                  {data.status}
                </StatusButton>
              ) : (
                <div className='flex w-max'>
                  <ApproveButton
                    $status={status}
                    disabled={status === 'Approving'}
                    onClick={() => approveSpace(data.slug)}
                    // className="px-[4px] py-[2px]"
                  >
                    {status}
                  </ApproveButton>
                </div>
              )}
              {/* </div> */}
            </div>
          </div>

          <div className='flex justify-between w-full p-2 '>
            <div className='flex flex-col'>
              <span className='text-xs text-[#434144'>
                {' '}
                {format(new Date(data.created_at), 'dd MMM, yyyy')}
              </span>
              <span className='text-[#AAAAAA] text-xs'> Date </span>
            </div>

            <div className='w-[50%]  flex flex-col justify-end items-center'>
              <span className='flex flex-row items-start gap-1 text-xs text-[#5B585B'>
                <img src='/location2.png' alt='location' className='w-3 h-3' />
                {format(new Date(data.created_at), 'h:mm a')}
              </span>
              <span className='text-[#AAAAAA] text-xs'> Time </span>
            </div>
          </div>

          <div className='flex justify-between w-full p-2 '>
            <div className='flex flex-col'>
              <span className='text-xs text-[#434144'>
                ₦{truncate(data.price.toLocaleString(), 15)}
              </span>
              <span className='text-[#AAAAAA] text-xs'> Price </span>
            </div>

            <div className='w-[50%]  flex flex-col justify-end items-center'>
              <span className='flex flex-row items-start gap-1 text-xs text-[#5B585B'>
                <img src='/location2.png' alt='location' className='w-3 h-3' />
                {extractCityCountry(data.address)}
              </span>
              <span className='text-[#AAAAAA] text-xs'> Address </span>
            </div>
          </div>

          {deleteModal === data.id && (
            <>
              <div className='overlay'></div>
              <article
                ref={ref}
                className='lg:h-[198px] lg:w-[400px] lg:left-[15rem] md:w-[400px] md:h-[198px] md:left-[10rem]
              sm:left-[10px] sm:w-[90%] sm:h-[190px]
              gap-1 mx-auto px-5 bg-white shadow-2fl rounded-md absolute z-10 flex flex-col justify-center  '
              >
                <div className=''>
                  <DeleteIcon />
                </div>

                <p className='font-semibold pt-2'>
                  {' '}
                  {t('Delete this workspace?')}{' '}
                </p>
                <span>
                  {' '}
                  {t('There is no trash bin. You cannot restore it')}{' '}
                </span>

                <div className='flex gap-5 ml-auto justify-end flex-end pt-6 '>
                  <button
                    onClick={() => setDeleteModal(false)}
                    className='w-[79px] h-[38px] bg-transparent border-2 rounded-md'
                  >
                    {' '}
                    Cancel{' '}
                  </button>

                  <button
                    onClick={() => setDelete(data.id)}
                    className='bg-[#DA3D2A] w-[79px] h-[38px] text-white rounded-md '
                  >
                    {' '}
                    Delete{' '}
                  </button>
                </div>
              </article>
            </>
          )}
        </section>
      )}
    </>
  )
}

export default WorkspaceExcerpt

//STYLED COMPONENTS
const ApproveButton = tw.button`
px-3 py-1 text-xs bg-[#0559FD] text-[#fff] rounded-md ml-2
${({ $status }) => ($status === 'Approving' ? 'opacity-75' : 'opacity-100')}
${({ $status }) => $status === 'Approving' && 'read-only:bg-gray-100'}
${({ $status }) => $status === 'Approved' && 'read-only:bg-gray-100'}
`
const StatusButton = tw.div`
rounded-md lg:flex md:flex text-xs px-3 py-1 w-max items-center content-between
${({ $status }) => ($status === 'approved' ? 'bg-d6f6de' : 'bg-f8d8d4')}
${({ $status }) => ($status === 'approved' ? 'text-26a746' : 'text-ae3122')}
`
