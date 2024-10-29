const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  age: {
    type: String,
    enum: [
      "Between 1-10 years",
      "Between 10-18 years",
      "Between 19-25 years",
      "Between 26-29 years",
      "Between 30-39 years",
      "Between 40-49 years",
      "Between 50-59 years",
      "Between 60-69 years",
      "Over 70 years",
    ],
    required: true,
  },
  state: {
    type: String,
    enum: [
      "Algeria","Egypt","Morocco","Tunisia","Libya",
      "Lebanon","Palestine","Syria","Turkey",
      "Albania","Herzegovina","Croatia",
      "Cyprus","France", "Greece","Italy",
      "Malta","Monaco","Montenegro","Slovenia","Spain",
    ],
    required: true,
  },

  ville: {
    type: String,
    enum: function () {
      // Conditional list of cities (villes) based on selected state
      if (this.state === "Tunisia") return ["Ariana", "Beja", "Ben_Arous","Sidi Bouzid", 
        "Tunis", "Sousse", "Gabes", "Kairouan", "Bizerte", "Gafsa", "Kasserine", "Kef", 
        "Mahdia", "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", 
        "Siliana", "Tataouine", "Tozeur", "Zaghouan", "Jendouba" 
      ];
      if (this.state === "Morocco") return ["Casablanca", "Rabat", "Fes", "Marrakech"
        , "Agadir", "Tangier", "Kenitra", "Oujda", "Safi", "El Jadida", "Settat",
         "El Kelaa des Sraghna"
      ];
      if (this.state === "Algeria") return ["Algiers", "Oran", "Constantine", "Annaba"
        , "Batna", "Tlemcen", "Tiaret", "Guelma", "Biskra", "Tebessa", "Bejaia",
         "Mostaganem", "Tissemsilt", "El Oued", "Laghouat", "M'Sila", "Mascara",
      ];
      if (this.state === "France") return ["Paris", "Lyon", "Marseille", "Nice"
        , "Toulouse", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille",
        "Rennes", "Reims", "Le Havre", "Saint-Etienne", "Toulon", "Grenoble", "Dijon",
      ];
      if (this.state === "Italy") return ["Rome", "Milan", "Naples", "Florence"
        , "Turin", "Palermo", "Genoa", "Bologna", "Bari", "Catania", "Messina"
      ];
      if (this.state === "Spain") return ["Madrid", "Barcelona", "Valencia", "Seville"
        , "Valencia", "Malaga", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma de Mallorca"
      ];
      if (this.state === "Albania") return ["Tirana", "Durres", "Shkoder", "Vlore"
        , "Elbasan", "Fier", "Korce", "Vlore", "Kukes", "Gjirokaster", "Lezhe", "Korce"
      ];
      if (this.state === "Herzegovina") return ["Mostar", "Bijeljina", "Prijedor", "Trebinje"
        , "Brcko", "Prijedor", "Trebinje", "Banja Luka", "Zenica", "Sarajevo"
      ];
      if (this.state === "Croatia") return ["Zagreb", "Split", "Rijeka", "Osijek"
      ];
      if (this.state === "Cyprus") return ["Nicosia", "Limassol", "Larnaca", "Paphos"
      ];
      if(this.state === "Greece") return ["Athens", "Thessaloniki", "Patras", "Larissa"
        , "Heraklion", "Rhodes", "Chania", "Kavala", "Kastoria", "Kilkis", "Kozani"
      ];
      if (this.state === "Lebanon") return ["Akkar","Beirut", "Bekaa",
        "Baalbek-Hermel",  "Mount_Lebanon", "North Lebanon", "Nabatiyeh", "South Lebanon"
      ];
      if (this.state === "Syria") return ["Dimashq", "Aleppo", "Homs", "Hama",
        "Halab", "Daraa", "Idlib", "Quneitra", "Rif Dimashq", "Tartus", "Deir ez-Zor",
        "Latakia", "Raqqa", "Suwayda", "Hasakah"
      ];
      if (this.state === "Turkey") return ["Istanbul", "Ankara", "Izmir", "Bursa",
         "Antalya", "Gaziantep", "Kayseri", "Konya","Adana", "Mersin",
      ];
      if (this.state === "Malta") return ["Valletta", "Birgu", "Senglea", "Gzira"
        , "St. Julian's", "Sliema", "Gzira", "Msida", "Paola", "Marsa", "Marsaskala"
      ];
      if (this.state === "Monaco") return ["Monte Carlo", "Fontvieille", "La Condamine"
        , "La Colle", "La Condamine", "La Gare", "La Source", "La Vague", "Le Port"
      ];
      if (this.state === "Montenegro") return ["Podgorica", "Nikšić", "Bar", "Budva"
        , "Budva", "Herceg Novi", "Kotor", "Tivat", "Ulcinj", "Bar", "Budva", "Herceg Novi"
      ];
      if (this.state === "Slovenia") return ["Ljubljana", "Maribor", "Celje", "Kranj"
        , "Koper", "Nova Gorica", "Ptuj", "Nova Gorica", "Ptuj", "Novo Mesto", 
        "Slovenska Bistrica"
      ];
      if (this.state === "Palestine") return ["Gaza", "Aaka", "Nablus", "Ramallah",
        "Safad", "Hayfa", "Jenin", "Enassr", "Baysan", "Aryha", "Al-Quds", "Bayt lahm",
        "Al-khalil", "Byr Sabaa", "Naquab" 
      ];
      if (this.state === "Libya") return ["Tripoli", "Benghazi", "Misrata", "Sabha"
        , "Derna", "Al-Bayda", "Al-Jizah", "Al-Jabal al Akhdar", "Al-Jabal al Gharbi",
        "Al-Jabal al Janubiyah", "Al-Jabal al Shariqah", "Al-Jabal al Wusta", "Al-Jufrah",
      ];
      if (this.state === "Egypt") return ["Cairo", "Alexandria", "Giza", "Port Said"
        , "Suez", "Luxor", "Aswan", "Asyut", "Beni Suef", "Fayoum", "Minya", "Qena",
        "Sohag", "Qalyubia", "Kafr El Sheikh", "Damietta", "Sharqia", "Gharbia",
      ];
      return [];
    },
    required: function () {
      return !!this.state;
    },
  },
  country: {
    type: String,
    enum: function () {
      // Conditional list of countries based on selected city (ville)
      //ville tunis
      if (this.ville === "Sidi Bouzid") return ["Rgueb", "Menzel_Bouzaiane"];
      if (this.ville === "Tunis") return ["La Marsa", "La Soukra"];
      if (this.ville === "Sfax") return ["La Marsa", "La Soukra"];
      if (this.ville === "Sousse") return ["La Marsa", "La Soukra"];
      if (this.ville === "Jendouba") return ["La Marsa", "La_Soukra"]
      if (this.ville === "Gafsa") return ["Carthage", "La_Marsa"];
      if (this.ville === "Beja") return ["Kalaa_Kebira", "Hammam_Sousse"];
      if (this.ville === "Gabes") return ["La Marsa", "La Soukra"];
      if (this.ville === "Kairouan") return ["La Marsa", "La Soukra"];
      if (this.ville === "Kasserine") return ["La Marsa", "La Soukra"];
      if (this.ville === "Kebili") return ["La Marsa", "La Soukra"];
      if (this.ville === "Kef") return ["La Marsa", "La Soukra"];
      if (this.ville === "Mahdiya") return ["La Marsa", "La Soukra"];
      if (this.ville === "Manouba") return ["La Marsa", "La Soukra"];
      if (this.ville === "Medenine") return ["La Marsa", "La Soukra"];
      if (this.ville === "Monastir") return ["La Marsa", "La Soukra"];
      if (this.ville === "Nabeul") return ["La Marsa", "La Soukra"];
      if (this.ville === "Siliana") return ["La Marsa", "La Soukra"];
      if (this.ville === "Tozeur") return ["La Marsa", "La Soukra"];
      if (this.ville === "Zaghouan") return ["La Marsa", "La Soukra"];

      //ville algeria
      if (this.ville === "Algiers") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Annaba") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Batna") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Bejaia") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Biskra") return ["Bab El Oued", "El Harrach"];

      //ville  maroc
      if (this.ville === "Casablanca") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Rabat") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Fes") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Marrakech") return ["Bab El Oued", "El Harrach"];
      if (this.ville === "Agadir") return ["Bab El Oued", "El Harrach"];
      //ville italy
      if (this.ville === "Rome") return ["Lazio"];
      if (this.ville === "Milan") return ["Lazio"];
      if (this.ville === "Naples") return ["Lazio"];
      if (this.ville === "Turin") return ["Lazio"];
      if (this.ville === "Genoa") return ["Lazio"];
      if (this.ville === "Bologna") return ["Lazio"];

      //ville france
      if (this.ville === "Paris") return ["Ile-de-France"];
      if (this.ville === "Marseille") return ["Ile-de-France"];
      if (this.ville === "Lyon") return ["Ile-de-France"];
      if (this.ville === "Toulouse") return ["Ile-de-France"];
      if (this.ville === "Nice") return ["Ile-de-France"];
      if (this.ville === "Nantes") return ["Ile-de-France"];

      //ville spain
      if (this.ville === "Madrid") return ["Madrid"];
      if (this.ville === "Barcelona") return ["Madrid"];
      if (this.ville === "Valencia") return ["Madrid"];
      if (this.ville === "Seville") return ["Madrid"];
      if (this.ville === "Malaga") return ["Madrid"];

      //ville albania
      if (this.ville === "Tirana") return ["Tirana"];
      if (this.ville === "Durres") return ["Tirana"];
      if (this.ville === "Vlore") return ["Tirana"];
      if (this.ville === "Elbasan") return ["Tirana"];
      if (this.ville === "Shkoder") return ["Tirana"];
      if (this.ville === "Korce") return ["Tirana"];

      //ville Herzegovina
      if (this.ville === "Sarajevo") return ["Sarajevo"];
      if (this.ville === "Banja Luka") return ["Sarajevo"];
      if (this.ville === "Zenica") return ["Sarajevo"];
      if (this.ville === "Mostar") return ["Sarajevo"];

      //ville croitia
      if (this.ville === "Zagreb") return ["Zagreb"];
      if (this.ville === "Split") return ["Zagreb"];
      if (this.ville === "Rijeka") return ["Zagreb"];
      if (this.ville === "Osijek") return ["Zagreb"];

      //ville cyprus
      if (this.ville === "Nicosia") return ["Nicosia"];
      if (this.ville === "Limassol") return ["Nicosia"];
      if (this.ville === "Larnaca") return ["Nicosia"];
      if (this.ville === "Paphos") return ["Nicosia"];

      //ville greece
      if (this.ville === "Athens") return ["Athens"];
      if (this.ville === "Thessaloniki") return ["Athens"];
      if (this.ville === "Patra") return ["Athens"];
      if (this.ville === "Larissa") return ["Athens"];
      if (this.ville ===  "Heraklion") return ["Athens"];
      if (this.ville === "Rhodes") return ["Athens"];

      //ville lebanon
      if (this.ville === "Beirut") return ["Beirut"];
      if (this.ville === "Akkar") return ["Beirut"];
      if (this.ville === "Bekaa") return ["Beirut"];
      if (this.ville === "Nabatiyeh") return ["Beirut"];
      if (this.ville === "North Lebanon") return ["Beirut"];

      //ville syria
      if (this.ville === "Dimashq") return ["Dimashq"];
      if (this.ville === "Homs") return ["Dimashq"];
      if (this.ville === "Aleppo") return ["Dimashq"];
      if (this.ville === "Hama") return ["Dimashq"];
      if (this.ville === "Latakia") return ["Dimashq"];
      if (this.ville === "Deir ez-Zor") return ["Dimashq"];

      //ville turkey
      if (this.ville === "Istanbul") return ["Istanbul"];
      if (this.ville === "Ankara") return ["Istanbul"];
      if (this.ville === "Izmir") return ["Istanbul"];
      if (this.ville === "Bursa") return ["Istanbul"];

      //ville malta
      if (this.ville === "Valletta") return ["Valletta"];
      if (this.ville === "Sliema") return ["Valletta"];
      if (this.ville === "Gzira") return ["Valletta"];
      if (this.ville === "St. Julian's") return ["Valletta"];

      //ville monaco
      if (this.ville === "Monte Carlo") return ["Monte Carlo"];
      if (this.ville === "Fontvieille") return ["Monte Carlo"];
      if (this.ville === "La Condamine") return ["Monte Carlo"];

      //ville montengro
      if (this.ville === "Podgorica") return ["Podgorica"];
      if (this.ville === "Budva") return ["Podgorica"];
      if (this.ville === "Kotor") return ["Podgorica"];
      if (this.ville === "Herceg Novi") return ["Podgorica"];

      //ville slovenia
      if (this.ville === "Ljubljana") return ["Ljubljana"];
      if (this.ville === "Maribor") return ["Ljubljana"];
      if (this.ville === "Celje") return ["Ljubljana"];
      if (this.ville === "Kranj") return ["Ljubljana"];

      //ville palestine
      if (this.ville === "Gaza") return ["Gaza"];
      if (this.ville === "Baysan") return ["Baysan"];
      if (this.ville === "Enassr") return ["Enassr"];
      if (this.ville === "Nablus") return ["Nablus"];

      //ville libya
      if (this.ville === "Tripoli") return ["Tripoli"];
      if (this.ville === "Benghazi") return ["Tripoli"];
      if (this.ville === "Misrata") return ["Tripoli"];
      if (this.ville === "Derna") return ["Tripoli"];

      //ville egypt 
      if (this.ville === "Cairo") return ["Cairo"];
      if (this.ville === "Alexandria") return ["Cairo"];
      if (this.ville === "Giza") return ["Cairo"];
      if (this.ville === "Suez") return ["Cairo"];

      return [];
    },
    required: function () {
      return !!this.ville;
    },
  },


  height: {
    type: String,
    enum: [
      "Less than 160",
      "Between 160-170",
      "Between 170-180",
      "Between 180-190",
      "Between 190-200",
      "Over 220",
    ],
    required: true,
  },
  weight: {
    type: String,
    enum: [
      "Less than 50",
      "Between 50-60",
      "Between 60-70",
      "Between 70-80",
      "Between 80-90",
      "Between 90-100",
      "Between 100-110",
      "Over 110",
    ],
    required: true,
  },
  education: {
    type: String,
    enum: [
      "None",
      "Primary education",
      "Secondary education",
      "Higher education",
      "Engineerig degree",
      "Masters degree",
      "Technical education",
      "Doctorate degree",
      "Other",
    ],
    required: false,
  },
  customEducation: {
    type: String,
    required: function () {
      return this.education === "Other";
    },
  },
  occupation: {
    type: String,
    enum: [
      "Student",
      "Employed",
      "Unemployed",
      "Retired",
      "Housewife",
      "Other",
    ],
    required: true,
  },
  customOccupation: {
    type: String,
    required: function () {
      return this.occupation === "Other";
    },
  },
  salary: {
    type: String,
    enum: [
      "Prefer not to say",
      "Less than 1000",
      "Between 1000-2000",
      "Between 2000-3000",
      "Between 3000-4000",
      "Between 4000-5000",
      "Over 5000",
    ],
    required: true,
  },
  currency: {
    type: String,
    enum: [
      "TND",
      "EUR",
      "EGP",
      "CK",
      "CM",
      "TKL",
      "LBD",
      "MCD",
      "LBP",
      "PLP",
      "SYP",
      "ALL",
      "Other",
    ],
    required: function () {
      return this.salary !== "Prefer not to say";
    },
  },
  customCurrency: {
    type: String,
    required: function () {
      return this.currency === "Other";
    },
  },
  socialState: {
    type: String,
    enum: ["Prefer not to say", "Single", "Married", "Divorced", "Widowed"],
    required: true,
  },
  children: {
    type: String,
    enum: ["No", "Yes"],
    required: function () {
      return this.socialState !== "Single";}
    },
  childrenNumber: {
    type: String,
    enum: ["One", "Two", "Three", "Four", "Five", "More than five"],
    required: function () {
      return this.children === "Yes";}
    },
  diet: {
    type: String,
    enum: [
      "Crudism",
      "Fruitarian",
      "Vegetarian",
      "Vegan",
      "Flexitarian",
      "No Diet",
      "Religiously Observant",
      "Other",
    ],
    required: true,
  },
  customDiet: {
    type: String,
    required: function () {
      return this.diet === "Other";
    },
  },
  meat: [{
    type: String,
    enum: [
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
    ],
    required: function () {
      return !["Vegan", "Vegetarian", "Fruitarian"].includes(this.diet);
    },
  }],
  customMeat: {
    type: String,
    required: function () {
      return this.meat === "Other";
    },
  },
  religiouslyObservant: {
    type: String,
    required: function () {
      return this.diet === "Religiously Observant";
    },
  },
  fruits: [{
    type: String,
    enum: [
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
      "Lime",
      "Melon",
      "Fig",
      "Guava",
      "Pomegranate",
      "Tangerine",
      "Other",
    ],
    required: true,
  }],
  customFruits: {
    type: String,
    required: function () {
      return this.fruits === "Other";
    },
  },
  fruitUnitPerDay: {
    type: String,
    enum: [
      "1",
      "Between 1-2",
      "Between 2-3",
      "Between 3-4",
      "Between 4-5",
      "Between 5-6",
      "Between 6-7",
      "Between 7-8",
      "Between 8-9",
      "Between 9-10",
      "Over 10",
    ],
    required: function () {
      return this.fruits !== "None";  
    },
  },
  vegetables: [{
    type: String,
    enum: [
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
      "Sweet Potato",
      "Turnip",
      "Artichoke",
      "Chard",
      "Collard Greens",
      "Kale",
      "Swiss Chard",
      "Radicchio",
      "Arugula",
      "Mushrooms",
      "Okra",
      "Other",
    ],
  }],
  customVegetables: {
    type: String,
    required: function () {
      return this.vegetables === "Other";
    },
  },
  vegetableUnitPerDay: {
    type: String,
    enum: [
      "1",
      "Between 1-2",
      "Between 2-3",
      "Between 3-4",
      "Between 4-5",
      "Between 5-6",
      "Between 6-7",
      "Between 7-8",
      "Between 8-9",
      "Between 9-10",
      "Over 10",
    ],
    required: function () {
      return this.vegetables !== "None";
    },
  },
  religious: {
    type: String,
    enum: [
      "Prefer Not to say",
      "Muslim",
      "Christian",
      "Jewish",
      "Other",
    ],
  },
  customReligious: {
    type: String,
    required: function () {
      return this.religious === "Other";
    },
  },
  fish: [{
    type: String,
    enum: [
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
      "Squid",
      "Sardines",
      "Mackerel",
      "Herring",
      "Anchovies",
      "Other",
    ],
  }],
  customFish: {
    type: String,
    required: function () {
      return this.fish === "Other";
    },
  },
  dairy: [{
    type: String,
    enum: [
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
    ],
  }],
  customDairy: {
    type: String,
    required: function () {
      return this.dairy === "Other";
    },
  },
  oil: [{
    type: String,
    enum: [
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
    ],
  }],
  customOil: {
    type: String,
    required: function () {
      return this.oil === "Other";
    },
  },
  homeMade: [
    {
      type: String,
      enum: [
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
      ],
    },
  ],
  customHomeMade: {
    type: String,
    required: function () {
      return this.HomeMade === "Other";
    },
  },
  homeMadeConsumption: {
    type: String,
    enum: [
      "Every Day",
      "2-3 Times a Week",
      "1-2 Times a Week",
      "1-2 Times a Month",
      "Rarely",
      "Never",
    ],
  },
  homeMadeConsumtionBudget: {
    type: String,
    enum: [
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
    ],
  },
  ordered: [
    {
      type: String,
      enum: [
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
      ],
    },
  ],
  customOrdered: {
    type: String,
    required: function () {
      return this.Ordered === "Other";
    },
  },
  orderedConsumption: {
    type: String,
    enum: [
      "Every Day",
      "2-3 Times a Week",
      "1-2 Times a Week",
      "1-2 Times a Month",
      "Rarely",
      "Never",
    ],
  },
  orderedConsumptionBudget: {
    type: String,
    enum: [
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
  ],
  },
  traditionalEatingHabits: { type: Boolean },
  newEatingHabits: { type: Boolean },
  medicalHistory: {
    type: String,
    enum: [
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
    ],
    required: false,
  },
  medicalHistoryCustom: {
    type: String,
    required: function () {
      return this.medicalHistory === "Other";
    },
  },
  sportPractice: { type: Boolean },
  noSportPractice: { type: Boolean },
});


 surveySchema.index({
  name: "text",
  gender: "text",
  age: "text",
  state: "text",
  ville: "text",
  country: "text",
  height: "text",
  weight: "text",
  education: "text",
  occupation: "text",
  salary: "text",
  socialState: "text",
  children: "text",
  diet: "text",
  meat: "text",
  fruits: "text",
  fruitUnitPerDay: "text",
  vegetables: "text",
  vegetableUnitPerDay: "text",
  religious: "text",
  fish: "text",
  dairy: "text",
  oil: "text",
  HomeMade: "text",
  HomeMadeConsumption: "text",
  HomeMadeConsumptionBudget: "text",
  Ordered: "text",
  OrderedConsumption: "text",
  OrderedConsumptionBudget: "text",
  traditionalEatingHabits: "text",
  newEatingHabits: "text",
  medicalHistory: "text",
  sportPractice: "text",
  noSportPractice: "text",
});

module.exports = mongoose.model("Survey", surveySchema);
