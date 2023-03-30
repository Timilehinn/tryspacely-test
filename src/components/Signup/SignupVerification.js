import React from 'react'
import ReactCodeInput from 'react-code-input'
import { useTranslation } from 'react-i18next'
import Email from '../../assets/icons/Email.svg'

const SignupVerification = () => {
  const { t } = useTranslation()

  return (
    <main className='SignupVerification grid grid-cols-1 justify-center content-center h-screen align-middle justify-items-center text-center '>
      <div className='bg-[#CDDEFF] rounded-full p-2 '>
        <Email />
      </div>

      <h2 className='font-semibold text-2xl'> {t('Verify your email')} </h2>
      <p className='my-3'>
        {t('We sent a 4-digit code to')}
        <span className='font-semibold'> {t('mail@company.com')} </span> <br />
        {t("Please enter it below. Can't find it? Check your span folder")}
      </p>
      <section className='codeInput my-3'>
        <ReactCodeInput type='number' fields={4} />
      </section>

      <a href='#' className='underline font-semibold text-lg my-4'>
        {t('Click to resend code')}
      </a>
      <p>
        {t('Noticed a typo?')}
        <a href='#' className='text-[#0559FD]'>
          {t('Fix your email address')}
        </a>
      </p>
    </main>
  )
}

export default SignupVerification
