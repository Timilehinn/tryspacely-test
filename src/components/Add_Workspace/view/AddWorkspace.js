import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'

import Add_Title from '../components/addTitle'
import Add_Description from '../components/description'
import Address from '../components/address'
import Mentorship from '../components/mentorship'
import AddUser from '../components/users'
import Amenities from '../components/amenities'
import UploadImage from '../components/uploadImage'
import Workspace_Price from '../components/price'
import Workspace_agreement from '../components/legal'
import Workspace_Review from '../components/review'
import useCookieHandler from '../../../hooks/useCookieHandler'
import Category from '../components/category'
import Duration from '../components/duration'
import { setErrors, setStatus } from '../../../slices/createWorkspaceSlice'
import TimePicker from '../components/timePicker'

const Add_Workspace = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useCookieHandler('user_token')
  const [currentStep, setCurrentStep] = useState(0)
  const [address, setAddress] = useState(null)
  const [workspaceData, setWorkspaceData] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    country: '',
    mentorship_available: 1,
    agreement: false,
    price: null,
    status: 'Pending',
    type: '',
    category: 1,
  })

  useEffect(() => {
    localStorage.setItem('workspace', JSON.stringify(workspaceData))
  }, [workspaceData])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('address'))
    if (items) {
      setAddress(items)
    }
  }, [])

  // Publish async function after reviewing workspace
  const publishWorkspace = async () => {
    const sendingPost = { ...workspaceData, address }

    if (token) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/workspaces`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sendingPost),
          }
        )
        const data = await res.json()

        if (data?.status === false) {
          dispatch(setErrors(data.errors))
          dispatch(setStatus(data.status))
          return
        }

        toast.success('Workspace created successfully')
        navigate('/dashboard/spaces')

        if (res.status === 500) {
          navigate('/500')
        } else if (res.status === 400) {
          navigate('/400')
        }
      } catch (error) {}
    } else {
      navigate('/login')
    }
  }

  // Previous and next function
  const nextStep = (newData, adv) => {
    setWorkspaceData((prev) => ({ ...prev, ...newData }))
    if (adv == 'skipNext') {
      setCurrentStep((prev) => prev + 2)
      return
    }
    if (currentStep === 9 && workspaceData?.type !== 'Hourly') {
      setCurrentStep((prev) => prev + 2)
      return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = (newData, adv) => {
    setWorkspaceData((prev) => ({ ...prev, ...newData }))
    if (adv == 'skipPrev') {
      setCurrentStep((prev) => prev - 2)
      return
    }
    if (currentStep === 11 && workspaceData?.type !== 'Hourly') {
      setCurrentStep((prev) => prev - 2)
      return
    }
    setCurrentStep((prev) => prev - 1)
  }

  // Create Workspace steps...
  const steps = [
    <Add_Title next={nextStep} prev={prevStep} data={workspaceData} />,
    <Add_Description next={nextStep} prev={prevStep} data={workspaceData} />,
    <Address next={nextStep} prev={prevStep} data={workspaceData} />,
    <Category next={nextStep} prev={prevStep} data={workspaceData} />,
    <Duration next={nextStep} prev={prevStep} data={workspaceData} />,
    <Mentorship next={nextStep} prev={prevStep} data={workspaceData} />,
    <AddUser next={nextStep} prev={prevStep} data={workspaceData} />,
    <Amenities next={nextStep} prev={prevStep} data={workspaceData} />,
    <UploadImage prev={prevStep} next={nextStep} data={workspaceData} />,
    <Workspace_Price next={nextStep} prev={prevStep} data={workspaceData} />,
    <TimePicker next={nextStep} prev={prevStep} data={workspaceData} />,
    <Workspace_agreement
      prev={prevStep}
      next={nextStep}
      data={workspaceData}
    />,
    <Workspace_Review
      prev={prevStep}
      data={workspaceData}
      publish={publishWorkspace}
    />,
  ]

  return (
    <main className='xl:grid xl:grid-cols-2 xl:h-screen lg:grid lg:grid-cols-2'>
      <img
        src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/WorkspaceBg.png'
        alt='Background Image'
        className=' lg:block md:hidden sm:hidden'
      />

      <div className='lg:h-auto'> {steps[currentStep]} </div>
    </main>
  )
}

export default Add_Workspace
