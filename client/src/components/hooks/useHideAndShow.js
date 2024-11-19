// src/hooks/useHideAndShow.js
import { useEffect, useState } from 'react';

const useHideAndShow = (values, fields) => {
  const [visibleFields, setVisibleFields] = useState({});

  useEffect(() => {
    const updatedVisibleFields = fields.reduce((acc, field) => {
      if (field.hideOn && field.condition) {
        acc[field.name] = values[field.hideOn] === field.condition;
      } else {
        acc[field.name] = true; // Show all fields that don't have hiding logic
      }
      return acc;
    }, {});

    setVisibleFields(updatedVisibleFields);
  }, [values, fields]);

  return visibleFields;
};

export default useHideAndShow;