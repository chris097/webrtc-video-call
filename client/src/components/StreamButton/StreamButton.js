import React from 'react'
import { BsFillCameraVideoFill, BsFillMicFill, BsFillTelephoneFill } from 'react-icons/bs'
// import {CgScreen} from 'react-icons/cg'

const StreamButton = ({toggleCamera, cameraRef, audioRef, toggleMic}) => {

    const iconStyle = 'bg-[rgb(179,102,249,.9)] cursor-pointer p-2 h-10 w-10 rounded-full flex justify-center items-center';
    const iconWidth = 'w-5 h-5';

  return (
     <div className='w-1/2 xl:bottom-6 bottom-10 fixed flex justify-end xl:-ml-0 -ml-28 gap-4 mx-auto'>
             <div onClick={toggleCamera} ref={cameraRef} className={`${iconStyle}`}>
                    <BsFillCameraVideoFill color='#fff' className={`${iconWidth}`} />
                </div>
                <div ref={audioRef} onClick={toggleMic} className={`${iconStyle}`}>
                    <BsFillMicFill color='#fff' className={`${iconWidth}`} />
                </div>
                {/* <div className={`${iconStyle}`}>
                    <CgScreen color='#fff' className={`${iconWidth}`} />
                </div> */}
                    <div className='bg-[rgb(255,80,80,1)] cursor-pointer p-2 h-10 w-10 rounded-full flex justify-center items-center'>
                    <BsFillTelephoneFill color='#fff' className={`${iconWidth}`}  />
                </div>
          </div>
  )
}

export default StreamButton;