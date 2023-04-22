import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import { IoHandRightSharp } from 'react-icons/io5';

const CreateRoom = () => {

    const [text, setText] = useState("");

    const navigate = useNavigate()

    const create = () => {
        const id = uuid();
        navigate(`/room/${id}`)
    };

    return (
        <>
            <div className='flex justify-between h-20 border-b border-gray-100/20 items-center px-8'>
                <div className='text-white text-3xl italic font-semibold'>Talent+</div>
                <div>
                    <button className='bg-[#845695] text-white p-3 rounded font-medium' onClick={create}>Create Room</button>
                </div>
            </div>
            <div className='bg-[#1a1a1a] w-full mt-20 text-white flex justify-center items-center'>
                <form className='flex flex-col items-center bg-[#262625] h-auto w-1/2 rounded-md'>
                    <div className='h-24 items-center bg-[#363739] w-full flex justify-center font-medium text-2xl mb-6 gap-2 rounded-md'><IoHandRightSharp color='#F6BA6F' />Join a Room</div>
                    <div className='w-full flex justify-center flex-col items-center p-6 font-medium rounded-md'>
                        <div className='w-full'>
                            <input
                                placeholder='Enter your invite link'
                                onChange={e => setText(e.target.value)}
                                value={text}
                                type="text" className='w-full h-14 bg-[#363739] outline-none my-4 px-4 rounded-md' required />
                        </div>
                        <a href={text} className="bg-[#845695] text-center w-full p-4 rounded-md font-medium">
                            Join Room
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CreateRoom;