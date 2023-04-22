import React from 'react'

const LiveStream = ({ userVideo, partnerVideo }) => {
    return (
        <div className='ml-16 xl:ml-64 text-white pt-28 w-[55.4%] flex justify-center mx-auto px-8'>
            <div className='flex justify-center w-full gap-6'>
                <div className='w-1/2'>
                     <video className='w-full h-72 border border-[#845695] object-cover' autoPlay ref={userVideo} />
                </div>
                <div className='w-1/2'>
                    <video className='w-full h-72 border border-[#845695] object-cover' autoPlay ref={partnerVideo} />
                </div>
            </div>
        </div>
    )
};

export default LiveStream;