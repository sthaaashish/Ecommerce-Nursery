import React from 'react';
import { useNavigate, useParams } from 'react-router';
import Loading from '../Components/Loading';
import ProductCard from '../Components/ProductCard';
import { useGetProductsBySearchQuery } from '../features/ProductApi';

const SearchPage = () => {
  const { search } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = useGetProductsBySearchQuery(search);

  if (data?.length === 0) {
    return <h1 className='text-center text-black p-10'>No Products to Show</h1>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex gap-6 p-10'>
      {data?.map((product) => (
        <ProductCard key={product._id} data={product} handleClick={() => nav(`/productDetail/${product._id}`)} />
      ))}
    </div>
  );
};

export default SearchPage;
