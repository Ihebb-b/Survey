// FormView.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FormView = ({ title, children, isLoading }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // -1 means go back one page
  };

  const saveRef = useRef(null);
  const handleSubmit = () => {
    saveRef.current.click()
  }
  return (
    <div className="w-full mx-20 mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      {typeof children === 'function' ? children(saveRef) : children}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
        >
          Retour
        </button>
        <button

          onClick={handleSubmit}
          type="button"
          disabled={isLoading}

          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
        >
          {isLoading ? "Submitting..." : "Submit"}

        </button>

      </div>
    </div>
  );
};

export default FormView;