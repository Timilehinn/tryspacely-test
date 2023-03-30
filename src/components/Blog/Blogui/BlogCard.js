import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import parse from 'html-react-parser'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const BlogCard = () => {
  const { t } = useTranslation()
  const [mediumData, setMediumData] = useState([])
  const [topData, setTopData] = useState([])
  const moment = require('moment')

  useEffect(() => {
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jakub-kozak`
    )
      .then((res) => res.json())
      .then((response) => {
        setMediumData(response.items)
        setTopData(response.items)
      })
      .catch((err) => {})
  }, [])

  const finalData = topData.slice(0, 6)
  const lastData = mediumData.slice(0, 4)

  return (
    <div
      className='lg:flex lg:flex-row lg:space-x-10 lg:px-14 lg:py-10
      md:flex md:flex-col md:px-10 md:py-10 sm:flex sm:flex-col sm:px-10 sm:py-10'
    >
      <div
        className='bg-white drop-shadow-xl lg:w-[550px] lg:h-[600px]
        lg:px-10 lg:py-5 lg:space-y-4 md:w-full md:h-auto md:px-5 md:py-5
        md:space-y-2 sm:w-full sm:h-auto sm:px-5 sm:py-5 sm:space-y-2 rounded
        '
      >
        <h1 className='text-[#141115] text-base lg:px-0  pt-3'>
          {t('Top posts')}
        </h1>
        {finalData.map((article) => (
          <div className='' key={article.guid}>
            <div className='font-medium'>
              <ul>
                <li>
                  <a href={article.link}>{article.title}</a>
                </li>
              </ul>
              <p className='text-[#5B585B] text-sm'>
                {moment(article.pubDate).format('MMMM dddd Do, YYYY')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='lg:flex lg:flex-col lg:w-full lg:py-0 md:py-10 sm:py-10 '>
        <p className='text-[#141115] text-3xl'>{t('Recent Post')}</p>

        <div
          className='lg:grid lg:grid-cols-2 lg:space-x-4 lg:py-10
        lg:content-center lg:justify-center lg:gap-5 md:space-x-4 md:py-10
        md:grid md:grid-cols-2 md:content-center md:justify-center md:gap-4
        sm:py-10 sm:grid sm:grid-cols-1 sm:gap-4 '
        >
          {lastData.map((article) => (
            <div key={article.guid}>
              <div className=' '>
                <LazyLoadImage
                  className='xy shadow-2fl'
                  src={article.thumbnail}
                  alt='img'
                />

                <div
                  className='xyz lg:flex lg:flex-col lg:space-y-2 lg:py-4 md:flex
            md:flex-col md:space-y-2 md:py-4 sm:flex sm:flex-col sm:space-y-2 sm:py-4 '
                >
                  <small className='text-[#5B585B] font-light text-base'>
                    {moment(article.pubDate).format('MMMM dddd Do, YYYY')}
                  </small>

                  <div className='font-bold text-xl text-[#2C292C]'>
                    <a href={article.link}>{article.title}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogCard
