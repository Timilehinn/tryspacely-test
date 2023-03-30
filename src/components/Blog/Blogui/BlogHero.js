import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const BlogHero = () => {
  const moment = require('moment')
  const [mediumData, setMediumData] = useState([])

  useEffect(() => {
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jakub-kozak`
    )
      .then((res) => res.json())
      .then((response) => {
        setMediumData(response.items)
      })
      .catch((err) => {})
  }, [])

  const lastData = mediumData.slice(0, 1)

  return (
    <div
      className='page-wrapper grid lg:grid-cols-2 lg:space-x-10 lg:px-14 lg:py-10 lg:content-center lg:justify-center lg:m-auto lg:h-auto
    md:grid-cols-1 md:space-y-5 md:px-10 md:py-10 md:content-center md:justify-center sm:grid sm:grid-cols-1 sm:content-center sm:justify-center sm:px-10 sm:py-10 '
    >
      {lastData.map((article) => (
        <div key={article.guid}>
          <img
            className='lg:h-[360px] md:h-[300px] sm:h-[200px]'
            src={article.thumbnail}
            alt='img'
            style={{ width: '800px' }}
          />
        </div>
      ))}

      <div className='flex flex-col space-y-2'>
        {lastData.map((article) => (
          <div key={article.guid}>
            <small className='text-[#5B585B] font-light text-base'>
              {moment(article.pubDate).format('MMMM dddd Do, YYYY')}
            </small>
            <div className='font-bold text-4xl text-[#2C292C] hover:text-[black] py-2 '>
              <a href={article.link}>{article.title}</a>
            </div>
          </div>
        ))}

        <div className='flex flex-col justify-start items-start gap-2'>
          <span className='text-[#5B585B]'> Author: </span>
          {lastData.map((article) => (
            <div key={article.guid} className='flex gap-2 items-center '>
              <LazyLoadImage
                width={25}
                height={25}
                src={
                  article.avatar ||
                  'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                }
                alt={article.author}
              />
              <p className='text-[#5B585B]'>{article.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default BlogHero
