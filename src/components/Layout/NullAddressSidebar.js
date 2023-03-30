import React from 'react'

export const NullAddressSidebar = [
  {
    id: 'dashboard',
    title: 'Overview',
    path: '/dashboard',
    icon: (
      <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
        <use xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#home-svgrepo-com' className='home'></use>
      </svg>
    ),
  },
  {
    id: 'settings',
    title: 'Settings',
    path: '/settings',
    icon: (
      <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
        <use xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#settings-svgrepo-com'></use>
      </svg>
    ),
  },
]
