import React from 'react'
import Header from '../homepage/ui/header'
import Footer from '../homepage/ui/footer'
import FooterLink from '../homepage/ui/footerlink'
import { Helmet } from 'react-helmet'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ContactPage = () => {
  return (
    <div className=''>
      <Helmet>
        <title>TrySpacely | Contact Support Team</title>
        <meta
          name='description'
          content='We connect remote workers to affordable and safe working environment'
        />
        <meta name='keywords' content='' />
      </Helmet>
      <Header />
      <div className=' text-center pt-12 text-2xl text-[#6c757d] font-bold'>
        Contact Support Team
      </div>
      <div className=''>
        <div className='main-div flex xl:flex-row lg:flex-row md:flex-row sm:flex-col py-10 relative mb-72'>
          <div className='w-full h-[400px] bg-[#2e475d] flex xl:px-[9.5rem] lg:px-10 md:px-5 sm:px-10  flex-col pt-40'>
            <h1 className='text-4xl text-[#fff] pb-4'>Get in touch</h1>
            <p className='text-xl italic font-light text-[#fff]'>
              Want to get in touch? We'd love to hear from you. Here's how you
              can reach us...
            </p>
          </div>
          <LazyLoadImage
            className='xl:w-[700px] lg:w-[700px] md:w-[400px] h-[400px] flex flex-end ml-auto'
            src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/deskcenter.jpg'
          />
        </div>

        <div className='flex gap-5 contact justify-center items-center xl:top-[550px] absolute lg:top-[540px] md:top-[560px]  sm:top-[930px]'>
          <div className='xl:w-[40%] lg:w-[46%] md:w-[47%] sm:w-[85%] h-[5%]  bg-white shadow-2fl flex flex-col justify-center items-center sm:px-2'>
            <LazyLoadImage
              className='w-14 py-6'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/phone-504.png'
            />
            <h1 className=' font-medium text-xl py-6'>Talk to Sales Team</h1>
            <p className='text-center text-[1rem] xl:mr-3.5rem lg:mx-10 text-[#2e475d] '>
              {' '}
              Are you interested in booking a space and don't know how...? Just
              pick up the phone to chat with a member of our sales team.
            </p>
            <span className='text-[#0b8484] hover:underline text-xl py-6 mb-3'>
              +23418880370
            </span>
          </div>

          <div className='xl:w-[40%] lg:w-[46%] md:w-[47%] sm:w-[85%] h-[55%]  bg-white shadow-2fl flex flex-col justify-center items-center sm:px-2'>
            <LazyLoadImage
              className=' w-14 py-6'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/message_icon.svg'
            />
            <h1 className=' font-medium text-xl py-6'>
              Contact Our Customer Centre
            </h1>
            <p className='text-center xl:mx-14 lg:mx-10  text-[1rem] text-[#2e475d] mb-5'>
              Incase you need a little help to book a space. Or a tryspacely
              support rep. Don’t worry… we’re here for you.
            </p>
            <button className='p-4 bg-[#0559fd]  py-3.5 text-[#fcfcfc] hover:text-[#fcfcfc] hover:bg-[#198754] mb-5 rounded'>
              {' '}
              <a href='javascript:void(Tawk_API.toggle())'> Contact Support </a>
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <FooterLink />
    </div>
  )
}
export default ContactPage
