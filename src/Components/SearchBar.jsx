import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      const trimmedSearch= values.search.trim();
      nav(`/searchPage/${trimmedSearch}`)
      formik.resetForm();
    },
  });
  

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative mx-auto">
        <input
          value={formik.values.search}
          onChange={formik.handleChange}
          className="border-2 w-full border-gray-300 bg-white h-10 rounded-lg text-sm text-black pl-3 pr-10 focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
