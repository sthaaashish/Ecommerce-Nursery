import React from "react";

const Buttons = ({ label, onClick, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <button
          disabled
          className="mt-6 relative py-2 flex justify-center"
          type="submit"
          fullWidth
        >
          <div className="h-7 w-7 border-2 rounded-full border-t-gray-900 animate-spin"></div>
        </button>
      ) : (
        <button
          type="submit"
          onClick={onClick}
          className="  text-white bg-gradient-to-r from-teal-700 via-teal-500 to-teal-600 hover:bg-gradient-to-br shadow-lg s font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default Buttons;





