import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 text-center bg-gradient-to-b from-cyan-100/70'>

      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto'>
        Empower your future with the <span className='text-blue-600'>
        AI Skill Development Tracker</span>
        <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' />
      </h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
        A strategic program powered by artificial intelligence to identify and develop the specific skills individuals need to achieve their career objectives.
      </p>

      <p className='md:hidden text-gray-500 max-w-sm mx-auto'>
        It uses data-driven insights to create personalized learning paths that are efficient and effective.
      </p>
      
      <SearchBar />

    </div>
  )
}

export default Hero
