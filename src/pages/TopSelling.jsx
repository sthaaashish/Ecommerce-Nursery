import React from 'react'
import CardSlider from '../Components/CardSlider'
import Loading from '../Components/Loading'
import { useGetAllProductsQuery } from '../features/ProductApi'

const TopSelling = () => {
  const {data,isLoading, }=useGetAllProductsQuery();
  
  if(isLoading){
    return <Loading/>
  }
 
  return (
    <>
  <h1 className='mt-14 text-center text-green-700 f text-3xl m-4'>Top Selling Plant</h1>
    <div className='px-8' >
     
        <CardSlider data={data} isLoading={isLoading}/>
     
    </div>
    </>
  )
}

export default TopSelling
