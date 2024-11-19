// fields.js
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const SelectField = ({ size,label, name, placeholder, options, loadOptions,field,meta,form,isMulti=false }) => {
  const handleChange = (selectedOptions) => {
    if (isMulti){
     form.setFieldValue(name,selectedOptions.map(option=>option.value))
     form.setFieldTouched(name,true)
     return
    }
    form.setFieldValue(name,selectedOptions.value)
    form.setFieldTouched(name,true)
  }
  // Determine if we should use async loading or static options

  return  (
    <label className="block">
    <span className="font-bold">{label}</span>
    <Select
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      name={field}
      // {...field}
      styles={{
        control: (provided) => ({
          ...provided,
          minHeight: size === 'large' ? '50px' : '30px',
        }),
      }}
      isMulti={isMulti}
    />
    {meta.touched && meta.error && (
              <span className="text-red-500">{meta.error}</span>
            )}
  </label>

   
  );
  //  isAsync ? (
  //   <AsyncSelect
  //     cacheOptions
  //     loadOptions={loadOptions}
  //     onChange={handleChange}
  //     placeholder={placeholder}
  //     name={name}
  //     styles={{
  //       control: (provided) => ({
  //         ...provided,
  //         minHeight: size === 'large' ? '50px' : '30px',
  //       }),
  //     }}
  //     isMulti
  //   />
  // ) :
  
};

export default SelectField;