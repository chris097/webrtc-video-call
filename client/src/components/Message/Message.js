import React from 'react';
import { BsSendFill } from "react-icons/bs";

const Message = ({value, handleChange, sendMessage, message}) => {
  return (
    <>
    <div className='w-96 h-[87%] fixed right-0 top-0 bg-[#262625] pt-24 text-gray-200/70 pb-8 overflow-y-auto overflow-x-hidden'>
              <div>
                  <div className='text-[rgb(179,102,249,.9)] text-lg px-6 pt-3'>Talent+ Bot</div>
        <p className='px-5 text-sm mt-2'>Welcome to the room, Don't be shy, say hello!</p>
        </div>
              {message?.map(message => (
              <div className={`${message?.yours === true ? 'bg-[#363739]' : 'bg-[#121212]'} flex flex-col w-auto p-2 mx-4 rounded-md text-sm mt-3`}>
                      <div className='font-bold'>{message?.yours === true ? "Sender" : "Receiver"}</div>
                  <p className='mt-2'>{message?.value}</p>
        </div>
        ))}
        {/* send message */}
      </div>
      <div className='w-96 fixed bottom-0 gap-3 h-[13%] flex justify-center items-center px-4 right-0 bg-black/30'>
              <input
                  value={value}
                  onChange={handleChange}
                  className='bg-gray-400/50 w-full h-16 rounded-md px-4 text-white outline-none'
                  type="text" placeholder="Send Message..." />
              <button className='bg-[rgb(179,102,249,.9)] w-14 h-10 items-center flex justify-center rounded-md p-2' onClick={sendMessage}>
                  <BsSendFill color='white' size={20} />
              </button>
      </div>
      </>
  )
}

export default Message;