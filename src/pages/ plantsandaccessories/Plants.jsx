import { List, ListItem } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";
import { CircularPagination } from "../../Components/Pagination";
import ProductCard from "../../Components/ProductCard";
import {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByCollectionQuery,
} from "../../features/ProductApi";

const Plants = () => {
  const { data, isLoading } = useGetProductsByCategoryQuery("plants");
  const nav = useNavigate();
  const [currentFilter, setCurrentFilter] = useState("All");
  const { data: collection_Data, isLoading:is_Loading } =
    useGetProductsByCollectionQuery(currentFilter);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  const currentData = data?.slice(firstIndex, lastIndex);
  const pages = Math.ceil(data?.length / cardsPerPage);

  const handleListItemClick = (filter) => {
    setCurrentFilter(filter);
  };

  if (isLoading || is_Loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 p-3">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <List>
            <ListItem onClick={() => handleListItemClick("All")}>All</ListItem>
            <ListItem onClick={() => handleListItemClick("Indoor Plants")}>
              Indoor Plants
            </ListItem>
            <ListItem onClick={() => handleListItemClick("Outdoor Plants")}>
              Outdoor Plants
            </ListItem>
            <ListItem onClick={() => handleListItemClick("Top Selling Plants")}>
              Top Selling plants
            </ListItem>
            <ListItem onClick={() => handleListItemClick("Flowering Plants")}>
              Flowering plants
            </ListItem>
          </List>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {collection_Data?.map((product, index) => (
            <div key={product._id}>
              <ProductCard
                handleClick={() => nav(`/productDetail/${product._id}`)}
                data={product}
                index={index}
              />
            </div>
          ))}
          {currentFilter === "All" &&
            currentData?.map((product, index) => (
              <div key={product._id}>
                <ProductCard
                  handleClick={() => nav(`/productDetail/${product._id}`)}
                  data={product}
                  index={index}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center p-6">
        <CircularPagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Plants;
