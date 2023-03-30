import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import FavourityOutline from '../../svgs/FavIcon.svg'
import FavourityActive from '../../svgs/FavourityActive.svg'
import WorkSpaceRating from '../rating'
import Naira from '../../assets/icons/Naira.svg'
import { Link } from 'react-router-dom'
import { FormatAmount } from '../../utils/formatAmount'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const EachCard = ({ user, item, isListView, isGridView }) => {
  const [isFavourity, setIsFavourity] = useState(false)

  const likeHandler = () => {
    setIsFavourity(!isFavourity)
  }

  const isWorkspaceFavourited = () => {
    const findLovedWorkspace = user?.workspace_favourites?.find(
      (space) => space?.id == item?.id && space?.pivot?.favourite
    )
    if (!findLovedWorkspace) {
      setIsFavourity(false)
      return
    }
    setIsFavourity(true)
    return true
  }

  useEffect(() => {
    user?.workspace_favourites?.length && isWorkspaceFavourited()
  }, [item, user])

  return (
    <>
      <Link to={`/booking/${item?.slug}`} key={item?.id}>
        <div
          className={clsx({
            ['card-wrapper rounded-lg p-2 group']: true,
            ['list-view sm:min-h-[475px] md:min-h-[220px] flex flex-col md:flex-row justify-between']:
              isListView,
            ['grid-view min-h-[465px]']: isGridView,
          })}
          key={item?.id}
        >
          <div
            className={clsx({
              ['flex w-full gap-4 group-hover:cursor-pointer']: true,
              ['justify-between flex-col md:flex-row']: isListView,
              ['flex-col']: isGridView,
            })}
          >
            <div className='relative'>
              {item?.photos?.length > 0 ? (
                <LazyLoadImage
                  src={item?.photos[0]?.url}
                  alt={item?.name}
                  className='w-[200px] h-[250px] '
                />
              ) : (
                <LazyLoadImage
                  height='100%'
                  width='400px'
                  src='https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
                  className='w-[200px] h-[250px] '
                />
              )}
              {item?.is_featured && (
                <span className='absolute text-[#FCFCFC] bg-[#ED254E] w-1/3 sm:w-[120px] md:w-[88px] h-6 text-center items-center rounded-r-xl top-2 left-0'>
                  Featured
                </span>
              )}
            </div>
            <div
              className={clsx({
                ['flex gap-4 py-4']: true,
                ['list-view--inner']: isListView,
                ['grid-view--inner']: isGridView,
              })}
            >
              <div className='list-view__left'>
                <div className='flex justify-between mb-6 items-center text-[#5B585B]'>
                  <div>
                    <p className='text-lg w-full font-bold'>{item?.name}</p>
                    <p className='text-xs font-normal  w-full'>
                      {item?.address}
                    </p>
                  </div>
                  {isFavourity ? (
                    <FavourityActive onClick={likeHandler} />
                  ) : (
                    <FavourityOutline onClick={likeHandler} />
                  )}
                </div>
                <div className='flex flex-wrap w-64'>
                  {item?.amenities?.map((facility) => (
                    <React.Fragment key={facility?.id}>
                      <div className='text-xs'>
                        {facility?.amenities_item?.name}
                      </div>
                      <span className='px-2 last-of-type:hidden'>*</span>
                    </React.Fragment>
                  ))}
                </div>
                <div className='flex justify-between items-center mt-7'>
                  <WorkSpaceRating rating={item?.reviews} />
                  <div className='flex text-base font-bold items-center'>
                    <Naira /> {FormatAmount(item?.price)}
                    <span className='text-sm font-light'>
                      {' '}
                      /{item?.type?.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default EachCard
