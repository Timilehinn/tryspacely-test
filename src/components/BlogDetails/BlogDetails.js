import React from 'react'

import BlogDetailsHeader from './BlogDetailsUi/BlogDetailsHeader'
import BlogDetailsHero from './BlogDetailsUi/BlogDetailsHero'
import BlogDetailsPosts from './BlogDetailsUi/BlogDetailsPosts'
import BlogDetailsEx from './BlogDetailsUi/BlogDetailsEx'
import BlogDetailsFooter from './BlogDetailsUi/BlogDetailsFooter'

const BlogDetails = () => {
  return (
    <div>
      <BlogDetailsHeader />
      <BlogDetailsHero />
      <BlogDetailsPosts />
      <BlogDetailsEx />
      <BlogDetailsFooter />
    </div>
  )
}
export default BlogDetails
