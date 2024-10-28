import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateSurveyMutation } from "../slices/surveyApiSlice";

const Survey = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    state: "",
    ville: "",
    country: "",
    height: "",
    weight: "",
    education: "",
    customEducation: "",
    occupation: "",
    customOcccupation: "",
    salary: "",
    currency: "",
    customCurrecny: "",
    socialState: "",
    children: "",
    childrenNumber: "",
    diet: "",
    customDiet: "",
    meat: [],
    customMeat: "",
    religiouslyObservant: "",
    fruits: [],
    customFruits: "",
    fruitUnitPerDay: "",
    vegetables: [],
    customVegetables: "",
    vegetableUnitPerDay: "",
    religious: "",
    customReligious: "",
    fish: [],
    customFish: "",
    dairy: [],
    customDairy: "",
    oil: [],
    customOil: "",
    homeMade: [],
    customHomeMade: "",
    homeMadeConsumption: "",
    homeMadeConsumptionBudget: "",
    ordered: [],
    customOrdered: "",
    orderedConsumption: "",
    orderedConsumptionBudget: "",
    traditionalEatingHabits: false,
    newEatingHabits: false,
    medicalHistory: "",
    customMedicalHistory: "",
    sportPractice: false,
    noSportPractice: false,
  });

  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const [createSurvey, { isLoading }] = useCreateSurveyMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "state") {
        updatedData.ville = "";
        updatedData.country = "";
      } else if (name === "ville") {
        updatedData.country = "";
      }

      if (name === "salary" && value === "Prefer not to say") {
        updatedData.currency = "";
        updatedData.customCurrency = "";
      }

      if (name === "currency" && value !== "Other") {
        updatedData.customCurrency = "";
      }

      if (name === "socialState" && value === "Prefer not to say") {
        updatedData.children = "";
        updatedData.childrenNumber = "";
      }

      if (name === "children" && value !== "Yes") {
        updatedData.childrenNumber = "";
      }

      return updatedData;
    });
  };
  const stateOptions = {
    Tunisia: ["Ariana", "Beja", "Gabes"],
    Lebanon: ["Akkar", "Mount_Lebanon", "Bekaa"],
  };

  const villeOptions = {
    Ariana: ["Rgueb", "Menzel_Bouzaine"],
    Beja: ["Kalaa_Kebira", "Hammam_Sousse"],
    Akkar: ["Beirut", "Beirut"],
  };

  const toggleSelection = (field, value) => {
    setFormData((prevData) => {
      const selectedValues = prevData[field];
      if (selectedValues.includes(value)) {
        // Unselect the value
        return {
          ...prevData,
          [field]: selectedValues.filter((item) => item !== value),
        };
      } else {
        // Select the value
        return {
          ...prevData,
          [field]: [...selectedValues, value],
        };
      }
    });
  };

  // const handleFoodFrequencyChange = (index, field, value) => {
  //   const updatedFoodFrequency = [...formData.foodConsumptionFrequency];
  //   updatedFoodFrequency[index][field] = value;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     foodConsumptionFrequency: updatedFoodFrequency,
  //   }));
  // };

  // const addFoodFrequency = () => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     foodConsumptionFrequency: [
  //       ...prevState.foodConsumptionFrequency,
  //       { dietDescription: "", period: "", unit: "", value: "" },
  //     ],
  //   }));
  // };

  // const removeFoodFrequency = (index) => {
  //   const updatedFrequencies = formData.foodConsumptionFrequency.filter(
  //     (_, idx) => idx !== index
  //   );
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     foodConsumptionFrequency: updatedFrequencies,
  //   }));
  // };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.education) newErrors.education = "Education is required.";
    if (!formData.ethnicity) newErrors.ethnicity = "Ethnicity is required.";
    if (!formData.diet) newErrors.diet = "Diet is required.";

    // if (!formData.household.length && !formData.readyToEatFood.length) {
    //   newErrors.foodPreference =
    //     "You must select at least one option from Household or Ready-to-Eat Food.";
    // }

    if (!formData.traditionalEatingHabits && !formData.newEatingHabits) {
      newErrors.eatingHabits =
        "You must select at least one option from Traditional or New Eating Habits.";
    }

    // formData.foodConsumptionFrequency.forEach((item, index) => {
    //   if (!item.dietDescription)
    //     newErrors[`dietDescription-${index}`] = `Diet is required.`;
    //   if (!item.period) newErrors[`period-${index}`] = `Period is required.`;
    //   if (!item.unit) newErrors[`unit-${index}`] = `Unit is required.`;
    //   if (!item.value) newErrors[`value-${index}`] = `Value is required.`;
    // });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const updatedFormData = {
  //     ...formData,
  //     household: formData.household.length > 0 ? formData.household : [],
  //     readyToEatFood:
  //       formData.readyToEatFood.length > 0 ? formData.readyToEatFood : [],
  //   };
  //   console.log("Form submitted", formData);

  //   if (!validateForm()) {
  //     setIsError(true);
  //     return;
  //   }

  //   try {
  //     const res = await createSurvey(formData).unwrap();

  //     console.log("Response: ", res);

  //     if (res) {
  //       toast.success("Survey submitted successfully!");
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 2000);
  //     }
  //   } catch (err) {
  //     console.error("Error caught: ", err);
  //     toast.error(err?.data?.message || err.error || "Submission failed.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setIsError(true);
      return;
    }
    try {
      const res = await createSurvey(formData).unwrap();
      toast.success("Survey submitted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Submission failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-300 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Survey Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <label className="block">
          <span className="font-bold">Name:</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </label>

        {/* Gender */}
        <label className="block">
          <span className="font-bold">Gender:</span>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">{errors.gender}</span>
          )}
        </label>

        {/* Age */}
        <label className="block">
          <span className="font-bold">Age:</span>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Between 1-10 years">Between 1-10 years</option>
            <option value="Between 10-18 years">Between 10-18 years</option>
            <option value="Between 19-25 years">Between 19-25 years</option>
            <option value="Between 26-29 years">Between 26-29 years</option>
            <option value="Between 30-39 years">Between 30-39 years</option>
            <option value="Between 40-49 years">Between 40-49 years</option>
            <option value="Between 50-59 years">Between 50-59 years</option>
            <option value="Between 60-69 years">Between 60-69 years</option>
            <option value="Over 70 years">Over 70 years</option>
          </select>
          {errors.age && <span className="text-red-500">{errors.age}</span>}
        </label>

        {/* State */}
        <label className="block">
          <span className="font-bold">State:</span>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select a State</option>
            {Object.keys(stateOptions).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <span className="text-red-500">{errors.state}</span>}
        </label>

        {/* Ville */}
        {formData.state && (
          <label className="block">
            <span className="font-bold">Ville:</span>
            <select
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select Ville</option>
              {stateOptions[formData.state]?.map((ville) => (
                <option key={ville} value={ville}>
                  {ville}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Country */}
        {formData.ville && (
          <label>
            Country:
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select a country</option>
              {villeOptions[formData.ville]?.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Height */}
        <label className="block">
          <span className="font-bold">Height:</span>
          <select
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Less than 160">Less than 160</option>
            <option value="Between 160-170">Between 160-170</option>
            <option value="Between 170-180">Between 170-180</option>
            <option value="Between 180-190">Between 180-190</option>
            <option value="Between 190-200">Between 190-200</option>
            <option value="Over 200">Over 200</option>
          </select>
          {errors.height && (
            <span className="text-red-500">{errors.height}</span>
          )}
        </label>

        {/* Weight */}
        <label className="block">
          <span className="font-bold">Weight:</span>
          <select
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="border border-gray-
          300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Less than 50">Less than 50</option>
            <option value="Between 50-60">Between 50-60</option>
            <option value="Between 60-70">Between 60-70</option>
            <option value="Between 70-80">Between 70-80</option>
            <option value="Between 80-90">Between 80-90</option>
            <option value="Between 90-100">Between 90-100</option>
            <option value="Between 100-110">Between 100-110</option>
            <option value="Over 110">Over 110</option>
          </select>
          {errors.weight && (
            <span className="text-red-500">{errors.weight}</span>
          )}
        </label>

        {/* Education */}
        <label className="block">
          <span className="font-bold">Education:</span>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="None">None</option>
            <option value="Primary education">Primary education</option>
            <option value="Secondary education">Secondary education</option>
            <option value="Higher education">Higher education</option>
            <option value="Engineerig degree">Engineerig degree</option>
            <option value="Masters degree">Masters degree</option>
            <option value="Doctorate degree">Doctorate degree</option>
            <option value="Technical education">Technical education</option>
            <option value="Other">Other</option>
          </select>
          {errors.education && (
            <span className="text-red-500">{errors.education}</span>
          )}
        </label>

        {/* Custom Education */}
        {formData.education === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom Education</span>
            <input
              type="text"
              name="customEducation"
              value={formData.customEducation}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Occupation */}
        <label className="block">
          <span className="font-bold">Occupation:</span>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Retired">Retired</option>
            <option value="Housewife">House Wife</option>
            <option value="Other">Other</option>
          </select>
          {errors.occupation && (
            <span className="text-red-500">{errors.occupation}</span>
          )}
        </label>

        {/* Custom Occupation */}
        {formData.occupation === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom Occupation</span>
            <input
              type="text"
              name="customOccupation"
              value={formData.customOcccupation}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Salary */}
        <label className="block">
          <span className="font-bold">Salary:</span>
          <select
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Less than 1000">Less than 1000</option>
            <option value="Between 1000-2000">Between 1000-2000</option>
            <option value="Between 2000-3000">Between 2000-3000</option>
            <option value="Between 3000-4000">Between 3000-4000</option>
            <option value="Between 4000-5000">Between 4000-5000</option>
            <option value="Over 5000">Over 5000</option>
          </select>
          {errors.salary && (
            <span className="text-red-500">{errors.salary}</span>
          )}
        </label>

        {/* Currency */}
        {formData.salary !== "Prefer not to say" && (
          <label>
            Currency:
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="TND">TND</option>
              <option value="EUR">EUR</option>
              <option value="EGP">EGP</option>
              <option value="CK">CK</option>
              <option value="CM">CM</option>
              <option value="TKL">TKL</option>
              <option value="LBD">LBD</option>
              <option value="MCD">MCD</option>
              <option value="LBP">LBP</option>
              <option value="PLP">PLP</option>
              <option value="SYP">SYP</option>
              <option value="ALL">ALL</option>
              <option value="Other">Other</option>
            </select>
          </label>
        )}
        {/* Custom Currency */}
        {formData.currency === "Other" && (
          <label>
            Custom Currency:
            <input
              type="text"
              name="customCurrency"
              value={formData.customCurrency}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Social State */}
        <label className="block">
          <span className="font-bold">Social State:</span>
          <select
            name="socialState"
            value={formData.socialState}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {errors.socialState && (
            <span className="text-red-500">{errors.socialState}</span>
          )}
        </label>

        {/* Children */}
        {formData.socialState !== "Prefer not to say" && (
          <label>
            Children:
            <select
              name="children"
              value={formData.children}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>  
            </select>
          </label>
        )}
        {/* Custom children */}
        {formData.children === "Yes" && (
          <label>
            Children Number:
            <select
              name="childrenNumber"
              value={formData.childrenNumber}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four">Four</option>
              <option value="Five">Five</option>
              <option value="More than five">More than five</option>
            </select>
          </label>
        )}

        {/* Diet */}
        <label className="block">
          <span className="font-bold">Diet:</span>
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Both">Both</option>
          </select>
          {errors.diet && <span className="text-red-500">{errors.diet}</span>}
        </label>

        <h3 className="text-lg font-semibold mt-4">
          Do you prefer Houseold foods or Ready to eat foods? or Both?
        </h3>

        {/* Household */}
        {/* <label className="block">
          <span className="font-bold mb-2 block">Household:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "Shakshouka",
              "Couscous",
              "Moroccan Tagine",
              "Musakhan",
              "Harira",
              "Horiatiki (Greek salad)",
              "Moussaka",
              "Spanakopita",
              "Melomakarono",
              "Manti",
              "Borek",
              "Kofte",
              "Risotto",
              "Timballo",
              "Polenta",
              "Baba Ghanoush",
              "Hummus",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center ${
                  formData.household.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => toggleSelection("household", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </label> */}

        {/* Ready-to-Eat Food */}
        {/* <label className="block mt-4">
          <span className="font-bold mb-2 block">Ready-to-Eat Food:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "160px" }}
          >
            {[
              "Pizza",
              "Burgers",
              "Sandwiches",
              "Wraps",
              "Paninis",
              "Mlewi",
              "Chappati",
              "Manakish",
              "Lahmacun",
              "Koshari",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center ${
                  formData.readyToEatFood.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => toggleSelection("readyToEatFood", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </label>
        {errors.foodPreference && (
          <span className="text-red-500">{errors.foodPreference}</span>
        )} */}

        {/* <h3 className="text-lg font-semibold mt-4">
          Food Consumption Frequency
        </h3>
        {formData.foodConsumptionFrequency.map((item, index) => (
          <div key={index} className="flex space-x-4 mb-4 items-end">
          
            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diet Description
              </label>
              <select
                name="dietDescription"
                value={item.dietDescription}
                onChange={(e) =>
                  handleFoodFrequencyChange(
                    index,
                    "dietDescription",
                    e.target.value
                  )
                }
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              >
                <option value="">Select...</option>
                <option value="Home_Made">Home Made</option>
                <option value="Ordered">Ordered</option>
              </select>
              {errors[`dietDescription-${index}`] && (
                <span className="text-red-500">
                  {errors[`dietDescription-${index}`]}
                </span>
              )}{" "}
            </div>

            
            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <select
                name="period"
                value={item.period}
                onChange={(e) =>
                  handleFoodFrequencyChange(index, "period", e.target.value)
                }
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              >
                <option value="">Select Period</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
              </select>
              {errors[`period-${index}`] && (
                <span className="text-red-500">
                  {errors[`period-${index}`]}
                </span>
              )}
            </div>

            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                name="unit"
                value={item.unit}
                onChange={(e) =>
                  handleFoodFrequencyChange(index, "unit", e.target.value)
                }
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              >
                <option value="">Select Unit</option>
                <option value="Gram">Gram</option>
                <option value="Litre">Litre</option>
                <option value="Number">Number</option>
              </select>
              {errors[`unit-${index}`] && (
                <span className="text-red-500">{errors[`unit-${index}`]}</span>
              )}
            </div>

            
            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value
              </label>
              <input
                type="number"
                name="value"
                value={item.value}
                onChange={(e) =>
                  handleFoodFrequencyChange(index, "value", e.target.value)
                }
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                placeholder="Value"
              />
              {errors[`value-${index}`] && (
                <span className="text-red-500">{errors[`value-${index}`]}</span>
              )}
            </div>

            
            <button
              type="button"
              onClick={() => removeFoodFrequency(index)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        
        <button
          type="button"
          onClick={addFoodFrequency}
          className="flex items-center text-blue-500 hover:text-blue-700 mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add More
        </button>  */}

        <h3 className="text-lg font-semibold mt-4">What do you prefer?</h3>
        {/* Traditional Eating Habits */}
        <label className="block">
          <input
            type="checkbox"
            name="traditionalEatingHabits"
            checked={formData.traditionalEatingHabits}
            onChange={handleChange}
            className="mr-2"
          />
          Traditional Eating Habits
        </label>

        {/* New Eating Habits */}
        <label className="block">
          <input
            type="checkbox"
            name="newEatingHabits"
            checked={formData.newEatingHabits}
            onChange={handleChange}
            className="mr-2"
          />
          New Eating Habits
        </label>

        {errors.eatingHabits && (
          <span className="text-red-500">{errors.eatingHabits}</span>
        )}

        {/* Medical History */}
        {/* <label className="block">
          <span className="font-bold">
            Do you have any of the followoing conditions?
          </span>
          <select
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="None">None</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Heart Disease">Heart Disease</option>
            <option value="Asthma">Asthma</option>
            <option value="Cancer">Cancer</option>
            <option value="Arthritis">Arthritis</option>
            <option value="Cardiovascular Disease">
              Cardiovascular Disease
            </option>
            <option value="Obesity">Obesity</option>
            <option value="Tuberculosis">Tuberculosis</option>
            <option value="Gastrointestinal disorders">
              Gastrointestinal disorders
            </option>
            <option value="Metabolic syndrome">Metabolic syndrome</option>
            <option value="Hepatitis">Hepatitis</option>
            <option value="Skin diseases">Skin diseases</option>
            <option value="Other">Other</option>
          </select>
          {errors.medicalHistory && (
            <span className="text-red-500">{errors.medicalHistory}</span>
          )}
        </label> */}

        <h3 className="text-lg font-semibold mt-4">Do you practice sports?</h3>
        {/* Physical Activity */}
        <label className="block">
          <input
            type="checkbox"
            name="sportPractice"
            checked={formData.physicalActivity}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="noSportPractice"
            checked={formData.physicalActivity}
            onChange={handleChange}
            className="mr-2"
          />
          No
        </label>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 mt-2">
            There was an error submitting the form. Please fill all fields.
          </p>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Survey;
