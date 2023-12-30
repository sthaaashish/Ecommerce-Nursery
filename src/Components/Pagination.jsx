import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ pages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(pages).keys()].map((i) => i + 1);
  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "teal",
    onClick: () => setCurrentPage(index),
    className: "rounded-full",
  });

  const next = () => {
    if (currentPage === pages) return;

    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full text-teal-700"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center md:gap-2">
        {pageNumbers.map((index) => (
          <IconButton key={index} {...getItemProps(index)}>
            <span className={currentPage === index ? "text-white" : ""}>
              {index}
            </span>
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 text-teal-700 rounded-full"
        onClick={next}
        disabled={currentPage === pages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
