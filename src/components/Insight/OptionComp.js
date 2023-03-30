import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const OptionComp = ({
  id,
  slug,
  address,
  name,
  amenities,
  price,
  visits,
  photos,
  available_space,
}) => {
  const ref = useRef()
  const [toggleOption, setToggleOption] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (toggleOption && ref.current && !ref.current.contains(e.target)) {
        setToggleOption(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [toggleOption])

  return (
    <>
      <div className='relative w-[100%] my-5'>
        <div
          key={id}
          className='sm:w-[100%] md:w-[80%] md:max-h-[170px] box-border sm:max-h-[150px] flex justify-start items-start h-auto bg-[#fff] 
          rounded download overflow-hidden md:mt-[10px] sm:mt-[5px] lg:mt-0'
        >
          <div className='w-[40%] sm:h-[150px] md:h-[170px] flex justify-center items-center overflow-hidden'>
            <img
              className='w-[100%]'
              src={
                photos?.length < 1
                  ? 'https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
                  : photos?.length > 0 && photos[0]?.url
              }
              alt='workspace-image'
            />
          </div>

          <div className='md:p-[10px] sm:p-[5px] w-full'>
            <div className='flex justify-between items-center'>
              <div className='font-400 md:text-[18px] sm:text-[16px] text-[#141115]'>
                {name}
              </div>
              <svg
                onClick={() => setToggleOption(!toggleOption)}
                className='cursor-pointer'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                  stroke='#141115'
                  fill='#141115'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z'
                  stroke='#141115'
                  fill='#141115'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M12 6C12.5523 6 13 5.55229 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55229 11.4477 6 12 6Z'
                  stroke='#141115'
                  fill='#141115'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>

            <div className='font-400 text-[14px] text-[#5B585B]'>{address}</div>

            <div className='md:mt-[20px] sm:mt-[10px]'>
              <div className='flex flex-wrap md:space-x-3 sm:space-x-2 jusitfy-start items-center'>
                <div className='font-400 md:text-[14px] sm:text-[12px] text-[#5B585B]'>
                  {available_space} User
                </div>

                {/* <div className='font-400 md:text-[14px] sm:text-[12px] text-[#5B585B]'>
                  24/7 Light
                </div> */}
              </div>

              <div className='w-[90%] flex flex-wrap md:space-x-2 sm:space-x-1 jusitfy-start items-center sm:mt-[5px] md:mt-[10px]'>
                {amenities?.map((a) => (
                  <>
                    <div className='flex justify-start items-center space-x-1'>
                      <div className='rounded-full border-[#5B585B] border w-[3px] h-[3px]'></div>
                      <div className='font-400 md:text-[14px] sm:text-[12px] text-[#5B585B]'>
                        {a?.amenities_item?.name}
                      </div>
                    </div>
                  </>
                ))}
              </div>

              <div className='flex justify-between items-center sm:mt-[10px] md:mt-[20px]'>
                <div className='font-500 sm:text-[14px] md:text-[16px] text-[#141115]'>
                  &#8358; {price}
                  <span className='font-300 md:text-[14px] sm:text-[12px] text-[#141115]'>
                    /hour
                  </span>
                </div>

                <div className='font-500 md:text-[13px] sm:text-[10px] text-[#5B585B]'>
                  No of Visits:{visits}
                </div>
              </div>
            </div>
          </div>

          {toggleOption && (
            <div
              ref={ref}
              className='absolute w-[120px] sm:right-[0px] md:right-[18%] top-[20%]  z-10 flex flex-col md:p-[10px] sm:p-[5px] bg-[#FFFFFF] 
            space-y-4 download rounded '
            >
              <Link
                to={`/booking/${slug}`}
                className='flex items-center cursor-pointer space-x-2 hover:bg-gray-200 rounded-md p-2'
              >
                <svg
                  className='md:w-[24px] md:h-[24px] sm:w-[18px] sm:h-[18px]'
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

                <span className='font-[400] md:text-[14px] sm:text-[12px] text-[#141115]'>
                  Detail
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default OptionComp
