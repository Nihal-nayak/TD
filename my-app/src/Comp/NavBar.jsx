import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-around bg-violet-800 py-2 text-white'>
      <div className="logo mx-4">
        <span className='font-bold'>iTask</span>
      </div>
      <ul className='flex gap-8 mx-4'>
        <li className='cursor-pointer hover:font-bold'>Home</li>
        <li className='cursor-pointer hover:font-bold'>Your Task</li>
      </ul>
    </nav>
  )
}

export default NavBar
