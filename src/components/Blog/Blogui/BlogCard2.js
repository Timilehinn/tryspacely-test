import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import slice from 'lodash/slice'

const BlogCard2 = () => {
  const [topData, setTopData] = useState([])
  const moment = require('moment')
  const [isCompleted, setIsCompleted] = useState(false)
  const [index, setIndex] = useState(6)
  const finalData = slice(topData, 0, index)

  useEffect(() => {
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jakub-kozak`
    )
      .then((res) => res.json())
      .then((response) => {
        setTopData(response.items)
      })
      .catch((err) => {})
  }, [])

  //for pagination
  const loadMore = () => {
    setIndex(index + 5)
    if (index >= topData.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }

  return (
    <div>
      <div className='lg:px-16 text-[#D4D4D4] opacity-50'>
        <hr />
      </div>

      <div className='flex flex-col lg:px-14 md:px-10 sm:px-10 '>
        <p className='text-[#141115] lg:text-3xl md:text-3xl sm:text-2xl  '>
          All posts
        </p>

        <div
          className='lg:grid lg:grid-cols-3 lg:gap-5 lg:py-10 lg:space-x-4
        md:grid md:grid-cols-2 md:gap-4 md:space-x-4 md:py-10 sm:grid sm:grid-cols-1
        sm:py-10'
        >
          {finalData.map((article) => (
            <div className='' key={article.guid}>
              <div className='lg:py-5 md:py-5 sm:py-5'>
                <LazyLoadImage className='' src={article.thumbnail} alt='img' />
                <div className='lg:py-2 md:py-2 sm:py-2'>
                  <p className='text-[#5B585B] font-light'>
                    {moment(article.pubDate).format('MMMM dddd Do, YYYY')}
                  </p>
                  <div className='font-bold text-xl text-[#2C292C] py-4'>
                    <a href={article.link}>{article.title}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center items-center mx-auto'>
          {isCompleted ? (
            <button
              type='button'
              onClick={loadMore}
              className='text-[#0559FD] hover:text-white 
                hover:bg-[#ff00ff] bg-[#FCFCFC] px-4 py-4 rounded mb-5'
            >
              Load More
            </button>
          ) : (
            <button
              onClick={loadMore}
              type='button'
              className='text-[#0559FD] hover:text-white
                hover:bg-[#ff00ff] bg-[#FCFCFC] px-4 py-4 rounded mb-5'
            >
              Load More...
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default BlogCard2
