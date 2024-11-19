// src/components/InputField.js
import React from 'react';
const InputField = (props) => {
  const { name, label, placeholder,field,meta  } = props;
  return (
    <label className="block">
      <span className="font-bold">{label}</span>
            <input
              type="text"
              placeholder={placeholder}
              {...field}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {meta.touched && meta.error && (
              <span className="text-red-500">{meta.error}</span>
            )}
    </label>
  );
};

export default InputField;