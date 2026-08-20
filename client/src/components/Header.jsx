import { useContext } from 'react'
import robot from '../assets/cute-robot.png'
import { AppContent } from '../context/AppContext'
const Header = () => {
  const {userData} = useContext(AppContent)
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img src={robot} alt="" className='w-36 h-36 rounded-full mb-6'/>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData?userData.name: "Developer"}!  <span className='w-8 aspect-square'>👋</span></h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
        <p className='mb-8 max-w-md'>A secure, full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js). Features JWT-based sessions, OTP-driven email verification, and a full forgot/reset password flow with custom-designed HTML email templates — with separate client and server codebases.</p>
        <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header
