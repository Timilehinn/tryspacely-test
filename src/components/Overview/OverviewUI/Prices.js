import React from 'react'
import { useTranslation } from 'react-i18next'

const Prices = ({ dashboard, accountType }) => {
  const { t } = useTranslation()

  return (
    <>
      {accountType === 'User' && (
        <main
          className='mx-5 my-4 lg:px-10 lg:py-2 lg:divide-x-2 lg:flex lg:flex-row lg:justify-between lg:items-center 
        md:px-5 md:grid md:grid-cols-2 md:content-center md:gap-5 md:py-4 sm:grid sm:grid-cols-1 sm:gap-5 sm:py-4
        sm:px-3 shadow-2fl rounded-lg'
        >
          <div className='flex flex-col justify-start items-start gap-1 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Money.svg'
                alt='money'
                className='bg-[#E034E8] p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Expenses')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                <img
                  className=''
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Naira.svg'
                  alt='svg'
                />
                {dashboard?.total_expenses === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    ---{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_expenses}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspaces.svg'
                alt='workspaces'
                className='bg-[#26A746] p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Space Used')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_workspace_used === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_workspace_used}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings-icon.svg'
                alt='bookings'
                className='bg-[#011936] p-1 rounded-full flex justify-center items-center'
              />
              {/*<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
              {/*  <path d="M12 14C12.1978 14 12.3911 13.9414 12.5556 13.8315C12.72 13.7216 12.8482 13.5654 12.9239 13.3827C12.9996 13.2 13.0194 12.9989 12.9808 12.8049C12.9422 12.6109 12.847 12.4327 12.7071 12.2929C12.5673 12.153 12.3891 12.0578 12.1951 12.0192C12.0011 11.9806 11.8 12.0004 11.6173 12.0761C11.4346 12.1518 11.2784 12.28 11.1685 12.4444C11.0586 12.6089 11 12.8022 11 13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14ZM17 14C17.1978 14 17.3911 13.9414 17.5556 13.8315C17.72 13.7216 17.8482 13.5654 17.9239 13.3827C17.9996 13.2 18.0194 12.9989 17.9808 12.8049C17.9422 12.6109 17.847 12.4327 17.7071 12.2929C17.5673 12.153 17.3891 12.0578 17.1951 12.0192C17.0011 11.9806 16.8 12.0004 16.6173 12.0761C16.4346 12.1518 16.2784 12.28 16.1685 12.4444C16.0586 12.6089 16 12.8022 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM12 18C12.1978 18 12.3911 17.9414 12.5556 17.8315C12.72 17.7216 12.8482 17.5654 12.9239 17.3827C12.9996 17.2 13.0194 16.9989 12.9808 16.8049C12.9422 16.6109 12.847 16.4327 12.7071 16.2929C12.5673 16.153 12.3891 16.0578 12.1951 16.0192C12.0011 15.9806 11.8 16.0004 11.6173 16.0761C11.4346 16.1518 11.2784 16.28 11.1685 16.4444C11.0586 16.6089 11 16.8022 11 17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18ZM17 18C17.1978 18 17.3911 17.9414 17.5556 17.8315C17.72 17.7216 17.8482 17.5654 17.9239 17.3827C17.9996 17.2 18.0194 16.9989 17.9808 16.8049C17.9422 16.6109 17.847 16.4327 17.7071 16.2929C17.5673 16.153 17.3891 16.0578 17.1951 16.0192C17.0011 15.9806 16.8 16.0004 16.6173 16.0761C16.4346 16.1518 16.2784 16.28 16.1685 16.4444C16.0586 16.6089 16 16.8022 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM7 14C7.19778 14 7.39112 13.9414 7.55557 13.8315C7.72002 13.7216 7.84819 13.5654 7.92388 13.3827C7.99957 13.2 8.01937 12.9989 7.98079 12.8049C7.9422 12.6109 7.84696 12.4327 7.70711 12.2929C7.56725 12.153 7.38907 12.0578 7.19509 12.0192C7.00111 11.9806 6.80004 12.0004 6.61732 12.0761C6.43459 12.1518 6.27841 12.28 6.16853 12.4444C6.05865 12.6089 6 12.8022 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V10H20V19ZM20 8H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V8ZM7 18C7.19778 18 7.39112 17.9414 7.55557 17.8315C7.72002 17.7216 7.84819 17.5654 7.92388 17.3827C7.99957 17.2 8.01937 16.9989 7.98079 16.8049C7.9422 16.6109 7.84696 16.4327 7.70711 16.2929C7.56725 16.153 7.38907 16.0578 7.19509 16.0192C7.00111 15.9806 6.80004 16.0004 6.61732 16.0761C6.43459 16.1518 6.27841 16.28 6.16853 16.4444C6.05865 16.6089 6 16.8022 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z" fill="#FFFFFF"/>*/}
              {/*</svg>*/}

              {t('Total Bookings')}
            </p>

            <span className='flex flex-row justify-center items-center gap-2 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_bookings === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_bookings}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-1 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/love-icon.svg'
                alt='love'
                className='bg-[#ED254E] p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Reviews')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_reviews === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_reviews}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>
        </main>
      )}

      {accountType === 'Owner' && (
        <main
          className='mx-5 my-4 lg:px-10 lg:py-2 lg:divide-x-2 lg:flex lg:flex-row lg:justify-between lg:items-center 
        md:px-5 md:grid md:grid-cols-2 md:content-center md:gap-5 md:py-4 sm:grid sm:grid-cols-1 sm:gap-5 sm:py-4
        sm:px-3 shadow-2fl rounded-lg'
        >
          <div className='flex flex-col justify-start items-start gap-1 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Money.svg'
                alt='money'
                className='bg-[#E034E8] p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Revenue')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                <img
                  className=''
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Naira.svg'
                  alt='svg'
                />
                {dashboard?.total_expenses === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    ---{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_expenses}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/People-icon.svg'
                alt='workspaces'
                className='bg-[#26A746] p-1 rounded-full flex justify-center items-center 
              stroke-white'
              />
              {t('Total Space Users')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_workspace_used === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_workspace_used}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings-icon.svg'
                alt='bookings'
                className='bg-[#011936]  p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Bookings')}
            </p>

            <span className='flex flex-row justify-center items-center gap-2 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_bookings === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_bookings}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-1 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/love.svg'
                alt='love'
                className='bg-[#ED254E] p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Reviews')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_reviews === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_reviews}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>
        </main>
      )}

      {accountType === 'Admin' && (
        <main
          className='mx-5 my-4 lg:px-10 lg:py-2 lg:divide-x-2 lg:flex lg:flex-row lg:justify-between lg:items-center 
        md:px-5 md:grid md:grid-cols-2 md:content-center md:gap-5 md:py-4 sm:grid sm:grid-cols-1 sm:gap-5 sm:py-4
        sm:px-3 shadow-2fl rounded-lg'
        >
          <div className='flex flex-col justify-start items-start gap-1 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Money.svg'
                alt='money'
                className='bg-[#E034E8] p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Revenue')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                <img
                  className=''
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Naira.svg'
                  alt='svg'
                />
                {dashboard?.total_expenses === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    ---{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_expenses}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/People-icon.svg'
                alt='workspaces'
                className='bg-[#26A746] p-1 rounded-full flex justify-center items-center 
              stroke-white'
              />
              {t('Total Space Users')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_workspace_used === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_workspace_used}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings-icon.svg'
                alt='bookings'
                className='bg-[#011936]  p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Bookings')}
            </p>

            <span className='flex flex-row justify-center items-center gap-2 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_bookings === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_bookings}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-start items-start gap-1 lg:px-5'>
            <p className='flex flex-row justify-start items-center gap-2'>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/love.svg'
                alt='love'
                className='bg-[#ED254E] p-1 rounded-full flex justify-center items-center'
              />
              {t('Total Reviews')}
            </p>

            <span className='flex flex-row justify-center items-center gap-1 ml-5'>
              <span className='flex flex-row justify-center items-center gap-1'>
                {dashboard?.total_reviews === 0 ? (
                  <p className='font-bold text-[20px] flex flex-row justify-center items-center'>
                    {' '}
                    -{' '}
                  </p>
                ) : (
                  <p className='font-bold text-[20px]'>
                    {' '}
                    {dashboard?.total_reviews}{' '}
                  </p>
                )}
              </span>
            </span>
          </div>
        </main>
      )}
    </>
  )
}

export default Prices
