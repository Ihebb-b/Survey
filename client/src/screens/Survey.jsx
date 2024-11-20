import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateSurveyMutation } from "../slices/surveyApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Survey = () => {
  const homeMadeOptions = [
    //"None",
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
    // "None",
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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const meatOptions = [
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
  ];

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSelect = (item) => {
    if (formik.meat.includes(item)) {
      useFormik({
        ...formik,
        meat: formik.meat.filter((meat) => meat !== item),
      });
    } else {
      useFormik({
        ...formik,
        meat: [...formik.meat, item],
      });
    }
  };

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().trim().required("Name is required."),
  //   gender: Yup.string().required("Gender is required."),
  //   age: Yup.string().required("Age is required."),
  //   state: Yup.string().required("State is required."),
  //   ville: Yup.string().required("Ville is required."),
  //   country: Yup.string().required("Country is required."),
  //   height: Yup.string().required("Height is required."),
  //   weight: Yup.string().required("Weight is required."),
  //   education: Yup.string().required("Education is required."),
  //   occupation: Yup.string().required("Occupation is required."),
  //   salary: Yup.string()
  //     .when("occupation", {
  //       is: (occupation) => !["Student", "Unemployed", "Housewife"].includes(occupation),
  //       then: Yup.string().required("Salary is required."),
  //     }),
  //   socialState: Yup.string().required("Social State is required."),
  //   children: Yup.string().when("socialState", {
  //     is: (socialState) => !["Prefer not to say", "Single"].includes(socialState),
  //     then: Yup.string().required("Children field is required."),
  //   }),
  //   childrenNumber: Yup.string().when("children", {
  //     is: "Yes",
  //     then: Yup.string().required("Children Number is required."),
  //   }),
  //   diet: Yup.string().required("Diet is required."),
  //   fruits: Yup.array()
  //     .min(1, "Please select at least one fruit.")
  //     .required("Please select at least one fruit."),
  //   fruitUnitPerDay: Yup.string().when("fruits", {
  //     is: (fruits) => fruits && !fruits.includes("None"),
  //     then: Yup.string().required("Please specify fruit units per day."),
  //   }),
  //   vegetables: Yup.array()
  //     .min(1, "Please select at least one vegetable.")
  //     .required("Please select at least one vegetable."),
  //   vegetableUnitPerDay: Yup.string().when("vegetables", {
  //     is: (vegetables) => vegetables && !vegetables.includes("None"),
  //     then: Yup.string().required("Please specify vegetable units per day."),
  //   }),
  //   homeMade: Yup.array().of(
  //     Yup.object().shape({
  //       name: Yup.string(),
  //       consumption: Yup.string().when("name", {
  //         is: (name) => name !== "None",
  //         then: Yup.string().required("Consumption is required for selected home-made item."),
  //       }),
  //       budget: Yup.string().when("name", {
  //         is: (name) => name !== "None",
  //         then: Yup.string().required("Budget is required for selected home-made item."),
  //       }),
  //     })
  //   ),
  //   ordered: Yup.array().of(
  //     Yup.object().shape({
  //       name: Yup.string(),
  //       consumption: Yup.string().when("name", {
  //         is: (name) => name !== "None",
  //         then: Yup.string().required("Consumption is required for selected ordered item."),
  //       }),
  //       budget: Yup.string().when("name", {
  //         is: (name) => name !== "None",
  //         then: Yup.string().required("Budget is required for selected ordered item."),
  //       }),
  //     })
  //   ),
  //   customHomeMade: Yup.object().shape({
  //     name: Yup.string().when("homeMade", {
  //       is: (homeMade) => homeMade.some((item) => item.name === "Other"),
  //       then: Yup.string().required("Please specify your custom home-made food."),
  //     }),
  //   }),
  //   customOrdered: Yup.object().shape({
  //     name: Yup.string().when("ordered", {
  //       is: (ordered) => ordered.some((item) => item.name === "Other"),
  //       then: Yup.string().required("Please specify your custom ordered food."),
  //     }),
  //   }),
  //   medicalHistory: Yup.array()
  //     .min(1, "Please select at least one item.")
  //     .required("Please select at least one item."),
  //   eatingHabits: Yup.boolean().test(
  //     "eating-habits-test",
  //     "You must select at least one option from Traditional or New Eating Habits.",
  //     (value, context) => context.parent.traditionalEatingHabits || context.parent.newEatingHabits
  //   ),
  // });

  const formik = useFormik({
    initialValues: {
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
      customOccupation: "",
      salary: "",
      currency: "",
      customCurrency: "",
      socialState: "",
      children: "",
      childrenNumber: "",
      customDiet: "",
      diet: "",
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
    },
    validate: (values) => {

      const errors = {};

      if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    if (!values.age) {
      errors.age = "Age is required";
    }

    if (!values.state) {
      errors.state = "State is required";
    }
    if (!values.ville) {
      errors.ville = "Ville is required";
    }
    if (!values.country) {
      errors.country = "Country is required";
    }
    if (!values.height) {
      errors.height = "Height is required";
    }

    if (!values.weight) {
      errors.weight = "Weight is required";
    }

    if (!values.education) {
      errors.education = "Education is required";
    }

    if (!values.occupation) {
      errors.occupation = "Occupation is required";
    }

    const occupationsWithoutSalary = ["Student", "Unemployed", "Housewife"];
    if (
      values.occupation &&
      !occupationsWithoutSalary.includes(values.occupation) &&
      !values.salary
    ) {
      errors.salary = "Salary is required";
    }

    if (!values.socialState) {
      errors.socialState = "Social state is required";
    }

    if (
      values.children === "" &&
      values.socialState !== "Prefer not to say" &&
      values.socialState !== "Single"
    ) {
      errors.children = "Children is required";
    }

    if (values.childrenNumber === "Yes" && !values.childrenNumber) {
      errors.childrenNumber = "Children number is required";
    }

    if (!values.diet) {
      errors.diet = "Diet is required";
    }

    if (values.fruits.length === 0) {
      errors.fruits = "Please select at least one fruit.";
    }

    if (values.vegetables.length === 0) {
      errors.vegetables = "Please select at least one vegetable.";
    }

    if (!values.fruits.includes("None") && !values.fruitUnitPerDay) {
      errors.fruitUnitPerDay = "Please enter the number of fruits per day.";
    }

    if (!values.vegetables.includes("None") && !values.vegetableUnitPerDay) {
      errors.vegetableUnitPerDay = "Please enter the number of vegetables per day.";
    }

    if (!values.homeMade.length)
      errors.homeMade = "Please select at least one home-made food.";

    if (!values.ordered.length)
      errors.ordered = "Please select at least one ordered food.";

    values.homeMade.forEach((item, index) => {
      if (item.name !== "None") {
        if (!item.consumption) {
          errors[`homeMadeConsumption${index}`] = "Consumption is required for home-made food.";
        }
        if (!item.budget) {
          errors[`homeMadeBudget${index}`] = "Please enter the budget for home-made food.";
        }
      }
    });

    values.ordered.forEach((item, index) => {
      if (item.name !== "None") {
        if (!item.consumption) {
          errors[`orderedConsumption${index}`] = "Consumption is required for ordered food.";
        }
        if (!item.budget) {
          errors[`orderedBudget${index}`] = "Please enter the budget for ordered food.";
        }
      }
    });

    if (!values.medicalHistory || values.medicalHistory.length === 0) {
      errors.medicalHistory = "Please select at least one medical history.";
    }

    if (!values.traditionalEatingHabits && !values.newEatingHabits) {
      errors.eatingHabits = "Please select at least one eating habit.";
    }

    return errors;
  },
  onSubmit: async (values) => {
    console.log("Submitting form with values:", values);
    try {
      const res = await createSurvey(values).unwrap();
      toast.success("Survey submitted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Submission failed. Please check the errors and try again.");
    }
  },
  });

  // const [formData, setFormData] = useState({
  //   name: "",
  //   gender: "",
  //   age: "",
  //   state: "",
  //   ville: "",
  //   country: "",
  //   height: "",
  //   weight: "",
  //   education: "",
  //   customEducation: "",
  //   occupation: "",
  //   customOccupation: "",
  //   salary: "",
  //   currency: "",
  //   customCurrency: "",
  //   socialState: "",
  //   children: "",
  //   childrenNumber: "",
  //   diet: "",
  //   customDiet: "",
  //   meat: [],
  //   customMeat: "",
  //   religiouslyObservant: "",
  //   fruits: [],
  //   customFruits: "",
  //   fruitUnitPerDay: "",
  //   vegetables: [],
  //   customVegetables: "",
  //   vegetableUnitPerDay: "",
  //   religious: "",
  //   customReligious: "",
  //   fish: [],
  //   customFish: "",
  //   dairy: [],
  //   customDairy: "",
  //   oil: [],
  //   customOil: "",
  //   homeMade: [],
  //   customHomeMade: { name: "" },
  //   //customHomeMade: "",
  //   //homeMadeConsumption: "",
  //   //homeMadeConsumptionBudget: "",
  //   ordered: [],
  //   customOrdered: { name: "" },
  //   //customOrdered: "",
  //   //orderedConsumption: "",
  //   //orderedConsumptionBudget: "",
  //   traditionalEatingHabits: false,
  //   newEatingHabits: false,
  //   medicalHistory: [],
  //   customMedicalHistory: "",
  //   physicalActivity: "",
  // });

  const handleMeatSelect = (item) => {
    if (formik.values.meat.includes(item)) {
      formik.setFieldValue(
        "meat",
        formik.values.meat.filter((meat) => meat !== item)
      );
    } else {
      formik.setFieldValue("meat", [...formik.values.meat, item]);
    }
  };

  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const [createSurvey, { isLoading }] = useCreateSurveyMutation();

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   useFormik((prevState) => {
  //     const updatedData = {
  //       ...prevState,
  //       [name]: type === "checkbox" ? checked : value,
  //     };

  //     if (Array.isArray(prevState[name])) {
  //       updatedData[name] = checked
  //         ? [...prevState[name], value]
  //         : prevState[name].filter((item) => item !== value);
  //     }

  //     if (name === "state") {
  //       updatedData.ville = "";
  //       updatedData.country = "";
  //     } else if (name === "ville") {
  //       updatedData.country = "";
  //     }

  //     if (name === "salary" && value === "Prefer not to say") {
  //       updatedData.currency = "";
  //       updatedData.customCurrency = "";
  //     }

  //     if (name === "currency" && value !== "Other") {
  //       updatedData.customCurrency = "";
  //     }

  //     if (
  //       name === "occupation" &&
  //       ["Student", "Unemployed", "Housewife"].includes(value)
  //     ) {
  //       updatedData.salary = "";
  //       updatedData.currency = "";
  //       updatedData.customCurrency = "";
  //     }

  //     if (
  //       name === "socialState" &&
  //       (value === "Prefer not to say" || value === "Single")
  //     ) {
  //       updatedData.children = "";
  //       updatedData.childrenNumber = "";
  //     }

  //     if (name === "children" && value !== "Yes") {
  //       updatedData.childrenNumber = "";
  //     }

  //     if (name === "diet" && value !== "Other") {
  //       updatedData.customDiet = "";
  //     }

  //     if (
  //       name === "diet" &&
  //       ["Vegan", "Vegetarian", "Fruitarian"].includes(value)
  //     ) {
  //       updatedData.meat = [];
  //       updatedData.customMeat = "";
  //     }

  //     if (name === "diet" && value !== "Religiously Observant") {
  //       updatedData.religiouslyObservant = "";
  //     }

  //     if (name === "meat" && value !== "Other") {
  //       updatedData.customMeat = "";
  //     }

  //     if (name === "fruits" && value !== "Other") {
  //       updatedData.customFruits = "";
  //     }

  //     if (name === "fruits" && value !== "None") {
  //       updatedData.fruitUnitPerDay = "";
  //     }

  //     if (name === "vegetables" && value !== "Other") {
  //       updatedData.customVegetables = "";
  //     }

  //     if (name === "vegetables" && value !== "None") {
  //       updatedData.vegetableUnitPerDay = "";
  //     }

  //     if (name === "fish" && value !== "Other") {
  //       updatedData.customFish = "";
  //     }

  //     if (name === "dairy" && value !== "Other") {
  //       updatedData.customDairy = "";
  //     }

  //     if (name === "oil" && value !== "Other") {
  //       updatedData.customOil = "";
  //     }

  //     if (name === "religious" && value !== "Other") {
  //       updatedData.customReligious = "";
  //     }

  //     if (name === "medicalHistory" && value !== "Other") {
  //       updatedData.customMedicalHistory = "";
  //     }

  //     if (name === "homeMade" && value !== "Other") {
  //       updatedData.customHomeMade = "";
  //     }

  //     if (name === "ordered" && value !== "Other") {
  //       updatedData.customOrdered = "";
  //     }

  //     if (name === "homeMade") {
  //       updatedData.consumption.homeMade =
  //         value === "None" ? "" : prevState.homeMadeConsumption;
  //       updatedData.homeMadeBudget =
  //         value === "None" ? "" : prevState.homeMadeBudget;
  //     }

  //     if (name === "ordered") {
  //       updatedData.orderedConsumption =
  //         value === "None" ? "" : prevState.orderedConsumption;
  //       updatedData.orderedBudget =
  //         value === "None" ? "" : prevState.orderedBudget;
  //     }

  //     return updatedData;
  //   });
  // };

  const stateOptions = {
    Algeria: [
      "Algiers",
      "Oran",
      "Constantine",
      "Annaba",
      "Batna",
      "Tlemcen",
      "Tiaret",
      "Guelma",
      "Biskra",
      "Tebessa",
      "Bejaia",
      "Mostaganem",
      "Tissemsilt",
      "El_Oued",
      "Laghouat",
      "M_Sila",
      "Mascara",
    ],
    Tunisia: [
      "Ariana",
      "Beja",
      "Ben_Arous",
      "Sidi_Bouzid",
      "Tunis",
      "Sousse",
      "Gabes",
      "Kairouan",
      "Bizerte",
      "Gafsa",
      "Kasserine",
      "Kef",
      "Mahdia",
      "Manouba",
      "Medenine",
      "Monastir",
      "Nabeul",
      "Sfax",
      "Siliana",
      "Tataouine",
      "Tozeur",
      "Zaghouan",
      "Jendouba",
    ],
    France: [
      "Paris",
      "Lyon",
      "Marseille",
      "Nice",
      "Toulouse",
      "Nantes",
      "Strasbourg",
      "Montpellier",
      "Bordeaux",
      "Lille",
      "Rennes",
      "Reims",
      "Le_Havre",
      "Saint_Etienne",
      "Toulon",
      "Grenoble",
      "Dijon",
    ],
    Italy: [
      "Rome",
      "Milan",
      "Naples",
      "Florence",
      "Turin",
      "Palermo",
      "Genoa",
      "Bologna",
      "Bari",
      "Catania",
      "Messina",
    ],
    Spain: [
      "Madrid",
      "Barcelona",
      "Valencia",
      "Malaga",
      "Seville",
      "Zaragoza",
      "Málaga",
      "Murcia",
      "Palma_de_Mallorca",
    ],
    Albania: [
      "Tirana",
      "Durres",
      "Shkoder",
      "Vlore",
      "Elbasan",
      "Fier",
      "Korce",
      "Vlore",
      "Kukes",
      "Gjirokaster",
      "Lezhe",
      "Korce",
    ],
    Herzegovina: [
      "Mostar",
      "Bijeljina",
      "Brcko",
      "Prijedor",
      "Trebinje",
      "Banja_Luka",
      "Zenica",
      "Sarajevo",
    ],
    Croatia: ["Zagreb", "Split", "Rijeka", "Osijek"],
    Cyprus: ["Nicosia", "Limassol", "Larnaca", "Paphos"],
    Greece: [
      "Athens",
      "Thessaloniki",
      "Patras",
      "Larissa",
      "Heraklion",
      "Rhodes",
      "Chania",
      "Kavala",
      "Kastoria",
      "Kilkis",
      "Kozani",
    ],
    Lebanon: [
      "Akkar",
      "Beirut",
      "Bekaa",
      "Baalbek_Hermel",
      "Mount_Lebanon",
      "North_Lebanon",
      "Nabatiyeh",
      "South_Lebanon",
    ],
    Syria: [
      "Dimashq",
      "Aleppo",
      "Homs",
      "Hama",
      "Halab",
      "Daraa",
      "Idlib",
      "Quneitra",
      "Rif_Dimashq",
      "Tartus",
      "Deir_ez_Zor",
      "Latakia",
      "Raqqa",
      "Suwayda",
      "Hasakah",
    ],
    Morocco: [
      "Casablanca",
      "Rabat",
      "Fes",
      "Marrakech",
      "Agadir",
      "Tangier",
      "Kenitra",
      "Oujda",
      "Safi",
      "El_Jadida",
      "Settat",
      "El_Kelaa_des_Sraghna",
    ],
    Egypt: [
      "Cairo",
      "Alexandria",
      "Giza",
      "Port_Said",
      "Suez",
      "Luxor",
      "Aswan",
      "Asyut",
      "Beni_Suef",
      "Fayoum",
      "Minya",
      "Qena",
      "Sohag",
      "Qalyubia",
      "Kafr_El_Sheikh",
      "Damietta",
      "Sharqia",
      "Gharbia",
    ],

    Libya: [
      "Tripoli",
      "Benghazi",
      "Misrata",
      "Sabha",
      "Derna",
      "Al_Bayda",
      "Al_Jizah",
      "Al_Jabal_al_Akhdar",
      "Al_Jabal_al_Gharbi",
      "Al_Jabal_al_Janubiyah",
      "Al_Jabal_al_Shariqah",
      "Al_Jabal_al_Wusta",
      "Al_Jufrah",
    ],
    Palestine: [
      "Gaza",
      "Aaka",
      "Nablus",
      "Ramallah",
      "Safad",
      "Hayfa",
      "Jenin",
      "Enassr",
      "Baysan",
      "Aryha",
      "Al_Quds",
      "Bayt_lahm",
      "Al_khalil",
      "Byr_Sabaa",
      "Naquab",
    ],
    Turkey: [
      "Istanbul",
      "Ankara",
      "Izmir",
      "Bursa",
      "Antalya",
      "Gaziantep",
      "Kayseri",
      "Konya",
      "Adana",
      "Mersin",
    ],
    Malta: [
      "Valletta",
      "Birgu",
      "Senglea",
      "Gzira",
      "St_Julian_s",
      "Sliema",
      "Gzira",
      "Msida",
      "Paola",
      "Marsa",
      "Marsaskala",
    ],
    Monaco: [
      "Monte_Carlo",
      "Fontvieille",
      "La_Condamine",
      "La_Colle",
      "La_Condamine",
      "La_Gare",
      "La_Source",
      "La_Vague",
      "Le_Port",
    ],
    Montenegro: [
      "Podgorica",
      "Nikšić",
      "Bar",
      "Herceg Novi",
      "Kotor",
      "Tivat",
      "Ulcinj",
      "Bar",
      "Budva",
      "Herceg_Novi",
    ],
    Slovenia: [
      "Ljubljana",
      "Maribor",
      "Celje",
      "Kranj",
      "Koper",
      "Nova_Gorica",
      "Ptuj",
      "Nova_Gorica",
      "Ptuj",
      "Novo_Mesto",
      "Slovenska_Bistrica",
    ],
  };

  const villeOptions = {
    Ariana: ["Ghazela", "Raoued", "Ettadhamen"],
    Beja: ["Testour", "Tibar", "Medjez_El_Bab"],
    Ben_Arous: ["Hammam_Lif", "Radès", "Mohamedia"],
    Sidi_Bouzid: ["Regueb", "Menzel_Bouzaiane", "Sidi_Ali_Ben_Aoun"],
    Tunis: ["Carthage", "La_Marsa", "Le_Kram", "El_Menzah", "Sidi_Hassine"],
    Sousse: ["Kalaa_Kebira", "Hammam_Sousse", "Sidi_Bou_Ali"],
    Gabes: ["El_Hamma", "Metouia", "Mareth"],
    Kairouan: ["Nasrallah", "Haffouz", "Chebika"],
    Bizerte: ["Menzel_Bourguiba", "Mateur", "Sejnane"],
    Gafsa: ["El_Gtar", "Moulares", "Redeyef"],
    Kasserine: ["Thala", "Sbiba", "Hassi_Ferid"],
    Kef: ["Nebeur", "Sakiet_Sidi_Youssef", "Tajerouine"],
    Mahdia: ["Ksour_Essef", "Chebba", "Bou_Meradess"],
    Manouba: ["Douar_Hicher", "Mornaguia", "Tebourba"],
    Medenine: ["Ben_Guerdane", "Beni_Khedache", "Zarzis"],
    Monastir: ["Jemmal", "Ksar_Hellal", "Sahline"],
    Nabeul: ["Hammamet", "Kelibia", "Menzel_Temime"],
    Sfax: ["Kerkennah", "El_Amra", "Sakiet_Ezzit"],
    Siliana: ["Bou_Arada", "El_Krib", "Makthar"],
    Tataouine: ["Remada", "Bir_Lahmar", "Ghomrassen"],
    Tozeur: ["Degache", "Hazoua", "Nefta"],
    Zaghouan: ["El_Fahs", "Zriba", "Bir_Mcherga"],
    Jendouba: ["Ain_Draham", "Tabarka", "Fernana"],
    Algiers: ["Bab_El_Oued", "El_Harrach", "Bab_Ezzouar", "Hydra"],
    Oran: ["Ain_El_Turck", "Es_Senia", "Bir_El_Djir"],
    Constantine: ["El_Khroub", "Ain_Smara", "Didouche_Mourad"],
    Annaba: ["El_Bouni", "Ain_Berda", "Seraidi"],
    Batna: ["Tazoult", "N_Gaous", "El_Madher"],
    Tlemcen: ["Maghnia", "Remchi", "Sabra"],
    Tiaret: ["Ain_Bouchema", "Oued_Lill", "Frenda"],
    Guelma: ["Bou_Hamra", "Bouchegouf", "Ain_Makhlouf"],
    Biskra: ["Tolga", "El_Kantara", "Ouled_Djellal"],
    Tebessa: ["Bir_El_Ater", "Negrine", "Cheria"],
    Bejaia: ["Tichy", "Souk_El_Tenine", "Sidi_Aich"],
    Mostaganem: ["Ain_Nouissy", "Kheir_Eddine", "Mesra"],
    Paris: ["Montmartre", "Belleville", "Le_Marais", "La_Defense"],
    Lyon: ["Croix-Rousse", "Confluence", "Vieux_Lyon"],
    Marseille: ["La_Pointe_Rouge", "Le_Panier", "L'Estaque"],
    Nice: ["Old_Town", "Cimiez", "Magnan"],
    Toulouse: ["Capitole", "Saint-Cyprien", "Carmes"],
    Nantes: ["Ile_de_Nantes", "Doulon", "Beaulieu"],
    Strasbourg: ["Petite_France", "Robertsau", "Koenigshoffen"],
    Montpellier: ["Comedie", "Antigone", "Aiguelongue"],
    Rome: ["Trastevere", "Monti", "Campo_de'_Fiori"],
    Milan: ["Navigli", "Brera", "Porta_Venezia"],
    Naples: ["Vomero", "Chiaia", "Posillipo"],
    Florence: ["San_Lorenzo", "Santa_Croce", "Oltrarno"],
    Madrid: ["Chueca", "Malasaña", "La_Latina"],
    Barcelona: ["Eixample", "Gothic_Quarter", "Gracia"],
    Valencia: ["El_Carmen", "Ruzafa", "Benimaclet"],
    Seville: ["Triana", "Macarena", "Santa_Cruz"],
    Tirana: ["Kombinat", "Blloku", "Selitë"],
    Durres: ["Plazh", "Shkozet", "Currila"],
    Mostar: ["Old_Bridge", "Bisce_Poljé", "Donja_Mahala"],
    Podgorica: ["Stara_Varoš", "Momišići", "Zagorič"],
    Zagreb: ["Gornji_Grad", "Trnje", "Dubrava"],
    Nicosia: ["Old_City", "Aglantzia", "Kaimakli"],
    Athens: ["Plaka", "Monastiraki", "Kolonaki"],
    Beirut: ["Achrafieh", "Hamra", "Verdun"],
    Dimashq: ["Bab_Touma", "Baramkeh", "Mezzeh"],
    Casablanca: ["Maarif", "Ain_Diab", "Bourgogne"],
    Cairo: ["Heliopolis", "Nasr_City", "Giza"],
    Tripoli: ["Ghout_Shaa", "Zawiyat_Dahmani", "Bustan_al-Ghiran"],
  };

  const countryOptions = {
    // Tunisia
    Ghazela: ["Tunisia"],
    Raoued: ["Tunisia"],
    Ettadhamen: ["Tunisia"],
    Testour: ["Tunisia"],
    Tibar: ["Tunisia"],
    Medjez_El_Bab: ["Tunisia"],
    Carthage: ["Tunisia"],
    La_Marsa: ["Tunisia"],
    Le_Kram: ["Tunisia"],
    El_Menzah: ["Tunisia"],
    Sidi_Hassine: ["Tunisia"],

    // Algeria1
    Bab_El_Oued: ["Algeria"],
    El_Harrach: ["Algeria"],
    Bab_Ezzouar: ["Algeria"],
    Hydra: ["Algeria"],
    Ain_El_Turck: ["Algeria"],
    Es_Senia: ["Algeria"],
    Bir_El_Djir: ["Algeria"],

    // France
    Montmartre: ["France"],
    Belleville: ["France"],
    Le_Marais: ["France"],
    La_Defense: ["France"],
    Marseille: ["France"],
    Lyon: ["France"],

    // Italy
    Rome: ["Italy"],
    Milan: ["Italy"],
    Naples: ["Italy"],
    Florence: ["Italy"],
    Turin: ["Italy"],
    Genoa: ["Italy"],

    // Spain
    Madrid: ["Spain"],
    Barcelona: ["Spain"],
    Valencia: ["Spain"],
    Seville: ["Spain"],
    Zaragoza: ["Spain"],
    Málaga: ["Spain"],

    // Albania
    Tirana: ["Albania"],
    Durres: ["Albania"],
    Shkoder: ["Albania"],
    Vlore: ["Albania"],
    Elbasan: ["Albania"],

    // Herzegovina
    Mostar: ["Herzegovina"],
    Bijeljina: ["Herzegovina"],
    Prijedor: ["Herzegovina"],
    Trebinje: ["Herzegovina"],
    Banja_Luka: ["Herzegovina"],

    // Croatia
    Zagreb: ["Croatia"],
    Split: ["Croatia"],
    Rijeka: ["Croatia"],
    Osijek: ["Croatia"],

    // Cyprus
    Nicosia: ["Cyprus"],
    Limassol: ["Cyprus"],
    Larnaca: ["Cyprus"],
    Paphos: ["Cyprus"],

    // Greece
    Athens: ["Greece"],
    Thessaloniki: ["Greece"],
    Patras: ["Greece"],
    Heraklion: ["Greece"],
    Rhodes: ["Greece"],

    // Lebanon
    Beirut: ["Lebanon"],
    Tripoli: ["Lebanon"],
    Sidon: ["Lebanon"],
    Zahle: ["Lebanon"],

    // Syria
    Damascus: ["Syria"],
    Aleppo: ["Syria"],
    Homs: ["Syria"],
    Latakia: ["Syria"],
    Deir_ez_Zor: ["Syria"],

    // Morocco
    Casablanca: ["Morocco"],
    Rabat: ["Morocco"],
    Marrakech: ["Morocco"],
    Agadir: ["Morocco"],
    Tangier: ["Morocco"],

    // Egypt
    Cairo: ["Egypt"],
    Alexandria: ["Egypt"],
    Giza: ["Egypt"],
    Luxor: ["Egypt"],
    Aswan: ["Egypt"],

    // Libya
    Benghazi: ["Libya"],
    Misrata: ["Libya"],
    Sabha: ["Libya"],
    Derna: ["Libya"],

    // Palestine
    Gaza: ["Palestine"],
    Nablus: ["Palestine"],
    Ramallah: ["Palestine"],
    Bayt_lahm: ["Palestine"],
    Aaka: ["Palestine"],

    // Turkey
    Istanbul: ["Turkey"],
    Ankara: ["Turkey"],
    Izmir: ["Turkey"],
    Bursa: ["Turkey"],
    Antalya: ["Turkey"],

    // Malta
    Valletta: ["Malta"],
    Birgu: ["Malta"],
    Senglea: ["Malta"],
    Sliema: ["Malta"],

    // Monaco
    Monte_Carlo: ["Monaco"],
    Fontvieille: ["Monaco"],
    La_Condamine: ["Monaco"],

    // Montenegro
    Podgorica: ["Montenegro"],
    Nikšić: ["Montenegro"],
    Bar: ["Montenegro"],
    Kotor: ["Montenegro"],

    // Slovenia
    Ljubljana: ["Slovenia"],
    Maribor: ["Slovenia"],
    Celje: ["Slovenia"],
    Kranj: ["Slovenia"],
  };

  const toggleSelectionn = (category, item, setFieldValue, values) => {
    const currentItems = [...values[category]];
    const itemIndex = currentItems.findIndex((i) => i.name === item);

    if (itemIndex !== -1) {
      // Remove item if it's already selected
      setFieldValue(
        category,
        currentItems.filter((i) => i.name !== item)
      );
    } else {
      // Add new item with default properties
      setFieldValue(category, [
        ...currentItems,
        { name: item, consumption: "", budget: "" },
      ]);
    }
  };

  // const toggleSelectionn = (category, item) => {
  //   useFormik((prevData) => {
  //     const currentItems = [...prevData[category]];
  //     const itemIndex = currentItems.findIndex((i) => i.name === item);

  //     if (itemIndex !== -1) {
  //       return {
  //         ...prevData,
  //         [category]: currentItems.filter((i) => i.name !== item),
  //       };
  //     } else {
  //       return {
  //         ...prevData,
  //         [category]: [
  //           ...currentItems,
  //           { name: item, consumption: "", budget: "" },
  //         ],
  //       };
  //     }
  //   });
  // };

  const handleInputChange = (category, itemName, field, value) => {
    useFormik((prevData) => {
      const updatedItems = prevData[category].map((item) =>
        item.name === itemName
          ? { ...item, [field]: itemName !== "None" ? value : "" }
          : item
      );
      return { ...prevData, [category]: updatedItems };
    });
  };

  const toggleSelection = (field, value) => {
    const selectedValues = formik.values[field] || [];
    const isCurrentlySelected = selectedValues.includes(value);
    let updatedSelection;

    if (value === "None") {
      updatedSelection = isCurrentlySelected ? [] : ["None"];
    } else {
      updatedSelection = isCurrentlySelected
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues.filter((item) => item !== "None"), value];
    }

    formik.setFieldValue(field, updatedSelection);

    if (field === "fruits") {
      formik.setFieldValue(
        "fruitUnitPerDay",
        updatedSelection.includes("None") ? "" : formik.values.fruitUnitPerDay
      );
    }

    if (field === "vegetables") {
      formik.setFieldValue(
        "vegetableUnitPerDay",
        updatedSelection.includes("None")
          ? ""
          : formik.values.vegetableUnitPerDay
      );
    }

    if (field === "meat") {
      formik.setFieldValue(
        "customMeat",
        updatedSelection.includes("Other") ? formik.values.customMeat : ""
      );
    }

    if (field === "fish") {
      formik.setFieldValue(
        "customFisht",
        updatedSelection.includes("Other") ? formik.values.customFish : ""
      );
    }

    if (field === "dairy") {
      formik.setFieldValue(
        "customDairy",
        updatedSelection.includes("Other") ? formik.values.customDairy : ""
      );
    }

    if (field === "oil") {
      formik.setFieldValue(
        "customOil",
        updatedSelection.includes("Other") ? formik.values.customOil : ""
      );
    }

    if (field === "homeMade") {
      formik.setFieldValue(
        "customHomeMade",
        updatedSelection.includes("Other") ? "" : formik.values.customHomeMade
      );
    }

    if (field === "ordered") {
      formik.setFieldValue(
        "customOrdered",
        updatedSelection.includes("Other") ? "" : formik.values.customOrdered
      );
    }

    // return {
    //   ...prevData,
    //   [field]: updatedSelection,
    //   fruitUnitPerDay:
    //     field === "fruits" && updatedSelection.includes("None")
    //       ? ""
    //       : prevData.fruitUnitPerDay,

    //   vegetableUnitPerDay:
    //     field === "vegetables" && updatedSelection.includes("None")
    //       ? ""
    //       : prevData.vegetableUnitPerDay,

    //   customMeat:
    //     field === "meat" && updatedSelection.includes("Other")
    //       ? prevData.customMeat
    //       : "",

    //   customHomeMade:
    //     field === "homeMade" && updatedSelection.includes("Other")
    //       ? ""
    //       : prevData.customHomeMade,
    //   customOrdered:
    //     field === "ordered" && updatedSelection.includes("Other")
    //       ? ""
    //       : prevData.customOrdered,
    // };
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.name.trim()) newErrors.name = "Name is required.";
  //   if (!formData.gender) newErrors.gender = "Gender is required.";
  //   if (!formData.age) newErrors.age = "Age is required.";
  //   if (!formData.state) newErrors.state = "State is required.";
  //   if (!formData.ville) newErrors.ville = "Ville is required.";
  //   if (!formData.country) newErrors.country = "Country is required.";
  //   if (!formData.height) newErrors.height = "Height is required.";
  //   if (!formData.weight) newErrors.weight = "Weight is required.";
  //   if (!formData.education) newErrors.education = "Education is required.";
  //   if (!formData.occupation) newErrors.occupation = "Occupation is required.";
  //   const occupationsWithoutSalary = ["Student", "Unemployed", "Housewife"];
  //   if (
  //     !occupationsWithoutSalary.includes(formData.occupation) &&
  //     !formData.salary
  //   ) {
  //     newErrors.salary = "Salary is required.";
  //   }
  //   if (!formData.socialState)
  //     newErrors.socialState = "Social State is required.";
  //   if (
  //     formData.children === "" &&
  //     formData.socialState !== "Prefer not to say" &&
  //     formData.socialState !== "Single"
  //   ) {
  //     newErrors.children = "Children field is required.";
  //   }
  //   if (formData.children === "Yes" && !formData.childrenNumber) {
  //     newErrors.childrenNumber = "Children Number is required.";
  //   }
  //   if (!formData.diet) newErrors.diet = "Diet is required.";
  //   if (!formData.fruits || formData.fruits.length === 0) {
  //     newErrors.fruits = "Please select at least one fruit.";
  //   }
  //   if (!formData.fruits.includes("None") && !formData.fruitUnitPerDay) {
  //     newErrors.fruitUnitPerDay = "Please specify fruit units per day.";
  //   }
  //   if (!formData.vegetables || formData.vegetables.length === 0) {
  //     newErrors.vegetables = "Please select at least one vegetable.";
  //   }
  //   if (
  //     !formData.vegetables.includes("None") &&
  //     !formData.vegetableUnitPerDay
  //   ) {
  //     newErrors.vegetableUnitPerDay = "Please specify vegetable units per day.";
  //   }
  //   // if (!formData.homeMade.length)
  //   //   newErrors.homeMade = "Home Made Food is required.";
  //   // if (!formData.ordered.length)
  //   //   newErrors.ordered = "Ordered Food is required.";

  //   formData.homeMade.forEach((item, index) => {
  //     if (item.name !== "None") {
  //       if (!item.consumption) {
  //         newErrors[`homeMadeConsumption${index}`] =
  //           "Consumption is required for selected home-made item.";
  //       }
  //       if (!item.budget) {
  //         newErrors[`homeMadeBudget${index}`] =
  //           "Budget is required for selected home-made item.";
  //       }
  //     }
  //   });

  //   formData.ordered.forEach((item, index) => {
  //     if (item.name !== "None") {
  //       if (!item.consumption) {
  //         newErrors[`orderedConsumption${index}`] =
  //           "Consumption is required for selected ordered item.";
  //       }
  //       if (!item.budget) {
  //         newErrors[`orderedBudget${index}`] =
  //           "Budget is required for selected ordered item.";
  //       }
  //     }
  //   });

  //   if (
  //     formData.homeMade.some((item) => item.name === "Other") &&
  //     !formData.customHomeMade.name
  //   ) {
  //     newErrors.customHomeMade = "Please specify your custom home-made food.";
  //   }

  //   if (
  //     formData.ordered.some((item) => item.name === "Other") &&
  //     !formData.customOrdered.name
  //   ) {
  //     newErrors.customOrdered = "Please specify your custom ordered food.";
  //   }
  //   if (!formData.medicalHistory || formData.medicalHistory.length === 0) {
  //     newErrors.medicalHistory = "Please select at least one item.";
  //   }
  //   if (!formData.traditionalEatingHabits && !formData.newEatingHabits) {
  //     newErrors.eatingHabits =
  //       "You must select at least one option from Traditional or New Eating Habits.";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    console.log("Form Data:", formik.values);
    // e.preventDefault();
    // if (!validateForm()) {
    //   setIsError(true);
    //   return;
    // }
    try {
      const res = await createSurvey(formik.values).unwrap();
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
    <div className="  max-w-4xl mx-auto mt-24 p-6 bg-gray-300 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Survey Form</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Name */}
        <label className="block">
          <span className="font-bold">Name:</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {formik.touched.name && !formik.values.name && formik.errors.name && (
            <span className="text-red-500">{formik.errors.name}</span>
          )}
        </label>

        {/* Gender */}
        <label className="block">
          <span className="font-bold">Gender:</span>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {formik.touched.gender && !formik.values.gender && formik.errors.gender && (
            <span className="text-red-500">{formik.errors.gender}</span>
          )}
        </label>

        {/* Age */}
        <label className="block">
          <span className="font-bold">Age:</span>
          <select
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.touched.age && !formik.values.age && formik.errors.age && (
            <span className="text-red-500">{formik.errors.age}</span>
          )}
        </label>

        {/* State */}
        <label className="block">
          <span className="font-bold">State:</span>
          <select
            name="state"
            value={formik.values.state}
            onChange={(e) => {
              const selectedState = e.target.value;
              formik.setFieldValue("state", selectedState);
              formik.setFieldValue("ville", ""); // Reset 'ville' when 'state' changes
              formik.setFieldValue("country", ""); // Reset 'country' when 'state' changes
            }}
            onBlur={formik.handleBlur}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select a State...</option>
            {Object.keys(stateOptions).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {formik.touched.state && !formik.values.state && formik.errors.state && (
            <span className="text-red-500">{formik.errors.state}</span>
          )}
        </label>

        {/* Ville */}
        {formik.values.state && (
          <label className="block mt-4">
            <span className="font-bold">Ville:</span>
            <select
              name="ville"
              value={formik.values.ville}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                const selectedVille = e.target.value;
                formik.setFieldValue("ville", selectedVille);
                formik.setFieldValue("country", ""); // Reset 'country' when 'ville' changes
              }}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select a Ville...</option>
              {(stateOptions[formik.values.state] || []).map((ville) => (
                <option key={ville} value={ville}>
                  {ville}
                </option>
              ))}
            </select>
            {formik.touched.ville && !formik.values.ville && formik.errors.ville && (
              <span className="text-red-500">{formik.errors.ville}</span>
            )}
          </label>
        )}

        {/* Country */}
        {formik.values.ville && (
          <label className="block mt-4">
            <span className="font-bold">Country:</span>
            <select
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select a Country...</option>
              {(villeOptions[formik.values.ville] || []).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {formik.touched.country && !formik.values.country && formik.errors.country && (
              <span className="text-red-500">{formik.errors.country}</span>
            )}
          </label>
        )}

        {/* Height */}
        <label className="block">
          <span className="font-bold">Height:</span>
          <select
            name="height"
            value={formik.values.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.touched.height && !formik.values.height && formik.errors.height && (
            <span className="text-red-500">{formik.errors.height}</span>
          )}
        </label>

        {/* Weight */}
        <label className="block">
          <span className="font-bold">Weight:</span>
          <select
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.touched.weight && !formik.values.weight && formik.errors.weight && (
            <span className="text-red-500">{formik.errors.weight}</span>
          )}
        </label>

        {/* Education */}
        <label className="block">
          <span className="font-bold">Education:</span>
          <select
            name="education"
            value={formik.values.education}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.touched.education && !formik.values.education && formik.errors.education && (
            <span className="text-red-500">{formik.errors.education}</span>
          )}
        </label>

        {/* Custom Education */}
        {formik.values.education === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom Education</span>
            <input
              type="text"
              name="customEducation"
              value={formik.values.customEducation}
              placeholder="Please specify your education"
              onChange={formik.handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Occupation */}
        <label className="block">
          <span className="font-bold">Occupation:</span>
          <select
            name="occupation"
            value={formik.values.occupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.touched.occupation && !formik.values.occupation && formik.errors.occupation && (
            <span className="text-red-500">{formik.errors.occupation}</span>
          )}
        </label>

        {/* Custom Occupation */}
        {formik.values.occupation === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom Occupation</span>
            <input
              type="text"
              name="customOccupation"
              value={formik.values.customOccupation}
              placeholder="Please specify your occupation"
              onChange={formik.handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Salary */}
        {!["Student", "Unemployed", "Housewife"].includes(formik.values.occupation) && (
            <label className="block">
              <span className="font-bold">Salary:</span>
              <select
                name="salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              {formik.touched.salary && !formik.values.salary && formik.errors.salary && (
                <span className="text-red-500">{formik.errors.salary}</span>
              )}
            </label>
          )}

        {/* Currency */}
        {formik.values.salary &&
          formik.values.salary !== "Prefer not to say" && (
            <label className="block">
              <span className="font-bold"> Currency: </span>
              <select
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
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
                <option value="AL">AL</option>
                <option value="Other">Other</option>
              </select>
            </label>
          )}

        {/* Custom Currency */}
        {formik.values.currency === "Other" && (
          <label className="block">
            <span className="font-bold"> Custom Currency: </span>
            <input
              type="text"
              name="customCurrency"
              value={formik.values.customCurrency}
              placeholder="Specify your currency"
              onChange={formik.handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
          </label>
        )}

        {/* Social State */}
        <label className="block">
          <span className="font-bold">Social State:</span>
          <select
            name="socialState"
            value={formik.values.socialState}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="">Select...</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {formik.touched.socialState && !formik.values.socialState && formik.errors.socialState && (
            <span className="text-red-500">{formik.errors.socialState}</span>
          )}
        </label>

        {/* Children */}
        {formik.values.socialState !== "Prefer not to say" &&
          formik.values.socialState !== "Single" && (
            <label className="block">
              <span className="font-bold">Children: </span>
              <select
                name="children"
                value={formik.values.children}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={
                  formik.values.socialState === "Single" ||
                  formik.values.socialState === "Prefer not to say"
                }
                className="border border-gray-300 px-4 py-2 rounded-md"
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {formik.touched.children && !formik.values.children && formik.errors.children && (
                <span className="text-red-500">{formik.errors.children}</span>
              )}
            </label>
          )}

        {/* Children Number */}
        {formik.values.children === "Yes" && (
          <label className="block">
            <span className="font-bold">Children Number: </span>
            <select
              name="childrenNumber"
              value={formik.values.childrenNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.children === "No"}
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
            {formik.touched.childrenNumber && !formik.values.childrenNumber && formik.errors.childrenNumber && (
              <span className="text-red-500">
                {formik.errors.childrenNumber}
              </span>
            )}
          </label>
        )}

        {/* Religious */}
        <label className="block">
          <span className="font-bold">Religious:</span>
          <select
            name="religious"
            value={formik.values.religious}
            onChange={formik.handleChange}
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
        {formik.values.religious === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom:</span>
            <input
              type="text"
              name="customReligious"
              value={formik.values.customReligious}
              onChange={formik.handleChange}
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
            value={formik.values.diet}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue("meat", []); // Clear meat selection on diet change
            }}
            onBlur={formik.handleBlur}
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
          {formik.touched.diet && !formik.values.diet && formik.errors.diet && (
            <span className="text-red-500">{formik.errors.diet}</span>
          )}
        </label>

        {/* Religiously observant field */}
        {formik.values.diet === "Religiously Observant" && (
          <label className="block">
            <span className="font-bold">
              *Please specify the foods that you don't eat:
            </span>
            <input
              type="text"
              name="religiouslyObservant"
              value={formik.values.religiouslyObservant}
              onChange={formik.handleChange}
              placeholder="Specify observance details"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Custom Diet */}
        {formik.values.diet === "Other" && (
          <label className="block">
            <span className="font-bold">*Custom Diet:</span>
            <input
              type="text"
              name="customDiet"
              value={formik.values.customDiet}
              onChange={formik.handleChange}
              placeholder="Please specify your diet"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Multi-Choice Meat Selection */}
        {!["Vegan", "Vegetarian", "Fruitarian"].includes(
          formik.values.diet
        ) && (
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
                    formik.values.meat.includes(item)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                  }`}
                  onClick={() => toggleSelection("meat", item)}
                  onBlur={formik.handleBlur}
                >
                  {item}
                </button>
              ))}
            </div>
            {formik.touched.meat && !formik.values.meat && formik.errors.meat && (
              <span className="text-red-500">{formik.errors.meat}</span>
            )}
          </label>
        )}

        {/* Custom Meat Input if "Other" is selected */}
        {formik.values.meat.includes("Other") && (
          <label className="block mt-4">
            <span className="font-bold">*Custom Meat:</span>
            <input
              type="text"
              name="customMeat"
              value={formik.values.customMeat}
              onChange={formik.handleChange}
              placeholder="Please specify other meat"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
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
                  formik.values.fruits.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("fruits", item)}
                onBlur={formik.handleBlur}
              >
                {item}
              </button>
            ))}
          </div>
          {formik.touched.fruits && !formik.values.fruits && formik.errors.fruits && (
            <span className="text-red-500">{formik.errors.fruits}</span>
          )}
        </label>

        {/* Custom Fruits */}
        {formik.values.fruits.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Fruits:</span>
            <input
              type="text"
              name="customFruits"
              value={formik.values.customFruits}
              onChange={formik.handleChange}
              placeholder="Please specify other fruits"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Fruit Unit Per Day */}
        {!formik.values.fruits.includes("None") && (
          <label className="block">
            <span className="font-bold">How many fruits per day: </span>
            <select
              name="fruitUnitPerDay"
              value={formik.values.fruitUnitPerDay}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            {formik.touched.fruitUnitPerDay && !formik.values.fruitUnitPerDay && formik.errors.fruitUnitPerDay && (
              <span className="text-red-500">
                {formik.errors.fruitUnitPerDay}
              </span>
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
                  formik.values.vegetables.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("vegetables", item)}
                onBlur={formik.handleBlur}
              >
                {item}
              </button>
            ))}
          </div>
          {formik.touched.vegetables && !formik.values.vegetables && formik.errors.vegetables && (
            <span className="text-red-500">{formik.errors.vegetables}</span>
          )}
        </label>

        {/* Custom Vegetabels */}
        {formik.values.vegetables.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Vegetables:</span>
            <input
              type="text"
              name="customVegetables"
              value={formik.values.customVegetables}
              onChange={handleChange}
              placeholder="Please specify other vegetables"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        {/* Vegetable Unit Per Day */}
        {formik.values.vegetables[0] !== "None" && (
          <label className="block">
            <span className="font-bold">How many vegetables per day: </span>
            <select
              name="vegetableUnitPerDay"
              value={formik.values.vegetableUnitPerDay}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            {formik.touched.vegetableUnitPerDay && !formik.values.vegetableUnitPerDay && formik.errors.vegetableUnitPerDay && (
              <span className="text-red-500">
                {formik.errors.vegetableUnitPerDay}
              </span>
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
                  formik.values.fish.includes(item)
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
        {formik.values.fish.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Fish:</span>
            <input
              type="text"
              name="customFish"
              value={formik.values.customFish}
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
                  formik.values.dairy.includes(item)
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
        {formik.values.dairy.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Dairy:</span>
            <input
              type="text"
              name="customDairy"
              value={formik.values.customDairy}
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
                  formik.values.oil.includes(item)
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
        {formik.values.oil.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Oil:</span>
            <input
              type="text"
              name="customOil"
              value={formik.values.customOil}
              onChange={handleChange}
              placeholder="Please specify other dairy"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </label>
        )}

        <h3 className="text-lg font-semibold mt-4">
          Do you prefer Home made foods or Ready to eat foods? or Both?
        </h3>

        {/*  Home Made */}
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
                  formik.values.homeMade.some((i) => i.name === item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() =>
                  toggleSelectionn(
                    "homeMade",
                    item,
                    formik.setFieldValue,
                    formik.values
                  )
                }
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {/* Custom HomeMade */}

        {formik.values.homeMade.map((selectedItem) => (
          <div key={selectedItem.name} className="mt-4">
            <h4 className="font-semibold">{selectedItem.name}</h4>

            {/* Custom input if "Other" is selected */}
            {selectedItem.name === "Other" && (
              <input
                type="text"
                placeholder="Custom Item"
                className="border p-2 rounded-md w-full"
                value={formik.values.customHomeMade || ""}
                onChange={(e) =>
                  formik.setFieldValue("customHomeMade", e.target.value)
                }
              />
            )}

            {/* Consumption Selection */}
            {selectedItem.name !== "None" && (
              <>
                <label className="block mt-2">
                  <span className="text-gray-700">Consumption</span>
                  <select
                    className="border p-2 rounded-md w-full"
                    value={selectedItem.consumption}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "homeMade",
                        formik.values.homeMade.map((item) =>
                          item.name === selectedItem.name
                            ? { ...item, consumption: e.target.value }
                            : item
                        )
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
                      formik.setFieldValue(
                        "homeMade",
                        formik.values.homeMade.map((item) =>
                          item.name === selectedItem.name
                            ? { ...item, budget: e.target.value }
                            : item
                        )
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
              </>
            )}
          </div>
        ))}

        {/* Ordered */}
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
                  formik.values.ordered.some((i) => i.name === item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() =>
                  toggleSelectionn(
                    "ordered",
                    item,
                    formik.setFieldValue,
                    formik.values
                  )
                }
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {/* Custom Ordered */}
        {formik.values.ordered.map((selectedItem) => (
          <div key={selectedItem.name} className="mt-4">
            <h4 className="font-semibold">{selectedItem.name}</h4>

            {/* Custom input if "Other" is selected */}
            {selectedItem.name === "Other" && (
              <input
                type="text"
                placeholder="Custom Item"
                className="border p-2 rounded-md w-full"
                value={formik.values.customOrdered || ""}
                onChange={(e) =>
                  formik.setFieldValue("customOrdered", e.target.value)
                }
              />
            )}

            {/* Consumption Selection */}
            {selectedItem.name !== "None" && (
              <>
                <label className="block mt-2">
                  <span className="text-gray-700">Consumption</span>
                  <select
                    className="border p-2 rounded-md w-full"
                    value={selectedItem.consumption}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "ordered",
                        formik.values.ordered.map((item) =>
                          item.name === selectedItem.name
                            ? { ...item, consumption: e.target.value }
                            : item
                        )
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
                      formik.setFieldValue(
                        "ordered",
                        formik.values.ordered.map((item) =>
                          item.name === selectedItem.name
                            ? { ...item, budget: e.target.value }
                            : item
                        )
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
              </>
            )}
          </div>
        ))}

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
                  formik.values.medicalHistory.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-900"
                }`}
                onClick={() => toggleSelection("medicalHistory", item)}
                onBlur={formik.handleBlur}
              >
                {item}
              </button>
            ))}
          </div>
          {formik.errors.medicalHistory && (
            <span className="text-red-500">{formik.errors.medicalHistory}</span>
          )}
        </label>

        {/* Custom Mdical History */}
        {formik.values.medicalHistory.includes("Other") && (
          <label className="block">
            <span className="font-bold">*Custom Medical History:</span>
            <input
              type="text"
              name="customMedicalHistory"
              value={formik.values.customMedicalHistory}
              onChange={formik.handleChange}
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
            checked={formik.values.traditionalEatingHabits}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mr-2"
          />
          Traditional Eating Habits
        </label>

        {/* New Eating Habits */}
        <label className="block">
          <input
            type="checkbox"
            name="newEatingHabits"
            checked={formik.values.newEatingHabits}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mr-2"
          />
          New Eating Habits
        </label>

        {formik.touched.eatingHabits && !formik.values.eatingHabits && formik.errors.eatingHabits && (
          <span className="text-red-500">{formik.errors.eatingHabits}</span>
        )}

        <h3 className="text-lg font-semibold mt-4">Do you practice sports?</h3>
        {/* Physical Activity */}
        <label className="block">
          <input
            type="radio"
            name="physicalActivity"
            value="yes"
            checked={formik.values.physicalActivity === "yes"}
            onChange={formik.handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="block">
          <input
            type="radio"
            name="physicalActivity"
            value="no"
            checked={formik.values.physicalActivity === "no"}
            onChange={formik.handleChange}
            className="mr-2"
          />
          No
        </label>

        {/* Error Message */}
        {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
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


// import React from 'react'
// import DynamicForm from '../components/Forms/DynamicForm'
// import { formFields } from '../components/Forms/fields'
// import FormView from '../components/Forms/FormView'
// import { useCreateSurveyMutation } from '../slices/surveyApiSlice'
// import { toast } from 'react-toastify'

// const Survey = () => {

//   const fields = formFields()
//   const [createSurvey, { isLoading }] = useCreateSurveyMutation();


//   const handleSubmit = async (values) => {
//         try {
//           const res = await createSurvey(values).unwrap();
//           toast.success("Survey submitted successfully!");
//           setTimeout(() => navigate("/"), 2000);
//         } catch (err) {
//           if (err && err.status) {
//             console.error("Error Status:", err.status);
//             console.error("Error Status Text:", err.statusText);
//             console.error("Error Data:", err.data);
//             toast.error(`Submission failed: ${err.statusText}`);
//           } else {
//             console.error("An unexpected error occurred:", err);
//             toast.error("Submission failed due to an unexpected error.");
//           }
//         }
//       };
 
//   return (
//     <FormView isLoading={isLoading} title="Survey">
   
//     {(saveRef) =>  <DynamicForm onSubmit={(values)=>handleSubmit(values)} saveRef={saveRef} formFields={fields}/>}
//     </FormView>
//   )
// }

// export default Survey