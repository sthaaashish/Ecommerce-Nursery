import { List, ListItem } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { CircularPagination } from '../../Components/Pagination'
import ProductCard from '../../Components/ProductCard'
import { useGetProductsByCategoryQuery, useGetProductsByCollectionQuery } from '../../features/ProductApi'

const Accessories = () => {

  const {isLoading,data,error}=useGetProductsByCategoryQuery('accessories')
const nav=useNavigate();
const [accessoriesFilter, setAccessoriesFilter]=useState("All");
const {isLoading:accessories_isLoading, data:accessories_data}=useGetProductsByCollectionQuery(accessoriesFilter)

const listHandler=(e)=>{
  setAccessoriesFilter(e)
}
  console.log(data)
    
  return (
    <>
  
    <div className="flex flex-col md:flex-row gap-5 p-3">
    <div className="mb-4 md:mb-0 md:w-1/4">
      <List>
        <ListItem onClick={()=>listHandler("All")} >All</ListItem>
        <ListItem onClick={()=>listHandler("Pots")}>Pots</ListItem>
        <ListItem onClick={()=>listHandler("Fertilizers")} >Fertilizers</ListItem>
     
      </List>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {accessories_data && accessories_data?.map((product,index) => {
        return (
          <div key={product._id}>
            <ProductCard
              handleClick={() => nav(`/productDetail/${product._id}`)}
              data={product}
              index={index}
            />
          </div>
        );
      })}
       {accessoriesFilter ==="All" && data?.map((product,index) => {
        return (
          <div key={product._id}>
            <ProductCard
              handleClick={() => nav(`/productDetail/${product._id}`)}
              data={product}
              index={index}
            />
          </div>
        );
      })}
    </div>
  </div>
  <div className='p-6 flex justify-center'>

    <CircularPagination/>
  </div>
  </>
  )
}

export default Accessories
