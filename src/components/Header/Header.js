import React from 'react'
import toast from 'react-hot-toast';


const Header = () => {

  const href = window.location.href;

  const copyText = () => {
    navigator.clipboard.writeText(href);
    toast.success("Link Copied!")
 }

  return (
    <>
      <div className='h-20 w-full fixed top-0 left-0 z-50 bg-[#1a1a1a] border-b border-gray-700 text-white'>
          <div className='flex justify-between w-full items-center px-10 h-full'>
              <div className='text-3xl font-medium'>Talent+</div> 
          <button onClick={copyText} className='bg-[#845695] text-white px-3 py-2 rounded-md'>Copy to invite a friend</button>
          </div>
      </div>
      </>
  )
}

export default Header;