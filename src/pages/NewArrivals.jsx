import React from "react";
import CardSlider from "../Components/CardSlider";
import Loading from "../Components/Loading";
import { useGetAllProductsQuery } from "../features/ProductApi";

const NewArrivals = ({title}) => {
  const { data, isLoading } = useGetAllProductsQuery();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  if (!data || !data.length) {
    return <div className="text-center">No data available.</div>;
  }
  const randomProducts = shuffleArray([...data]).slice(0, 10);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <h1 className="mt-14 text-center text-green-700 f text-3xl m-4">
        {title || "New Arrivals"}
      </h1>
      <div className="px-8">
        <CardSlider data={randomProducts} />
      </div>
    </>
  );
};

export default NewArrivals;
