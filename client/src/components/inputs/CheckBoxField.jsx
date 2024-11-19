// src/components/CheckboxField.js
import React from 'react';

const CheckboxField = ({ options, field, meta,label }) => {
  return (
    <div className="block">
     <span className="font-bold">{label}</span>
      {options.map((option) => (
        <label key={option.value} className="flex items-center mb-2">
          <input
            type="checkbox"
            value={option.value}
            checked={field.value.includes(option.value)} // Check if the option is selected
            onChange={() => {
              const newValue = field.value.includes(option.value)
                ? field.value.filter((val) => val !== option.value) // Uncheck
                : [...field.value, option.value]; // Check
              field.onChange({ target: { name: field.name, value: newValue } }); // Update Formik state
            }}
            className="mr-2"
          />
          <span className="font-bold">{option.label}</span>
        </label>
      ))}
      {meta.touched && meta.error && (
        <span className="text-red-500">{meta.error}</span>
      )}
    </div>
  );
};

export default CheckboxField;