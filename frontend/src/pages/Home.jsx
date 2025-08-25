import React from 'react'
import Hero from '../componentes/Hero'
import MostPicked from '../componentes/MostPicked'
import PopularRooms from '../componentes/PopularRooms'
import Testimonial from '../componentes/Testimonial'
import NewsLetter from '../componentes/NewsLetter'


const Home = () => {
  return (
    <div className='py-24'>
        <Hero/>
        <MostPicked/>
        <PopularRooms/>
        <Testimonial />
        <NewsLetter/>
    </div>
  )
}

export default Home 