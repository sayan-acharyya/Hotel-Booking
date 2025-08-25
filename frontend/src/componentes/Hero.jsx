import React from 'react'
import { motion } from "motion/react"
import { assets, cities, homePageData } from '../assets/assets'
const Hero = () => {
    return (
        <>
            <main className='flex flex-col md:flex-row items-center max-md:text-center
    justify-between mt-16 pb-16 px-6 sm:px-10 md:px-24 max-7xl mx-auto w-full'>

                {/* first  div */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className='flex flex-col items-center md:items-start'
                >
                    <h1 className='text-blue-900 font-bold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight'>
                        Forget Busy Work, <br />  Start Next Vacation
                    </h1>
                    <p className='text-slate-400 mt-4 max-w-md text-sm sm:text-base leading-relaxed '>
                        We provide what you need to enjoy your holiday with family.
                        Time make anather memorable moments.
                    </p>
                    <div className='flex flex-col md:flex-row items-center mt-8 gap-3'>
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            transition={{ direction: 0.5, ease: 'easeInOut' }}
                            className='bg-indigo-600 py-2 px-6 text-white rounded-lg font-medium flex items-center cursor-pointer'>
                            Show More
                        </motion.button>
                    </div>
                    <div className='flex flex-wrap items-center gap-16  mt-8'>
                        {
                            homePageData.map((item, index) => (
                                <motion.div key={index}
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className='flex items-center flex-col '
                                >
                                    <img src={item.icon} alt="" className='w-6 h-6' />
                                    <div className='flex items-center gap-1 mt-4'>
                                        <p className='text-gray-700'>{item.value}</p>
                                        <p className='text-gray-700'>{item.title}</p>

                                    </div>
                                </motion.div>

                            ))
                        }
                    </div>
                </motion.div>

                {/* second div */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1], x: [-10, 10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <img src={assets.hero_img} alt="" />
                </motion.div>
            </main>

            <form className='  text-gray-500 rounded-lg px-6 py-4 mt-5  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto max-w-4xl mx-auto bg-[#EAF1FF]'>

                <div>
                    <div className=' flex   items-center gap-2'>
                         <img src={assets.calendar_icon} alt="" className='h-4 w-4'/>
                        <label htmlFor="destinationInput" className='font-bold'>Select Location</label>
                    </div>
                    <input
                        list='destinations'
                        id="destinationInput"
                        type="text"
                        className=" rounded-lg border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                        placeholder="Type here"
                        required />

                        <datalist id='destinations'>
                              {
                                cities.map((city,index)=>(
                                    <option key={index} value={city}/>

                                     
                                ))
                              }
                        </datalist>
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calendar_icon} alt="" className='h-4 w-4'/>
                        <label htmlFor="checkIn" className='font-bold'>Check in</label>
                    </div>
                    <input
                        id="checkIn"
                        type="date"
                        className=" rounded-lg border border-gray-200   px-3 py-1.5 mt-1.5 text-sm outline-none" />
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                       <img src={assets.calendar_icon} alt="" className='h-4 w-4'/>
                        <label htmlFor="checkOut" className='font-bold'>Check out</label>
                    </div>
                    <input
                        id="checkOut"
                        type="date"
                        className=" rounded-lg border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                </div>

                <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                    <label htmlFor="guests" className='font-bold'>Guests</label>
                    <input
                        min={1}
                        max={4} i
                        d="guests"
                        type="number"
                        className=" rounded-lg border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
                </div>

                <button className='mt-4 flex items-center justify-center gap-1 rounded-md bg-indigo-700 py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                    <span>Search</span>
                </button>
            </form>

        </>
    )
}

export default Hero