import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import RoomCard from './RoomCard';

const PopularRooms = () => {

    const { roomData } = useContext(AppContext);
    return (
        <div className='py-12 '>
            <h1 className='text-blue-800 text-3xl font-semibold text-center mx-auto'>Popular Rooms</h1>
            <p className='text-gray-500 text-sm text-center max-w-lg mx-auto'>
                Experience Luxury, Loved by Guests,Where Comfort Meets Excellence
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-7xl mx-auto mt-12'>
                {
                    roomData.map((room,index)=>(
                        <RoomCard key={room._id} room={room}/>
                    ))
                }
            </div>
        </div>
    )
}

export default PopularRooms