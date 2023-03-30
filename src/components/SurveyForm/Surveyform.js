import React, { useEffect } from 'react'
import { StylesManager, Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSurveyjson } from '../../slices/BookingSurvey'
import { toast } from 'react-toastify'

StylesManager.applyTheme('defaultV2')

import 'survey-core/defaultV2.min.css'

const SpaceSurvey = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tranxId } = useParams()
  const json = useSelector((state) => state.survey.surveyjson)
  const survey = new Model(json)
  survey.focusFirstQuestionAutomatic = false

  const updateSurvey = async (sender) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/review/${tranxId}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(sender.data),
        }
      )
      const data = await res.json()
      toast.success('Thanks for submitting your feedback about this space')
      setTimeout(() => {
        navigate('/')
      }, 5000)
      if (data?.status === false) {
        toast.error(
          'There was an error while trying to post your survey, please try again.'
        )
        return
      }
    } catch (error) {}
  }

  const fetchSurveyDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/review/${tranxId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      const data = await res.json()
      dispatch(setSurveyjson(data?.data[0]))
    } catch (error) {}
  }

  useEffect(() => {
    fetchSurveyDetails()
  }, [])

  survey.onComplete.add(updateSurvey)

  return <Survey model={survey} />
}

export default SpaceSurvey
