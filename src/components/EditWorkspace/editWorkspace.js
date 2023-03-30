import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import DtPicker from 'react-calendar-datetime-picker'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

const Edit_Workspace = (props, values) => {
  const edit = useSelector((state) => state.edit)

  const [dropdownState, setDropdownState] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showEditSpace, setShowEditSpace] = useState(false)
  const [date, setDate] = useState(null)

  const [userData, setUserData] = useState(edit[0])

  const [title, setTitle] = useState(userData.title)
  const [rating, setRating] = useState(userData.rating)
  const [status, setStatus] = useState(userData.status)
  const [price, setPrice] = useState(userData.price)
  const [publish, setPublish] = useState(userData.published_date)
  const [location, setLocation] = useState(userData.location)
  const [address, setAddress] = useState(userData.address)
  const [city, setCity] = useState(userData.city)
  const [amount, setAmount] = useState(userData.price)
  const [description, setDescription] = useState(userData.description)
  const [editorState, setEditorState] = useState(userData.editorState)

  const onEditorStateChange = (editor) => {
    setEditorState(editor)
    const editorText = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    )
    setDescription(editorText)
  }

  const handleClick = () => {
    setDropdownState(!dropdownState)
  }

  return (
    <main className='lg:flex'>
      <section className='lg:w-[20%]'></section>

      <section className='lg:w-[80%] pt-20'>
        <article className='py-4 flex justify-between items-center px-10 w-[80%] mx-auto shadow-2fl rounded-md'>
          <h1> {title} </h1>
          <span> {rating} </span>
          <span> {status} </span>
          <span> {price} </span>
          <span> {publish} </span>
          <span> {location} </span>

          <div className='relative'>
            <button
              onClick={handleClick}
              className={`grid grid-cols-1 content-center items-center
                            border-0 bg-transparent text-3xl text-black fill-black`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                id='Outline'
                viewBox='0 0 24 24'
                width='20'
                height='23'
              >
                <circle cx='2' cy='12' r='2' fill='#000000' />
                <circle cx='12' cy='12' r='2' fill='#000000' />
                <circle cx='22' cy='12' r='2' fill='#000000' />
              </svg>
            </button>

            <div
              className={`dropdown-items ${
                dropdownState
                  ? 'isVisible visible absolute top-10 -left-24 flex flex-col justify-center items-center bg-white rounded-lg shadow-2fl h-[120px] w-[120px] py-4 '
                  : 'isHidden hidden'
              }`}
            >
              <button
                onClick={() => setShowEditSpace(true)}
                className='dropdown__link hover:bg-gray-300 w-full py-2
                                        flex gap-2'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 
                                            19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V15'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9 15H12L20.5 6.5C20.8978 6.10217 21.1213 5.56261 21.1213 5C21.1213 4.43739 20.8978 3.89782 20.5 3.5C20.1022 3.10217 19.5626 2.87868 
                                            19 2.87868C18.4374 2.87868 17.8978 3.10217 17.5 3.5L9 12V15Z'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M16 5L19 8'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Edit
              </button>

              <button className='dropdown__link hover:bg-gray-300 w-full py-2 flex gap-2'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8Z'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 
                                        4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Duplicate
              </button>

              <button className='dropdown__link hover:bg-gray-300 w-full py-2 flex gap-2'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 7H20'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M10 11V17'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M14 11V17'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 
                                        19L19 7'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7'
                    stroke='#141115'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </article>

        <div className='lg:w-[700px] relative ml-auto -mt-[145px] shadow-2fl '>
          {showEditSpace ? (
            <div className='p-10 bg-white lg:h-auto'>
              <div className='flex justify-between items-center'>
                <h1 className='text-1xl'> Edit Space </h1>
                <button
                  onClick={() => setShowEditSpace(false)}
                  className='text-[19px] border-0 bg-transparent'
                >
                  X
                </button>
              </div>
              <hr />

              <Formik
                initialValues={{
                  checked: [],
                  country: '',
                  hours: [],
                }}
              >
                {() => (
                  <Form className='py-4'>
                    <TextField
                      label='Title'
                      name='title'
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value)
                      }}
                    />

                    <TextField
                      label='Address'
                      name='address'
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value)
                      }}
                    />

                    <div className='grid grid-cols-2 gap-4'>
                      <TextField
                        label='City/State'
                        name='city'
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value)
                        }}
                      />

                      <div className='flex flex-col py-2'>
                        <label className='font-medium'> Country </label>
                        <Field
                          as='select'
                          name='country'
                          className=' border-2 border-[#D4D4D4]
                                                rounded w-full indent-3 h-[56px] p-0 outline-none
                                                shadow-none focus:border-[#0559FD] my-2'
                        >
                          <option value='Nigeria'> Nigeria </option>
                        </Field>
                      </div>

                      <div className='flex flex-col py-2'>
                        <label className='font-medium'> Mentorship </label>
                        <Field
                          as='select'
                          name='checked'
                          className=' border-2 border-[#D4D4D4]
                                                rounded w-full indent-3 h-[56px] p-0 outline-none
                                                shadow-none focus:border-[#0559FD] my-2'
                        >
                          <option value='Yes'> Yes </option>
                          <option value='No'> No </option>
                        </Field>
                      </div>

                      <div className='my-2'>
                        <label className='font-medium '> Hourly Price </label>
                        <div className='input_wrapper'>
                          <p className='absolute z-10 top-[475px] left-[23rem]'>
                            {' '}
                            NGN{' '}
                          </p>
                          <Field
                            type='number'
                            name='amount'
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value)
                            }}
                            className='border-2 border-[#D4D4D4]
                                                        rounded w-full indent-12 h-[56px] p-0 outline-none
                                                        shadow-none focus:border-[#0559FD] my-2 relative'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <label className='font-medium'> Description </label>
                      <Editor
                        toolbarClassName='toolbarClassName'
                        wrapperClassName='wrapperClassName'
                        editorClassName='editorClassName'
                        wrapperStyle={{
                          border: '2px solid #e5e7eb',
                          height: 'auto',
                          paddingLeft: '5px',
                        }}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        className='outline-0 border-[1px] w-full lg:h-[180px] border-[#D4D4D4] focus:border-[#2C292C]
                      rounded-lg md:h-[282px] sm:h-[180px] p-2'
                      />
                    </div>

                    <div className='lg:grid lg:grid-cols-2 gap-4 py-3'>
                      <div className='flex flex-col py-2'>
                        <label className='font-medium'> Bookings </label>
                        <DtPicker
                          onChange={setDate}
                          type='multi'
                          placeholder='Booking Availability'
                          className='lg:h-[56px]'
                        />
                      </div>

                      <div className='flex flex-col py-2'>
                        <label className='font-medium'> Hours </label>
                        <Field
                          as='select'
                          name='hours'
                          className=' border-2 border-[#D4D4D4]
                                                rounded w-full indent-3 h-[56px] p-0 outline-none
                                                shadow-none focus:border-[#0559FD] my-2'
                        >
                          <option value='1'> 1 </option>
                          <option value='2'> 2 </option>
                          <option value='3'> 3 </option>
                          <option value='4'> 4 </option>
                        </Field>
                      </div>
                    </div>

                    <br />
                    <hr />
                    <div className='upload'>
                      <div className='featured'></div>
                    </div>
                    <button
                      type='submit'
                      className='w-[98px] h-[52px] bg-[#0559FD] text-white rounded-md my-2 '
                    >
                      Update
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          ) : null}
        </div>

        <div className='flex flex-col justify-center items-center mx-auto'>
          {showModal ? (
            <div
              className='delete_modal absolute w-[436px] h-[198px] flex flex-col 
                    bg-[#faf9f9] rounded-md shadow-2fl p-10 top-[200px]'
            >
              <h1> Delete this workspace? </h1>
              <span> There is no trash bin. You cannot restort it </span>

              <div className='flex gap-4 ml-auto pt-10'>
                <button
                  onClick={() => setShowModal(false)}
                  className='bg-[#FCFCFC] w-[79px] h-[38px] rounded-md '
                >
                  Cancel
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className='bg-[#DA3D2A] w-[79px] h-[38px] rounded-md '
                >
                  Delete
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}

export default Edit_Workspace
