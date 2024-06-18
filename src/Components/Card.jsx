import React from 'react'

export const Card = ({text}) => {
  return (
    <div className="w-full shadow-2xl shadow-gray-800 bor mb-10 relative h-44 text-white ">
  <img src="/card.png" className="absolute top-0 bottom-0 left-0 opacity-80 w-full h-full right-0 z-0" alt="" />
  <div className='flex my-4'>
  <svg className="z-10 mx-5 " width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6839 3.52344C12.2601 3.52344 9.47656 6.30696 9.47656 9.73082C9.47656 13.0893 12.1033 15.8075 15.5271 15.9251C15.6317 15.9121 15.7362 15.9121 15.8146 15.9251C15.8408 15.9251 15.8538 15.9251 15.88 15.9251C15.893 15.9251 15.893 15.9251 15.9061 15.9251C19.2516 15.8075 21.8783 13.0893 21.8913 9.73082C21.8913 6.30696 19.1078 3.52344 15.6839 3.52344Z" fill="#A9DFD8"/>
<path d="M22.323 19.4148C18.677 16.9841 12.731 16.9841 9.05881 19.4148C7.39915 20.5125 6.48438 22.0154 6.48438 23.6228C6.48438 25.2301 7.39915 26.7199 9.04574 27.8176C10.8753 29.0461 13.2798 29.6603 15.6844 29.6603C18.0889 29.6603 20.4935 29.0461 22.323 27.8176C23.9696 26.7069 24.8844 25.2171 24.8844 23.5966C24.8713 22.0023 23.9696 20.4995 22.323 19.4148ZM18.7293 22.5512L15.4361 25.8444C15.2793 26.0012 15.0702 26.0796 14.8611 26.0796C14.652 26.0796 14.4429 25.9881 14.2861 25.8444L12.6395 24.1978C12.3259 23.8841 12.3259 23.3614 12.6395 23.0478C12.9531 22.7341 13.4759 22.7341 13.7895 23.0478L14.8611 24.1194L17.5793 21.4012C17.8929 21.0875 18.4156 21.0875 18.7293 21.4012C19.056 21.7148 19.056 22.2375 18.7293 22.5512Z" fill="#A9DFD8"/>
</svg>

  <h1 className="text-2xl  relative z-10">{text}</h1>
  </div>
  <p className=' text-2xl text-center'>1354</p>
</div>
  )
}