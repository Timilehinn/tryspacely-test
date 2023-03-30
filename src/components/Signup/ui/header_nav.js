import React from 'react';
import { useSelector } from 'react-redux';

const HeaderNav = () => {
  const signupStage = useSelector(state => state.signupFlow)

  return (
    <main className='py-10'>
      <div className="progress_step grid content-center justify-center mx-auto">
        <div className={signupStage === 1 ? 'progress-bar progress-bar-active' : 'progress-bar w-10 border-b-4 border-blue-500'}></div>
        <div className={signupStage === 2 ? 'progress-bar progress-bar-active' : 'progress-bar w-10 border-b-4 border-blue-500'}></div>
        <div className={signupStage === 3 ? 'progress-bar progress-bar-active' : 'progress-bar w-10 border-b-4 border-blue-500'}></div>
      </div>

    </main>
  )
}

export default HeaderNav
