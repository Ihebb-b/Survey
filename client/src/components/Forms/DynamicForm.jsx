// src/components/FormikDynamic.tsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import useHideAndShow from '../hooks/useHideAndShow';
import { sizeMapping } from '../../utils/sizeCols';

const DynamicForm = ({ formFields, initialValues: propInitialValues = {}, saveRef, onSubmit }) => {
  // Create initial values based on field definitions and props

  const initialValues = formFields.reduce((acc, field) => {
    acc[field.name] = propInitialValues[field.name] !== undefined
      ? propInitialValues[field.name] // Use prop value if provided
      : field.initialValue || ''; // Fallback to field's initialValue or empty string
    return acc;
  }, {});

  // Create validation schema dynamically from field definitions
  const validationSchema = yup.object().shape(
    formFields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      } else {
        console.warn(`Validation not defined for field: ${field.name}`);
      }
      return acc;
    }, {})
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => {
        const visibleFields = useHideAndShow(values, formFields);

        return (
          <Form className="flex flex-wrap"> {/* Adjust grid layout as needed */}
            {formFields.map(({ name, label, component: Component, options, ...props }) => {
              if (!visibleFields[name]) return null; // Skip hidden fields
              return (
                <div key={name} className={`w-full lg:${sizeMapping[props.size]} p-2`}>
                  <Field name={name}>
                    {({ field, meta,form }) => {

                      return <Component name={name} label={label} options={options} {...props} field={field} meta={meta} form={form}/>

                    }}
                  </Field>
                </div>
              );
            })}
            <button className="d-none" ref={saveRef} type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DynamicForm;