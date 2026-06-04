import React from 'react'
import Navbar from './componet/Navbar'
import MoviesSlider from './componet/MovieSlider'
import Card from './componet/Card'
export default function App(){
  return(
    <div className ="bg-gray-900">
    <Navbar />
    <MoviesSlider />
    
    
     <Card />
    </div>
  )
}
