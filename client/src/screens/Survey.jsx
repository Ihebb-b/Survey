import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateSurveyMutation } from "../slices/surveyApiSlice";

const Survey = () => {
  const homeMadeOptions = [
    "Home Made Pizza",
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
  ];

  const consumptionOptions = [
    "Every Day",
    "2-3 Times a Week",
    "1-2 Times a Week",
    "1-2 Times a Month",
    "Rarely",
    "Never",
  ];

  const budgetOptions = [
    "Less than 100",
    "100-200",
    "200-300",
    "300-400",
    "400-500",
    "500-600",
    "600-700",
    "700-800",
    "800-900",
    "900-1000",
    "More than 1000",
  ];

  const orderedOptions = [
    "Pizza",
    "Sandwiches",
    "Burgers",
    "Wraps",
    "Paninis",
    "Mlewi",
    "Chappati",
    "Manakish",
    "Lahmacun",
    "Koshari",
    "Other",
  ];

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
    customHomeMade: { name: "" },
    //customHomeMade: "",
    //homeMadeConsumption: "",
    //homeMadeConsumptionBudget: "",
    ordered: [],
    customOrdered: { name: "" },
    //customOrdered: "",
    //orderedConsumption: "",
    //orderedConsumptionBudget: "",
    traditionalEatingHabits: false,
    newEatingHabits: false,
    medicalHistory: [],
    customMedicalHistory: "",
    physicalActivity: "",
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

      if (Array.isArray(prevState[name])) {
        updatedData[name] = checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value);
      }

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
      // if (name === 'children' && (value === 'Single' || value === 'Prefer not to say')) {
      //   updatedData.childrenNumber = 'none'; // Set `childrenNumber` to 'none' when children is "Single" or "Prefer not to say"
      // }

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
    Tunisia: ["Ariana", "Beja", "Ben_Arous"],
    Algeria: ["Algiers", "Annaba", "Batna"],
  };

  const villeOptions = {
    Ariana: ["Ghazela", "Raoued"],
    Beja: ["Tastour", "Tass"],
    Algiers: ["Bab_El_Oued", "El_Harrach"],
  };

  const countryOptions = {
    Rgueb: ["Ghazela", "Raoued"],
    Menzel_Bouzaine: ["Gafsa"],
    Kalaa_Kebira: ["Soussa"],
    Hammam_Sousse: ["Kantaoui"],
    Bab_El_Oued: ["El_Djazair"],
    El_Harrach: ["Cheraga"],
  };

  const toggleSelectionn = (category, item) => {
    setFormData((prevData) => {
      const currentItems = [...prevData[category]];
      const itemIndex = currentItems.findIndex((i) => i.name === item);

      if (itemIndex !== -1) {
        return {
          ...prevData,
          [category]: currentItems.filter((i) => i.name !== item),
        };
      } else {
        return {
          ...prevData,
          [category]: [
            ...currentItems,
            { name: item, consumption: "", budget: "" },
          ],
        };
      }
    });
  };

  const handleInputChange = (category, itemName, field, value) => {
    setFormData((prevData) => {
      const updatedItems = prevData[category].map((item) =>
        item.name === itemName ? { ...item, [field]: value } : item
      );
      return { ...prevData, [category]: updatedItems };
    });
  };

  const toggleSelection = (field, value) => {
    setFormData((prevData) => {
      const selectedValues = prevData[field];
      const isCurrentlySelected = selectedValues.includes(value);
      let updatedSelection;

      if (value === "None") {
        updatedSelection = isCurrentlySelected ? [] : ["None"];
      } else {
        updatedSelection = isCurrentlySelected
          ? selectedValues.filter((item) => item !== value)
          : [...selectedValues.filter((item) => item !== "None"), value];
      }

      return {
        ...prevData,
        [field]: updatedSelection,
        fruitUnitPerDay:
          field === "fruits" && updatedSelection.includes("None")
            ? ""
            : prevData.fruitUnitPerDay,

        vegetableUnitPerDay:
          field === "vegetables" && updatedSelection.includes("None")
            ? ""
            : prevData.vegetableUnitPerDay,

        customMeat:
          field === "meat" && updatedSelection.includes("Other")
            ? prevData.customMeat
            : "",

        customHomeMade:
          field === "homeMade" && updatedSelection.includes("Other")
            ? ""
            : prevData.customHomeMade,
        customOrdered:
          field === "ordered" && updatedSelection.includes("Other")
            ? ""
            : prevData.customOrdered,
      };
    });
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
    if (!formData.socialState)
      newErrors.socialState = "Social State is required.";
    if (formData.socialState !== "Single" && formData.children === "") {
      newErrors.children = "Children field is required.";
    }
    if (formData.children === "Yes" && !formData.childrenNumber) {
      newErrors.childrenNumber = "Children Number is required.";
    }
    if (!formData.diet) newErrors.diet = "Diet is required.";
    if (!formData.fruits || formData.fruits.length === 0) {
      newErrors.fruits = "Please select at least one fruit.";
    }
    if (!formData.fruits.includes("None") && !formData.fruitUnitPerDay) {
      newErrors.fruitUnitPerDay = "Please specify fruit units per day.";
    }
    if (!formData.vegetables || formData.vegetables.length === 0) {
      newErrors.vegetables = "Please select at least one vegetable.";
    }
    if (
      !formData.vegetables.includes("None") &&
      !formData.vegetableUnitPerDay
    ) {
      newErrors.vegetableUnitPerDay = "Please specify vegetable units per day.";
    }
    if (!formData.homeMade.length)
      newErrors.homeMade = "Home Made Food is required.";
    if (!formData.ordered.length)
      newErrors.ordered = "Ordered Food is required.";
    if (
      formData.homeMade.some((item) => item.name === "Other") &&
      !formData.customHomeMade.name
    ) {
      newErrors.customHomeMade = "Please specify your custom home-made food.";
    }

    if (
      formData.ordered.some((item) => item.name === "Other") &&
      !formData.customOrdered.name
    ) {
      newErrors.customOrdered = "Please specify your custom ordered food.";
    }
    if (!formData.medicalHistory || formData.medicalHistory.length === 0) {
      newErrors.medicalHistory = "Please select at least one item.";
    }
    if (!formData.traditionalEatingHabits && !formData.newEatingHabits) {
      newErrors.eatingHabits =
        "You must select at least one option from Traditional or New Eating Habits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("Form Data:", formData);
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
      if (err && err.status) {
        console.error("Error Status:", err.status);
        console.error("Error Status Text:", err.statusText);
        console.error("Error Data:", err.data);
        toast.error(`Submission failed: ${err.statusText}`);
      } else {
        console.error("An unexpected error occurred:", err);
        toast.error("Submission failed due to an unexpected error.");
      }
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
            onChange={(e) => {
              const selectedState = e.target.value;
              setFormData({
                ...formData,
                state: selectedState,
                ville: "",
                country: "",
              });
            }}
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
          <label className="block mt-4">
            <span className="font-bold">Ville:</span>
            <select
              name="ville"
              value={formData.ville}
              onChange={(e) => {
                const selectedVille = e.target.value;
                setFormData({
                  ...formData,
                  ville: selectedVille,
                  country: "",
                });
              }}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select a Ville...</option>
              {(stateOptions[formData.state] || []).map((ville) => (
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
          <label className="block mt-4">
            <span className="font-bold">Country:</span>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select a Country...</option>
              {(villeOptions[formData.ville] || []).map((country) => (
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
            <option value="Employed">Employed</option>
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
              value={formData.customOccupation}
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
                disabled={
                  formData.socialState === "Single" ||
                  formData.socialState === "Prefer not to say"
                }
                className="border border-gray-300 px-4 py-2 rounded-md"
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.children && (
                <span className="text-red-500">{errors.children}</span>
              )}
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
              disabled={formData.children === "No"}
              className="border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="">Select...</option>
              <option value="None">None</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four">Four</option>
              <option value="Five">Five</option>
              <option value="More than five">More than five</option>
            </select>
            {errors.childrenNumber && (
              <span className="text-red-500">{errors.childrenNumber}</span>
            )}
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
              <option value="None">None</option>
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
            {errors.fruitUnitPerDay && (
              <span className="text-red-500">{errors.fruitUnitPerDay}</span>
            )}
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
        {formData.vegetables[0] !== "None" && (
          <label className="block">
            <span className="font-bold">How many vegetables per day: </span>
            <select
              name="vegetableUnitPerDay"
              value={formData.vegetableUnitPerDay}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="">Select...</option>
              <option value="None">None</option>
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
            {errors.vegetableUnitPerDay && (
              <span className="text-red-500">{errors.vegetableUnitPerDay}</span>
            )}
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

        <label className="block">
          <span className="font-bold mb-2 block">Household:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {homeMadeOptions.map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center ${
                  formData.homeMade.some((i) => i.name === item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => toggleSelectionn("homeMade", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {formData.homeMade.map((selectedItem) => (
          <div key={selectedItem.name} className="mt-4">
            <h4 className="font-semibold">{selectedItem.name}</h4>

            {/* {selectedItem.name === "Other" && (
              <input
                type="text"
                placeholder="Custom Item"
                className="border p-2 rounded-md w-full"
                onChange={(e) =>
                  handleInputChange("homeMade", "Other", "name", e.target.value)
                }
              />
            )} */}

            {selectedItem.name === "Other" && (
              <input
                type="text"
                placeholder="Custom Item"
                className="border p-2 rounded-md w-full"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customHomeMade: {
                      ...prev.customHomeMade,
                      name: e.target.value,
                    },
                  }))
                }
              />
            )}

            {/* Consumption Selection */}
            <label className="block mt-2">
              <span className="text-gray-700">Consumption</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.consumption}
                onChange={(e) =>
                  handleInputChange(
                    "homeMade",
                    selectedItem.name,
                    "consumption",
                    e.target.value
                  )
                }
              >
                <option value="">Select consumption frequency</option>
                {consumptionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            {/* Budget Selection */}
            <label className="block mt-2">
              <span className="text-gray-700">Budget</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.budget}
                onChange={(e) =>
                  handleInputChange(
                    "homeMade",
                    selectedItem.name,
                    "budget",
                    e.target.value
                  )
                }
              >
                <option value="">Select budget</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}

        {/* <label className="block mt-2">
              <span className="text-gray-700">Consumption</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.consumption}
                onChange={(e) =>
                  handleInputChange(
                    "homeMade",
                    selectedItem.name,
                    "consumption",
                    e.target.value
                  )
                }
              >
                <option value="">Select consumption frequency</option>
                {consumptionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mt-2">
              <span className="text-gray-700">Budget</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.budget}
                onChange={(e) =>
                  handleInputChange(
                    "homeMade",
                    selectedItem.name,
                    "budget",
                    e.target.value
                  )
                }
              >
                <option value="">Select budget</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))} */}

        {/* Ordered Section (Similar structure to HomeMade) */}
        <label className="block mt-6">
          <span className="font-bold mb-2 block">Ordered Items:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }}
          >
            {orderedOptions.map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 border rounded-md text-center ${
                  formData.ordered.some((i) => i.name === item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => toggleSelectionn("ordered", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {formData.ordered.map((selectedItem) => (
          <div key={selectedItem.name} className="mt-4">
            <h4 className="font-semibold">{selectedItem.name}</h4>

            {selectedItem.name === "Other" && (
              <input
                type="text"
                placeholder="Custom Item"
                className="border p-2 rounded-md w-full"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customOrdered: {
                      ...prev.customOrdered,
                      name: e.target.value,
                    },
                  }))
                }
              />
            )}

            {/* Consumption Selection */}
            <label className="block mt-2">
              <span className="text-gray-700">Consumption</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.consumption}
                onChange={(e) =>
                  handleInputChange(
                    "ordered",
                    selectedItem.name,
                    "consumption",
                    e.target.value
                  )
                }
              >
                <option value="">Select consumption frequency</option>
                {consumptionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            {/* Budget Selection */}
            <label className="block mt-2">
              <span className="text-gray-700">Budget</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.budget}
                onChange={(e) =>
                  handleInputChange(
                    "ordered",
                    selectedItem.name,
                    "budget",
                    e.target.value
                  )
                }
              >
                <option value="">Select budget</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}

        {/* {formData.ordered.map((selectedItem) => (
          <div key={selectedItem.name} className="mt-4">
            <h4 className="font-semibold">{selectedItem.name}</h4>

            {selectedItem.name === "Other" && (
              <input
                type="text"
                placeholder="Custom Item"
                className="border p-2 rounded-md w-full"
                onChange={(e) =>
                  handleInputChange("ordered", "Other", "name", e.target.value)
                }
              />
            )}

            <label className="block mt-2">
              <span className="text-gray-700">Consumption</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.consumption}
                onChange={(e) =>
                  handleInputChange(
                    "ordered",
                    selectedItem.name,
                    "consumption",
                    e.target.value
                  )
                }
              >
                <option value="">Select consumption frequency</option>
                {consumptionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mt-2">
              <span className="text-gray-700">Budget</span>
              <select
                className="border p-2 rounded-md w-full"
                value={selectedItem.budget}
                onChange={(e) =>
                  handleInputChange(
                    "ordered",
                    selectedItem.name,
                    "budget",
                    e.target.value
                  )
                }
              >
                <option value="">Select budget</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))} */}

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
            type="radio"
            name="physicalActivity"
            value="yes"
            checked={formData.physicalActivity === "yes"}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="block">
          <input
            type="radio"
            name="physicalActivity"
            value="no"
            checked={formData.physicalActivity === "no"}
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
