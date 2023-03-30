import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import './Addon.css'

const GridFormBookings = ({
  setScheduleToggle,
  setCancel,
  workspace,
  booking_date,
  setBookingId,
  id,
  status,
}) => {
  const { t } = useTranslation()
  const [dpMnu, setDpMnu] = useState(false)

  //changes function
  const changeHandler = () => {
    setScheduleToggle(true)
    setDpMnu(false)
    setBookingId(id)
  }

  const cancelHandler = () => {
    setCancel(true)
    setDpMnu(false)
    setBookingId(id)
  }

  return (
    <>
      <div className='w-[100%] h-[auto] flex flex-col bg-[#fcfcfc] p-[5px] rounded-[8px] rounded-tr-lg sm:download'>
        <div className='w-[100%] relative h-[200px] flex justify-center items-center overflow-hidden rounded-tl-lg rounded-tr-lg'>
          <img
            className='w-[100%]'
            src={
              !workspace || workspace?.photos?.length < 1
                ? 'https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
                : workspace?.photos[0]?.url
            }
            alt='workspace-image'
          />
          <div
            onClick={() => setDpMnu(!dpMnu)}
            className='absolute top-[3%] right-[5%] flex flex-col cursor-pointer text-[#FFFFFF] font-bold'
          >
            <img
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Hor-Dots.svg'
              alt='menu'
            />
          </div>
          {dpMnu && (
            <div className='absolute rounded right-[6%] top-[20%] z-10 flex flex-col p-[10px] bg-[#FFFFFF] space-y-2'>
              <Link to={`/user/bookings/bookingdetails/${workspace?.id}`}>
                <div className='flex items-center cursor-pointer space-x-3'>
                  <svg
                    className='md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px]'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 14C12.1978 14 12.3911 13.9414 12.5556 13.8315C12.72 13.7216 12.8482 13.5654 12.9239 13.3827C12.9996 13.2 13.0194 12.9989 12.9808 12.8049C12.9422 12.6109 12.847 12.4327 12.7071 12.2929C12.5673 12.153 12.3891 12.0578 12.1951 12.0192C12.0011 11.9806 11.8 12.0004 11.6173 12.0761C11.4346 12.1518 11.2784 12.28 11.1685 12.4444C11.0586 12.6089 11 12.8022 11 13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14ZM17 14C17.1978 14 17.3911 13.9414 17.5556 13.8315C17.72 13.7216 17.8482 13.5654 17.9239 13.3827C17.9996 13.2 18.0194 12.9989 17.9808 12.8049C17.9422 12.6109 17.847 12.4327 17.7071 12.2929C17.5673 12.153 17.3891 12.0578 17.1951 12.0192C17.0011 11.9806 16.8 12.0004 16.6173 12.0761C16.4346 12.1518 16.2784 12.28 16.1685 12.4444C16.0586 12.6089 16 12.8022 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM12 18C12.1978 18 12.3911 17.9414 12.5556 17.8315C12.72 17.7216 12.8482 17.5654 12.9239 17.3827C12.9996 17.2 13.0194 16.9989 12.9808 16.8049C12.9422 16.6109 12.847 16.4327 12.7071 16.2929C12.5673 16.153 12.3891 16.0578 12.1951 16.0192C12.0011 15.9806 11.8 16.0004 11.6173 16.0761C11.4346 16.1518 11.2784 16.28 11.1685 16.4444C11.0586 16.6089 11 16.8022 11 17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18ZM17 18C17.1978 18 17.3911 17.9414 17.5556 17.8315C17.72 17.7216 17.8482 17.5654 17.9239 17.3827C17.9996 17.2 18.0194 16.9989 17.9808 16.8049C17.9422 16.6109 17.847 16.4327 17.7071 16.2929C17.5673 16.153 17.3891 16.0578 17.1951 16.0192C17.0011 15.9806 16.8 16.0004 16.6173 16.0761C16.4346 16.1518 16.2784 16.28 16.1685 16.4444C16.0586 16.6089 16 16.8022 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM7 14C7.19778 14 7.39112 13.9414 7.55557 13.8315C7.72002 13.7216 7.84819 13.5654 7.92388 13.3827C7.99957 13.2 8.01937 12.9989 7.98079 12.8049C7.9422 12.6109 7.84696 12.4327 7.70711 12.2929C7.56725 12.153 7.38907 12.0578 7.19509 12.0192C7.00111 11.9806 6.80004 12.0004 6.61732 12.0761C6.43459 12.1518 6.27841 12.28 6.16853 12.4444C6.05865 12.6089 6 12.8022 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V10H20V19ZM20 8H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V8ZM7 18C7.19778 18 7.39112 17.9414 7.55557 17.8315C7.72002 17.7216 7.84819 17.5654 7.92388 17.3827C7.99957 17.2 8.01937 16.9989 7.98079 16.8049C7.9422 16.6109 7.84696 16.4327 7.70711 16.2929C7.56725 16.153 7.38907 16.0578 7.19509 16.0192C7.00111 15.9806 6.80004 16.0004 6.61732 16.0761C6.43459 16.1518 6.27841 16.28 6.16853 16.4444C6.05865 16.6089 6 16.8022 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z'
                      fill='#141115'
                    />
                  </svg>
                  <div className='font-[Plus Jakarta Display] font-[400] text-[14px] text-[#141115]'>
                    {t('Detail')}
                  </div>
                </div>
              </Link>
              {status === 'Pending' || status === 'Reschedule' ? (
                <div className='flex items-center cursor-pointer space-x-3'>
                  {/*<svg className='md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px]'>*/}
                  {/*    <use*/}
                  {/*        xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#calendar-svgrepo-com'*/}
                  {/*        className='calendar stroke-[#141115] fill-[#141115] w-[14] h-[14]'*/}
                  {/*    ></use>*/}
                  {/*</svg>*/}

                  <svg
                    className='md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px]'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_267_7707)'>
                      <path
                        d='M11.795 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V11'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M15 3V7'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M7 3V7'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M3 11H19'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M18 16.496V18L19 19'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_267_7707'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>

                  <div
                    onClick={changeHandler}
                    className='font-[Plus Jakarta Display] font-[400] text-[14px] text-[#141115]'
                  >
                    {t('Reschedule')}
                  </div>
                </div>
              ) : null}
              {status === 'Pending' || status === 'Reschedule' ? (
                <div className='flex items-center cursor-pointer space-x-3'>
                  {/*<svg width="14" height="14" viewBox="0 0 24 24" fill="#141115" stroke="#141115" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*    <path d="M18 6L6 18" stroke="#141115" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />*/}
                  {/*    <path d="M6 6L18 18" stroke="#141115" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />*/}
                  {/*</svg>*/}
                  <svg
                    className='md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px]'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_267_7706)'>
                      <path
                        d='M9 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V16M19.823 19.824C19.6645 20.1746 19.4082 20.4721 19.0848 20.6806C18.7615 20.8892 18.3848 21.0001 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7C3.99979 6.61532 4.11053 6.23874 4.31893 5.9154C4.52734 5.59206 4.82457 5.33568 5.175 5.177L19.823 19.824Z'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M16 3V7'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M8 3V4'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M15 11H20M4 11H11H4Z'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M11 15H12'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 15V18'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M3 3L21 21'
                        stroke='#141115'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_267_7706'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>

                  <div
                    onClick={cancelHandler}
                    className='font-[Plus Jakarta Display] font-[400] text-[14px] text-[#141115]'
                  >
                    {t('Cancel')}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div className='flex justify-between items-center mt-[5px] p-[5px]'>
          <div className='flex items-center'>
            <span className='font-400 font-[Plus Jakarta Display] text-[18px] text-[#141115]'>
              {workspace?.name}
            </span>
            <span className='flex items-center ml-[10px]'>
              <svg
                className='w-[14px] h-[14px]'
                width='10'
                height='10'
                viewBox='0 0 18 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.00012 13.313L4.37112 15.7467L5.25537 10.592L1.50537 6.9417L6.68037 6.1917L8.99487 1.50195L11.3094 6.1917L16.4844 6.9417L12.7344 10.592L13.6186 15.7467L9.00012 13.313Z'
                  fill='#F9DC5C'
                  stroke='#F9DC5C'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              <span className='ml-[10px] text-[#F9DC5C] font-500 font-[Plus Jakarta Display] text-[14px]'>
                4.5
              </span>
            </span>
          </div>
          {status === 'Pending' && (
            <div className=' flex items-center justify-between font-[Plus Jakarta Display] font-[400] text-[16px] text-[#2C292C] px-[4px] py-[8px] bg-[#F8D8D4] rounded'>
              {/*/!*<svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-dash-circle" fill="#AE3122" stroke="#AE3122" xmlns="http://www.w3.org/2000/svg">*!/*/}
              {/*/!*    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />*!/*/}
              {/*/!*    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />*!/*/}
              {/*/!*</svg>*!/*/}
              {/*<img className='' src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/Icons/Pending.svg" alt="pending-icon"/>*/}

              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z'
                  fill='#AE3122'
                />
                <path
                  d='M7 13.5C7.82843 13.5 8.5 12.8284 8.5 12C8.5 11.1716 7.82843 10.5 7 10.5C6.17157 10.5 5.5 11.1716 5.5 12C5.5 12.8284 6.17157 13.5 7 13.5Z'
                  fill='#AE3122'
                />
                <path
                  d='M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z'
                  fill='#AE3122'
                />
                <path
                  d='M17 13.5C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5C16.1716 10.5 15.5 11.1716 15.5 12C15.5 12.8284 16.1716 13.5 17 13.5Z'
                  fill='#AE3122'
                />
              </svg>
              <span>{status}</span>
            </div>
          )}
          {status === 'Reschedule' && (
            <div className=' flex items-center justify-between font-[Plus Jakarta Display] font-[400] text-[16px] text-[#F9DC5C] px-[4px] py-[8px] bg-[#FEF8DE] rounded'>
              <svg
                width='16px'
                height='16px'
                viewBox='0 0 16 16'
                class='bi bi-dash-circle'
                fill='none'
                stroke='#F9DC5C'
                xmlns='http://www.w3.org/2000/svg'
              >
                */}
                <path
                  fill-rule='evenodd'
                  d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'
                />
                <path
                  fill-rule='evenodd'
                  d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'
                />
              </svg>

              <span className='sm:text-[12px] md:text-[14px]'>{status}</span>
            </div>
          )}
          {status === 'Approved' && (
            <div className=' flex items-center justify-between font-[Plus Jakarta Display] font-[400] text-[16px] text-[#26A746] px-[4px] py-[8px] bg-[#D6F6DE] rounded'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='#26A746'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                  fill='#D6F6DE'
                  stroke='#26A746'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M9 12L11 14L15 10'
                  stroke='#26A746'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              <span>{status}</span>
            </div>
          )}
        </div>
        <div className='flex justify-between items-center mt-[5px] p-[5px] border-t'>
          <div className='flex flex-col'>
            <span className='font-[Plus Jakarta Display] font-[400] text-[16px] text-[#434144]'>
              {moment(booking_date).format('LL')}
            </span>
            <div className='font-[Plus Jakarta Display] font-[400] text-[13px] text-[#AAAAAA] mt-[5px]'>
              Date
            </div>
          </div>
          <div className='flex flex-col'>
            <span className='font-[Plus Jakarta Display] font-[400] text-[16px] text-[#434144]'>
              02:00pm-03:00pm
            </span>
            <div className='font-[Plus Jakarta Display] font-[400] text-[13px] text-[#AAAAAA] mt-[5px]'>
              {t('Time')}
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center mt-[5px] p-[5px]'>
          <div className='flex flex-col'>
            <span className='font-[Plus Jakarta Display] font-[400] text-[16px] text-[#434144]'>
              &#8358; {workspace ? workspace?.price : 800}
            </span>
            <div className='font-[Plus Jakarta Display] font-[400] text-[13px] text-[#AAAAAA] mt-[5px]'>
              {t('Price')}
            </div>
          </div>
          <div className='flex flex-col'>
            <span className='font-[Plus Jakarta Display] font-[400] text-[16px] text-[#434144] flex items-center justify-between space-x-3'>
              <svg
                className='sm:w-[15px] sm:h-[15px] md:w-[16px] md:h-[16px] mr-[10px]'
                width='16'
                height='16'
                fill='#434144'
                stroke='#434144'
                xmlns='http://www.w3.org/2000/svg'
                fill-rule='evenodd'
                clip-rule='evenodd'
              >
                <path d='M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602' />
              </svg>
              {workspace?.address.length > 15
                ? `${workspace?.address.slice(0, 10)}...`
                : workspace?.address}
            </span>
            <div className='font-[Plus Jakarta Display] font-[400] text-[13px] text-[#AAAAAA] mt-[5px]'>
              {t('Location')}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GridFormBookings
