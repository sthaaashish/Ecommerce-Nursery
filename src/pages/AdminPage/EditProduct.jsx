import React from 'react'
import { useParams } from 'react-router'
import Loading from '../../Components/Loading';
import { useGetProductsByIdQuery } from '../../features/ProductApi';
import EditForm from './EditForm';

const EditProduct = () => {
    const {id}=useParams();
    const {data,isLoading}=useGetProductsByIdQuery(id)
    if(isLoading){
      return<Loading/>
    }
  return (
    <div>
        {data && <EditForm data={data}/>}
      
    </div>
  )
}

export default EditProduct
