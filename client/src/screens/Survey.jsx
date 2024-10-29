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
    medicalHistory: [],
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

      if (
        name === "socialState" &&
        (value === "Prefer not to say" || value === "Single")
      ) {
        updatedData.children = "";
        updatedData.childrenNumber = "";
      }

      if (name === "children" && value !== "Yes") {
        updatedData.childrenNumber = "";
      }

      if (name === "diet" && value !== "Other") {
        updatedData.customDiet = "";
      }

      if (
        name === "diet" &&
        ["Vegan", "Vegetarian", "Fruitarian"].includes(value)
      ) {
        updatedData.meat = [];
        updatedData.customMeat = "";
      }

      if (name === "diet" && value !== "Religiously Observant") {
        updatedData.religiouslyObservant = "";
      }

      if (name === "meat" && value !== "Other") {
        updatedData.customMeat = "";
      }

      if (name === "fruits" && value !== "Other") {
        updatedData.customFruits = "";
      }

      if (name === "fruits" && value !== "None") {
        updatedData.fruitUnitPerDay = "";
      }

      if (name === "vegetables" && value !== "Other") {
        updatedData.customVegetables = "";
      }

      if (name === "vegetables" && value !== "None") {
        updatedData.vegetableUnitPerDay = "";
      }

      if (name === "fish" && value !== "Other") {
        updatedData.customFish = "";
      }

      if (name === "dairy" && value !== "Other") {
        updatedData.customDairy = "";
      }

      if (name === "oil" && value !== "Other") {
        updatedData.customOil = "";
      }

      if (name === "religious" && value !== "Other") {
        updatedData.customReligious = "";
      }

      if (name === "medicalHistory" && value !== "Other") {
        updatedData.customMedicalHistory = "";
      }

      if (name === "homeMade" && value !== "Other") {
        updatedData.customHomeMade = "";
      }

      if (name === "ordered" && value !== "Other") {
        updatedData.customOrdered = "";
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
      const isCurrentlySelected = selectedValues.includes(value);
      let updatedSelection;

      if (value === "None") {
        // If "None" is selected, clear all other selections and select only "None"
        updatedSelection = isCurrentlySelected ? [] : ["None"];
      } else {
        // Remove "None" from selection if another item is chosen
        updatedSelection = isCurrentlySelected
          ? selectedValues.filter((item) => item !== value)
          : [...selectedValues.filter((item) => item !== "None"), value];
      }

      // if (value === "Other" && !isCurrentlySelected) {
      //   updatedSelection.push("Other");
      // }

      // if (selectedValues.includes(value)) {
      // Unselect the value
      //   return {
      //    ...prevData,
      //    [field]: selectedValues.filter((item) => item !== value),
      //   };
      //  } else {
      // Select the value
      return {
        ...prevData,
        // [field]: [...selectedValues, value],
        [field]: updatedSelection,
        fruitUnitPerDay: updatedSelection.includes("None")
          ? ""
          : prevData.fruitUnitPerDay,

        customMeat:
          field === "meat" && updatedSelection.includes("Other")
            ? prevData.customMeat
            : "",

        // homeMadeConsumption: shouldShowCustomHomeMade
        //   ? ""
        //   : prevData.homeMadeConsumption,
        // homeMadeConsumptionBudget: shouldShowCustomHomeMade
        //   ? ""
        //   : prevData.homeMadeConsumptionBudget,

        customHomeMade: updatedSelection.includes("Other") ? "" : null,
        customOrdered: updatedSelection.includes("Other") ? "" : null,
      };
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

  const handleFoodFrequencyChange = (index, field, value) => {
    const updatedHomeMade = [...formData.homeMade];
    updatedHomeMade[index][field] = value;

    setFormData((prevState) => ({
      ...prevState,
      homeMade: updatedHomeMade,
      ordered: updatedHomeMade,
    }));
  };

  const addFoodFrequency = () => {
    setFormData((prevState) => ({
      ...prevState,
      homeMade: [
        ...prevState.homeMade,
        {
          selectedDish: "",
          homeMadeConsumption: "",
          homeMadeConsumptionBudget: "",
        },
      ],

      ordered: [
        ...prevState.ordered,
        {
          selectedDish: "",
          orderedConsumption: "",
          orderedConsumptionBudget: "",
        },
      ],
    }));
  };

  const removeFoodFrequency = (index) => {
    const updatedFrequencies = formData.homeMade.filter(
      (_, idx) => idx !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      homeMade: updatedFrequencies,
    }));
    const updatedOrdered = formData.ordered.filter((_, idx) => idx !== index);
    setFormData((prevState) => ({
      ...prevState,
      ordered: updatedOrdered,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.ville) newErrors.ville = "Ville is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.height) newErrors.height = "Height is required.";
    if (!formData.weight) newErrors.weight = "Weight is required.";
    if (!formData.education) newErrors.education = "Education is required.";
    if (!formData.occupation) newErrors.occupation = "Occupation is required.";
    if (!formData.salary) newErrors.salary = "Salary is required.";
    if (!formData.socialState) newErrors.socialState = "Social State is required.";
    if (!formData.diet) newErrors.diet = "Diet is required.";
    if (!formData.fruits || formData.fruits.length === 0) {
      errors.fruits = "Please select at least one fruit.";
    }    if (!formData.vegetables) newErrors.vegetables = "Vegetables is required.";
    if (!formData.homeMade) newErrors.homeMade = "Home Made Food is required.";
    if (!formData.ordered) newErrors.ordered = "Ordered Food is required.";
    if (!formData.medicalHistory) newErrors.medicalHistory = "Medical History Food is required.";
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
            <option value="">Select a State...</option>
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
            {errors.ville && (
            <span className="text-red-500">{errors.ville}</span>
          )}
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
            {errors.country && (
            <span className="text-red-500">{errors.country}</span>
          )}
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
              placeholder="Please specify your education"
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
              placeholder="Please specify your occupation"
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
          <label className="block">
            <span className="font-bold"> Currency: </span>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
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
          <label className="block">
            <span className="font-bold"> Custom Currency: </span>
            <input
              type="text"
              name="customCurrency"
              value={formData.customCurrency}
              placeholder="Specify your currency"
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
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
        {formData.socialState !== "Prefer not to say" &&
          formData.socialState !== "Single" && (
            <label className="block">
              <span className="font-bold">Children: </span>
              <select
                name="children"
                value={formData.children}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md"
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          )}

        {/* Children Number */}
        {formData.children === "Yes" && (
          <label className="block">
            <span className="font-bold">Children Number: </span>
            <select
              name="childrenNumber"
              value={formData.childrenNumber}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
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

        {/* Religious */}
        <label className="block">
          <span className="font-bold">Religious:</span>
          <select
            name="religious"
            value={formData.religious}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Prefer Not to say">Prefer Not to say</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Jewish">Jewish</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Custom Religious */}
        {formData.religious === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom:</span>
            <input
              type="text"
              name="customReligious"
              value={formData.customReligious}
              onChange={handleChange}
              placeholder="Please specify your religioun"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
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
            <option value="Crudism">Crudism</option>
            <option value="Fruitarian">Fruitarian</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Flexitarian">Flexitarian</option>
            <option value="No Diet">No Diet</option>
            <option value="Religiously Observant">Religiously Observant</option>
            <option value="Other">Other</option>
          </select>
          {errors.diet && <span className="text-red-500">{errors.diet}</span>}
        </label>

        {/* Religiously observant field */}
        {formData.diet === "Religiously Observant" && (
          <label className="block">
            <span className="font-bold">
              *Please specify the foods that you don't eat:
            </span>
            <input
              type="text"
              name="religiouslyObservant"
              value={formData.religiouslyObservant}
              onChange={handleChange}
              placeholder="Specify observance details"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Custom Diet */}
        {formData.diet === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom Diet:</span>
            <input
              type="text"
              name="customDiet"
              value={formData.customDiet}
              onChange={handleChange}
              placeholder="Please specify your diet"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Meat */}
        {!["Vegan", "Vegetarian", "Fruitarian"].includes(formData.diet) && (
          <>
            <label className="block">
              <span className="font-bold mb-2 block">Meat:</span>
              <div
                className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
                style={{ maxHeight: "200px" }}
              >
                {[
                  "Beef",
                  "Chicken",
                  "Pork",
                  "Lamb",
                  "Turkey",
                  "Duck",
                  "Goose",
                  "Venison",
                  "Partridge",
                  "Other",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`px-4 py-2 border rounded-md text-center transition-colors duration-200 ${
                      formData.meat.includes(item)
                        ? "bg-blue-500 text-white border-transparent"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleSelection("meat", item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </label>

            {/* Show customMeat field only if "Other" is selected in meat */}
            {formData.meat.includes("Other") && (
              <label className="block">
                <span className="font-bold">*Custom Meat:</span>
                <input
                  type="text"
                  name="customMeat"
                  value={formData.customMeat}
                  onChange={handleChange}
                  placeholder="Please specify other meat"
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </label>
            )}
          </>
        )}

        {/* Fruits */}
        <label className="block">
          <span className="font-bold mb-2 block">Fruits:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "None",
              "Apple",
              "Avocados",
              "Banana",
              "Orange",
              "Grapes",
              "Strawberry",
              "Watermelon",
              "Mango",
              "Kiwi",
              "Pear",
              "Cherry",
              "Peach",
              "Plum",
              "Apricot",
              "Grapefruit",
              "Lemon",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center transition-colors duration-200 ${
                  formData.fruits.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("fruits", item)}
              >
                {item}
              </button>
            ))}
            
          </div>
          {errors.fruits && (
            <span className="text-red-500">{errors.fruits}</span>
          )}
        </label>

        {/* Custom Fruits */}
        {formData.fruits.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Fruits:</span>
            <input
              type="text"
              name="customFruits"
              value={formData.customFruits}
              onChange={handleChange}
              placeholder="Please specify other fruits"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Fruit Unit Per Day */}

        {!formData.fruits.includes("None") && (
          <label className="block">
            <span className="font-bold">How many fruits per day: </span>
            <select
              name="fruitUnitPerDay"
              value={formData.fruitUnitPerDay}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="Between 1-2">Between 1-2</option>
              <option value="Between 2-3">Between 2-3</option>
              <option value="Between 3-4">Between 3-4</option>
              <option value="Between 4-5">Between 4-5</option>
              <option value="Between 5-6">Between 5-6</option>
              <option value="Between 6-7">Between 6-7</option>
              <option value="Between 7-8">Between 7-8</option>
              <option value="Between 8-9">Between 8-9</option>
              <option value="Between 9-10">Between 9-10</option>
              <option value="Over 10">Over 10</option>
            </select>
          </label>
        )}

        {/* Vegetables */}
        <label className="block">
          <span className="font-bold mb-2 block">Vegetables:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "None",
              "Carrot",
              "Potato",
              "Tomato",
              "Cucumber",
              "Broccoli",
              "Lettuce",
              "Cabbage",
              "Spinach",
              "Zucchini",
              "Eggplant",
              "Celery",
              "Onion",
              "Garlic",
              "Ginger",
              "Parsnip",
              "Radish",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center transition-colors duration-200 ${
                  formData.vegetables.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("vegetables", item)}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.vegetables && (
            <span className="text-red-500">{errors.vegetables}</span>
          )}
        </label>

        {/* Custom Vegetabels */}
        {formData.vegetables.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Vegetables:</span>
            <input
              type="text"
              name="customVegetables"
              value={formData.customVegetables}
              onChange={handleChange}
              placeholder="Please specify other vegetables"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Vegetable Unit Per Day */}

        {!formData.vegetables.includes("None") && (
          <label className="block">
            <span className="font-bold">How many vegetables per day: </span>
            <select
              name="vegetableUnitPerDay"
              value={formData.vegetableUnitPerDay}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="Between 1-2">Between 1-2</option>
              <option value="Between 2-3">Between 2-3</option>
              <option value="Between 3-4">Between 3-4</option>
              <option value="Between 4-5">Between 4-5</option>
              <option value="Between 5-6">Between 5-6</option>
              <option value="Between 6-7">Between 6-7</option>
              <option value="Between 7-8">Between 7-8</option>
              <option value="Between 8-9">Between 8-9</option>
              <option value="Between 9-10">Between 9-10</option>
              <option value="Over 10">Over 10</option>
            </select>
          </label>
        )}

        {/* Fish */}
        <label className="block">
          <span className="font-bold mb-2 block">Fish:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "None",
              "Bonito",
              "Picarel",
              "Salmon",
              "Sea Bass",
              "Hake",
              "Tuna",
              "Shrimp",
              "Crab",
              "Lobster",
              "Oyster",
              "Scallop",
              "Clam",
              "Plum",
              "Squid",
              "Sardines",
              "Mackerel",
              "Herring",
              "Anchovies",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center transition-colors duration-200 ${
                  formData.fish.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("fish", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {/* Custom Fish */}
        {formData.fish.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Fish:</span>
            <input
              type="text"
              name="customFish"
              value={formData.customFish}
              onChange={handleChange}
              placeholder="Please specify other fish"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Dairy */}
        <label className="block">
          <span className="font-bold mb-2 block">Dairy:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "None",
              "Milk",
              "Cheese",
              "Yogurt",
              "Butter",
              "Cream",
              "Ice Cream",
              "Sour Cream",
              "Ricotta",
              "Mozzarella",
              "Feta",
              "Cottage Cheese",
              "Cream Cheese",
              "Parmesan",
              "Gouda",
              "Swiss Cheese",
              "Brie",
              "Camembert",
              "Goat Cheese",
              "Blue Cheese",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center transition-colors duration-200 ${
                  formData.dairy.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("dairy", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {/* Custom Dairy */}
        {formData.dairy.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Dairy:</span>
            <input
              type="text"
              name="customDairy"
              value={formData.customDairy}
              onChange={handleChange}
              placeholder="Please specify other dairy"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Oil */}
        <label className="block">
          <span className="font-bold mb-2 block">Oil:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "None",
              "Olive Oil",
              "Sunflower Oil",
              "Canola Oil",
              "Sesame Oil",
              "Safflower Oil",
              "Peanut Oil",
              "Avocado Oil",
              "Coconut Oil",
              "Grapeseed Oil",
              "Walnut Oil",
              "Hazelnut Oil",
              "Soybean Oil",
              "Truffle Oil",
              "Vegetable Oil",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center transition-colors duration-200 ${
                  formData.oil.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("oil", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {/* Custom Oil */}
        {formData.oil.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Oil:</span>
            <input
              type="text"
              name="customOil"
              value={formData.customOil}
              onChange={handleChange}
              placeholder="Please specify other dairy"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        <h3 className="text-lg font-semibold mt-4">
          Do you prefer Home made foods or Ready to eat foods? or Both?
        </h3>

        {/* HomeMade */}
        <label className="block">
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
                  formData.homeMade.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => toggleSelection("homeMade", item)}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.homeMade && (
            <span className="text-red-500">{errors.homeMade}</span>
          )}
        </label>
        {/* HomeMade consumption*/}
        <div>
          {formData.homeMade.map((item, index) => (
            <div key={index} className="flex space-x-4 mb-4 items-end">
              <div className="w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {item === "Other" ? formData.customHomeMade : item}{" "}
                  Consumption
                </label>
                <select
                  name="homeMadeConsumption"
                  value={item.homeMadeConsumption}
                  onChange={(e) =>
                    handleFoodFrequencyChange(
                      index,
                      "homeMadeConsumption",
                      e.target.value
                    )
                  }
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                >
                  <option value="">Select Period</option>
                  <option value="Every Day">Every Day</option>
                  <option value="2-3 Times a Week">2-3 Times a Week</option>
                  <option value="1-2 Times a Week">1-2 Times a Week</option>
                  <option value="1-2 Times a Month">1-2 Times a Month</option>
                  <option value="Rarely">Rarely</option>
                  <option value="Never">Never</option>
                </select>
                {errors[`homeMadeConsumption-${index}`] && (
                  <span className="text-red-500">
                    {errors[`homeMadeConsumption-${index}`]}
                  </span>
                )}
              </div>

              {/* Home Made Consumption Budget */}
              {item.homeMadeConsumption !== "Other" && (
                <div className="w-1/4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item === "Other" ? formData.customHomeMade : item}{" "}
                    Consumption Budget
                  </label>
                  <select
                    name="homeMadeConsumptionBudget"
                    value={item.homeMadeConsumptionBudget}
                    onChange={(e) =>
                      handleFoodFrequencyChange(
                        index,
                        "homeMadeConsumptionBudget",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  >
                    <option value="">Select Budget</option>
                    <option value="Less than 100">Less than 100</option>
                    <option value="100-200">100-200</option>
                    <option value="200-300">200-300</option>
                    <option value="300-400">300-400</option>
                    <option value="400-500">400-500</option>
                    <option value="500-600">500-600</option>
                    <option value="600-700">600-700</option>
                    <option value="700-800">700-800</option>
                    <option value="800-900">800-900</option>
                    <option value="900-1000">900-1000</option>
                    <option value="More than 1000">More than 1000</option>
                  </select>
                  {errors[`homeMadeConsumptionBudget-${index}`] && (
                    <span className="text-red-500">
                      {errors[`homeMadeConsumptionBudget-${index}`]}
                    </span>
                  )}
                </div>
              )}

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

          {/* Display custom input for "Other" */}
          {formData.homeMade.includes("Other") && (
            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Other
              </label>
              <input
                type="text"
                name="customHomeMade"
                value={formData.customHomeMade}
                onChange={(e) =>
                  setFormData({ ...formData, customHomeMade: e.target.value })
                }
                placeholder="Enter custom item"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
            </div>
          )}
        </div>

        {/* Ordered */}
        <label className="block">
          <span className="font-bold mb-2 block">Ordered:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "Pizza",
              "Sandiwches",
              "Burgers",
              "Wraps",
              "Paniis",
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
                  formData.ordered.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => toggleSelection("ordered", item)}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.ordered && (
            <span className="text-red-500">{errors.ordered}</span>
          )}
        </label>

        {/* Ordered consumption*/}
        <div>
          {formData.ordered.map((item, index) => (
            <div key={index} className="flex space-x-4 mb-4 items-end">
              <div className="w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {item === "Other" ? formData.customOrdered : item} Consumption
                </label>
                <select
                  name="orederedConsumption"
                  value={item.orederedConsumption}
                  onChange={(e) =>
                    handleFoodFrequencyChange(
                      index,
                      "orederedConsumption",
                      e.target.value
                    )
                  }
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                >
                  <option value="">Select Period</option>
                  <option value="Every Day">Every Day</option>
                  <option value="2-3 Times a Week">2-3 Times a Week</option>
                  <option value="1-2 Times a Week">1-2 Times a Week</option>
                  <option value="1-2 Times a Month">1-2 Times a Month</option>
                  <option value="Rarely">Rarely</option>
                  <option value="Never">Never</option>
                </select>
                {errors[`orederedConsumption-${index}`] && (
                  <span className="text-red-500">
                    {errors[`orederedConsumption-${index}`]}
                  </span>
                )}
              </div>

              {/* Ordered Consumption Budget */}
              {item.orderedConsumption !== "Other" && (
                <div className="w-1/4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item === "Other" ? formData.customOrdered : item}{" "}
                    Consumption Budget
                  </label>
                  <select
                    name="orderedConsumptionBudget"
                    value={item.orderedConsumptionBudget}
                    onChange={(e) =>
                      handleFoodFrequencyChange(
                        index,
                        "orderedConsumptionBudget",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  >
                    <option value="">Select Budget</option>
                    <option value="Less than 100">Less than 100</option>
                    <option value="100-200">100-200</option>
                    <option value="200-300">200-300</option>
                    <option value="300-400">300-400</option>
                    <option value="400-500">400-500</option>
                    <option value="500-600">500-600</option>
                    <option value="600-700">600-700</option>
                    <option value="700-800">700-800</option>
                    <option value="800-900">800-900</option>
                    <option value="900-1000">900-1000</option>
                    <option value="More than 1000">More than 1000</option>
                  </select>
                  {errors[`orderedConsumptionBudget-${index}`] && (
                    <span className="text-red-500">
                      {errors[`orderedConsumptionBudget-${index}`]}
                    </span>
                  )}
                </div>
              )}

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

          {/* Display custom input for "Other" */}
          {formData.ordered.includes("Other") && (
            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Other
              </label>
              <input
                type="text"
                name="customOrdered"
                value={formData.customOrdered}
                onChange={(e) =>
                  setFormData({ ...formData, customOrdered: e.target.value })
                }
                placeholder="Enter custom item"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
            </div>
          )}
        </div>

        {/* Medical History */}
        <label className="block">
          <span className="font-bold mb-2 block">Medical History:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {[
              "None",
              "Diabetes",
              "Hypertension",
              "Heart_Disease",
              "Cancer",
              "Cardiovascular Disease",
              "Obesity",
              "Asthma",
              "Arthritis",
              "Gastrointestinal disorders",
              "Metabolic syndrome",
              "Skin diseases",
              "Tuberculosis",
              "Hepatitis",
              "Other",
              "Prefer not to say",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center transition-colors duration-200 ${
                  formData.medicalHistory.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("medicalHistory", item)}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.medicalHistory && (
            <span className="text-red-500">{errors.medicalHistory}</span>
          )}
        </label>

        {/* Custom Mdical History */}
        {formData.medicalHistory.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Medical History:</span>
            <input
              type="text"
              name="customMedicalHistory"
              value={formData.customMedicalHistory}
              onChange={handleChange}
              placeholder="Please specify other dairy"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

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
