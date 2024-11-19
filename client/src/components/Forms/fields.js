// src/formFields.js
import * as yup from 'yup';
import { CHECKBOX, INPUT, SELECT } from '../inputs';
import { educationOptions } from '../../UiHelpers/educationUIHelper';
export const formFields  = () => [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    component: INPUT,
    validation: yup.string().required("First Name is required"),
    size:4
  },
  {
    name: "lastName",
    label: "Last Name",
    component: INPUT,
    validation:yup.mixed().when('firstName', {
      is: (value) => value === 'walid',
      then: () => yup.string().required('Last Name is required'),
      otherwise: ()=> yup.string()
    }),
    hideOn: "firstName",
    condition: "walid",
    size:4
  },
  {
    name: "gender",
    label: "Gender",
    component: CHECKBOX,
    options:[
        {
            label: "Male",
            value: "Male"
        },
        {
            label: "Female",
            value: "Female"
        }
    ],
    validation: yup.string().required("Gender is required"),
    size:4,
    isMulti:false
  },
  {
    name: "education",
    label: "Education",
    component: SELECT,
    options:educationOptions,
    validation: yup.string().required("Education is required"),
    size:4,
    // isMulti:true
  },
  {
    name: "email",
    label: "Email",
    component: INPUT,
    validation: yup.string().email("Invalid email").required("Email is required"),
    size:4
  },
  // Add more fields as needed
];