import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateSurveyMutation } from "../slices/surveyApiSlice";

const Survey = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    country: "",
    education: "",
    ethnicity: "",
    dietDescription: "",
    household: "",
    readyToEatFood: "",
    foodConsumptionFrequency: [
      {
        dietDescription: "",
        period: "",
        unit: "",
        value: "",
      },
    ],
    traditionalEatingHabits: false,
    newEatingHabits: false,
    medicalHistory: "",
    weather: "",
    sportPractice: false,
    noSportPractice: false,
  });

  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const [createSurvey, { isLoading }] = useCreateSurveyMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSelection = (fieldName, item) => {
    setFormData((prevFormData) => {
      const updatedField = prevFormData[fieldName].includes(item)
        ? prevFormData[fieldName].filter((i) => i !== item) // Deselect
        : [...prevFormData[fieldName], item]; // Select

      return { ...prevFormData, [fieldName]: updatedField };
    });
  };

  const handleFoodFrequencyChange = (index, field, value) => {
    const updatedFoodFrequency = [...formData.foodConsumptionFrequency];
    updatedFoodFrequency[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      foodConsumptionFrequency: updatedFoodFrequency,
    }));
  };

  const addFoodFrequency = () => {
    setFormData((prevState) => ({
      ...prevState,
      foodConsumptionFrequency: [
        ...prevState.foodConsumptionFrequency,
        { dietDescription: "", period: "", unit: "", value: "" },
      ],
    }));
  };

  const removeFoodFrequency = (index) => {
    const updatedFrequencies = formData.foodConsumptionFrequency.filter(
      (_, idx) => idx !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      foodConsumptionFrequency: updatedFrequencies,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.ethnicity) newErrors.ethnicity = "Ethnicity is required.";
    if (!formData.dietDescription)
      newErrors.dietDescription = "Diet description is required.";

    // Check if any errors exist
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData); // Log the form data here

    if (!validateForm()) {
      setIsError(true);
      return;
    }

    try {
      const res = await createSurvey(formData).unwrap();

      console.log("Response: ", res); // Inspect the response

      // Simple success toast if response exists (can be adjusted based on your actual response)
      if (res) {
        toast.success("Survey submitted successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000); // Navigate after 1 second
      }
    } catch (err) {
      console.error("Error caught: ", err);
      toast.error(err?.data?.message || err.error || "Submission failed.");
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
            <option value="Other">Other</option>
          </select>
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
            <option value="Under 20 years">Under 20 years</option>
            <option value="Between 20-30 years">Between 20-30 years</option>
            <option value="Between 30-40 years">Between 30-40 years</option>
            <option value="Between 40-50 years">Between 40-50 years</option>
            <option value="Between 50-60 years">Between 50-60 years</option>
            <option value="Over 60 years">Over 60 years</option>
          </select>
        </label>

        {/* Country */}
        <label className="block">
          <span className="font-bold">Country:</span>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            
          >
            <option value="">Select...</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Algeria">Algeria</option>
            <option value="Egypt">Egypt</option>
            <option value="Morocco">Morocco</option>
            <option value="Libya">Libya</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Palestine">Palestine</option>
            <option value="Syria">Syria</option>
            <option value="Turkey">Turkey</option>
            <option value="Albania">Albania</option>
            <option value="Bosnia">Bosnia</option>
            <option value="Herzegovina">Herzegovina</option>
            <option value="Croatia">Croatia</option>
            <option value="Cyprus">Cyprus</option>
            <option value="France">France</option>
            <option value="Greece">Greece</option>
            <option value="Italy">Italy</option>
            <option value="Malta">Malta</option>
            <option value="Monaco">Monaco</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Spain">Spain</option>
          </select>
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
            <option value="Technical education">Technical education</option>
          </select>
        </label>

        {/* Ethnicity */}
        <label className="block">
          <span className="font-bold">Ethnicity:</span>
          <select
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            
          >
            <option value="">Select...</option>
            <option value="Greek">Greek</option>
            <option value="Italian">Italian</option>
            <option value="North_African">North African</option>
            <option value="Spaniard">Spaniard</option>
            <option value="Turks">Turks</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Sicilians">Sicilians</option>
          </select>
        </label>

        {/* Diet Description */}
        <label className="block">
          <span className="font-bold">Diet Description:</span>
          <select
            name="dietDescription"
            value={formData.dietDescription}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Both">Both</option>
          </select>
        </label>

        <h3 className="text-lg font-semibold mt-4">
          Do you prefer Houseold foods or Ready to eat foods? or Both?
        </h3>

        {/* Household */}
        <label className="block">
          <span className="font-bold mb-2 block">Household:</span>
          <div
            className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "200px" }} // Adjust height as needed
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
                type="button" // This prevents the button from submitting the form
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
        </label>

        {/* Ready-to-Eat Food */}
        <label className="block mt-4">
          <span className="font-bold mb-2 block">Ready-to-Eat Food:</span>
          <div
            className="grid grid-cols-2 gap-2 h-32 overflow-y-auto border p-2 rounded-md"
            style={{ maxHeight: "160px" }} // Adjust height as needed
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
                type="button" // Prevents form submission
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

        {/* Food Consumption Frequency */}
        <h3 className="text-lg font-semibold mt-4">
          Food Consumption Frequency
        </h3>
        {formData.foodConsumptionFrequency.map((item, index) => (
          <div key={index} className="flex space-x-4 mb-4 items-end">
            {/* Diet Description */}
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
            </div>

            {/* Period */}
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
            </div>

            {/* Unit */}
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
            </div>

            {/* Value */}
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
            </div>

            {/* Remove Button with Icon */}
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

        {/* Add More Button with Icon */}
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
        </button>

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

        {/* Medical History */}
        <label className="block">
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
        </label>

        {/* Weather */}
        <label className="block">
          <span className="font-bold">
            Usually, how's the weather in your country?
          </span>
          <select
            name="weather"
            value={formData.weather}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Cold">Cold</option>
            <option value="Warm">Warm</option>
            <option value="Hot">Hot</option>
            <option value="Moderate">Modrate</option>
            <option value="Rainy">Rainy</option>
          </select>
        </label>

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
