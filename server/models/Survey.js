const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateVilleMappings = {
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

const villeCountryMappings = {
  //ville Tunisia
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

const countryMappings = {
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

const getVillesForState = (state) => stateVilleMappings[state] || [];
const getCountriesForVille = (ville) => villeCountryMappings[ville] || [];

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
    enum: Object.keys(stateVilleMappings),
    required: true,
  },

  ville: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return getVillesForState(this.state).includes(value);
      },
      message: (props) =>
        `Invalid ville: ${props.value} for state: ${props.instance.state}`,
    },
  },

  country: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return getCountriesForVille(this.ville).includes(value);
      },
      message: (props) =>
        `Invalid country: ${props.value} for ville: ${props.instance.ville}`,
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
    required: function () {
      return !["Student", "Unemployed", "Housewife"].includes(this.occupation);
    },
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
      return (
        this.salary &&
        this.salary !== "Prefer not to say" &&
        !["Student", "Unemployed", "Housewife"].includes(this.occupation)
      );
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
    default: "No",
    required: function () {
      return !["Prefer not to say", "Single"].includes(this.socialState);
    },
    set: (v) => (v === "" ? undefined : v),
  },
  childrenNumber: {
    type: String,
    enum: ["None", "One", "Two", "Three", "Four", "Five", "More than five"],
    default: "None",
    required: function () {
      return this.children === "Yes";
    },
    set: (v) => (v === "" ? undefined : v),
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
  meat: [
    {
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
    },
  ],
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
  fruits: [
    {
      //   name:{
      type: String,
      enum: [
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
      //     },
      // frequency: {
      //   type: String,
      //   enum: [
      //     "1",
      //     "Between 1-2",
      //     "Between 2-3",
      //     "Between 3-4",
      //     "Between 4-5",
      //     "Between 5-6",
      //     "Between 6-7",
      //     "Between 7-8",
      //     "Between 8-9",
      //     "Between 9-10",
      //     "Over 10",
      //   ],
      //   required: function () {
      //     return this.fruits[0] !== "None";
      //   },
      //   set: (v) => (v === "" ? undefined : v),
      // },
    },
  ],

  fruitUnitPerDay: {
    type: String,
    enum: [
      "None",
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
    default: "None",
    required: function () {
      return this.fruits[0] !== "None";
    },
    set: (v) => (v === "" ? undefined : v),
  },

  //customFruits: {
  //   type: {
  //     name: {
  //       type: String,
  //       required: function () {
  //         return (
  //           Array.isArray(this.fruits) &&
  //           this.fruits.some((item) => item.name === "Other")
  //         );
  //       },
  //     },
  //   },
  //   required: function () {
  //     return (
  //       Array.isArray(this.fruits) &&
  //       this.fruits.some((item) => item.name === "Other")
  //     );
  //   },
  // },

  customFruits: {
    type: String,
    required: function () {
      return this.fruits.includes("Other");
    },
  },

  vegetables: [
    {
      //name: {
      type: String,
      enum: [
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
    },
    // frequency: {
    //   type: String,
    //   enum: [
    //     "1",
    //     "Between 1-2",
    //     "Between 2-3",
    //     "Between 3-4",
    //     "Between 4-5",
    //     "Between 5-6",
    //     "Between 6-7",
    //     "Between 7-8",
    //     "Between 8-9",
    //     "Between 9-10",
    //     "Over 10",
    //   ],
    //   default: "None",
    //   required: function () {
    //     return this.vegetables[0] !== "None";
    //   },
    //   set: (v) => (v === "" ? undefined : v),
    // },

    // },
  ],

  vegetableUnitPerDay: {
    type: String,
    enum: [
      "None",
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
    default: "None",
    required: function () {
      return this.vegetables[0] !== "None";
    },
    set: (v) => (v === "" ? undefined : v),
  },

  // customVegetables: {
  //   type: {
  //     name: {
  //       type: String,
  //       required: function () {
  //         return (
  //           Array.isArray(this.vegetables) &&
  //           this.vegetables.some((item) => item.name === "Other")
  //         );
  //       },
  //     },
  //   },
  //   required: function () {
  //     return (
  //       Array.isArray(this.vegetables) &&
  //       this.vegetables.some((item) => item.name === "Other")
  //     );
  //   },
  // },

  customVegetables: {
    type: String,
    required: function () {
      return this.vegetables.includes("Other");
    },
  },

  religious: {
    type: String,
    enum: ["Prefer Not to say", "Muslim", "Christian", "Jewish", "Other"],
  },
  customReligious: {
    type: String,
    required: function () {
      return this.religious === "Other";
    },
  },
  fish: [
    {
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
    },
  ],
  customFish: {
    type: String,
    required: function () {
      return this.fish === "Other";
    },
  },
  dairy: [
    {
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
    },
  ],
  customDairy: {
    type: String,
    required: function () {
      return this.dairy === "Other";
    },
  },
  oil: [
    {
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
    },
  ],
  customOil: {
    type: String,
    required: function () {
      return this.oil === "Other";
    },
  },

  homeMade: [
    {
      name: {
        type: String,
        enum: [
          "None",
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
        required: true,
      },
      consumption: {
        type: String,
        enum: [
          "Every Day",
          "2-3 Times a Week",
          "1-2 Times a Week",
          "1-2 Times a Month",
          "Rarely",
          "Never",
        ],
        validate: {
          validator: function (value) {
            return this.name === "None" || value;
          },
          message:
            "Consumption is required unless 'None' is selected for food name.",
        },
      },
      budget: {
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
        validate: {
          validator: function (value) {
            return this.name === "None" || value;
          },
          message:
            "Budget is required unless 'None' is selected for food name.",
        },
      },
    },
  ],

  // customHomeMade: {
  //   type: {
  //     name: {
  //       type: String,
  //       required: function () {
  //         return this.homeMade.includes("Other");
  //       },
  //     },
  //   },
  //   required: function () {
  //     return this.homeMade.includes("Other");
  //   },
  // },

  customHomeMade: {
    type: {
      name: {
        type: String,
        required: function () {
          // Ensure homeMade is defined and includes 'Other'
          return (
            Array.isArray(this.homeMade) &&
            this.homeMade.some((item) => item.name === "Other")
          );
        },
      },
    },
    required: function () {
      // Ensure homeMade is defined and includes 'Other'
      return (
        Array.isArray(this.homeMade) &&
        this.homeMade.some((item) => item.name === "Other")
      );
    },
  },

  ordered: [
    {
      name: {
        type: String,
        enum: [
          "None",
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
        required: true,
      },
      consumption: {
        type: String,
        enum: [
          "Every Day",
          "2-3 Times a Week",
          "1-2 Times a Week",
          "1-2 Times a Month",
          "Rarely",
          "Never",
        ],
        validate: {
          validator: function (value) {
            return this.name !== "None" || value;
          },
          message:
            "Consumption is required unless 'None' is selected for food name.",
        },
      },
      budget: {
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
        validate: {
          validator: function (value) {
            return this.name !== "None" || value;
          },
          message:
            "Budget is required unless 'None' is selected for food name.",
        },
      },
    },
  ],

  customOrdered: {
    type: {
      name: {
        type: String,
        required: function () {
          // Ensure ordered is defined and includes 'Other'
          return (
            Array.isArray(this.ordered) &&
            this.ordered.some((item) => item.name === "Other")
          );
        },
      },
    },
    required: function () {
      // Ensure ordered is defined and includes 'Other'
      return (
        Array.isArray(this.ordered) &&
        this.ordered.some((item) => item.name === "Other")
      );
    },
  },

  // customOrdered: {
  //   type: {
  //     name: {
  //       type: String,
  //       required: function () {
  //         return this.ordered.includes("Other");
  //       },
  //     },
  //   },
  //   required: function () {
  //     return this.ordered.includes("Other");
  //   },
  // },

  // homeMade: [
  //   {
  //     type: String,
  //     enum: [
  //       "Home Made Pizza",
  //       "Shakshouka",
  //       "Couscous",
  //       "Moroccan Tagine",
  //       "Musakhan",
  //       "Harira",
  //       "Horiatiki (Greek salad)",
  //       "Moussaka",
  //       "Spanakopita",
  //       "Melomakarono",
  //       "Manti",
  //       "Borek",
  //       "Kofte",
  //       "Risotto",
  //       "Timballo",
  //       "Polenta",
  //       "Baba Ghanoush",
  //       "Hummus",
  //       "Other",
  //     ],
  //   },
  // ],
  // customHomeMade: {
  //   type: String,
  //   required: function () {
  //     return this.HomeMade === "Other";
  //   },
  // },
  // homeMadeConsumption: {
  //   type: String,
  //   enum: [
  //     "Every Day",
  //     "2-3 Times a Week",
  //     "1-2 Times a Week",
  //     "1-2 Times a Month",
  //     "Rarely",
  //     "Never",
  //   ],
  // },
  // homeMadeConsumtionBudget: {
  //   type: String,
  //   enum: [
  //     "Less than 100",
  //     "100-200",
  //     "200-300",
  //     "300-400",
  //     "400-500",
  //     "500-600",
  //     "600-700",
  //     "700-800",
  //     "800-900",
  //     "900-1000",
  //     "More than 1000",
  //   ],
  // },
  // ordered: [
  //   {
  //     type: String,
  //     enum: [
  //       "Pizza",
  //       "Sandwiches",
  //       "Burgers",
  //       "Wraps",
  //       "Paninis",
  //       "Mlewi",
  //       "Chappati",
  //       "Manakish",
  //       "Lahmacun",
  //       "Koshari",
  //       "Other",
  //     ],
  //   },
  // ],
  // customOrdered: {
  //   type: String,
  //   required: function () {
  //     return this.Ordered === "Other";
  //   },
  // },
  // orderedConsumption: {
  //   type: String,
  //   enum: [
  //     "Every Day",
  //     "2-3 Times a Week",
  //     "1-2 Times a Week",
  //     "1-2 Times a Month",
  //     "Rarely",
  //     "Never",
  //   ],
  // },
  // orderedConsumptionBudget: {
  //   type: String,
  //   enum: [
  //     "Less than 100",
  //     "100-200",
  //     "200-300",
  //     "300-400",
  //     "400-500",
  //     "500-600",
  //     "600-700",
  //     "700-800",
  //     "800-900",
  //     "900-1000",
  //     "More than 1000",
  // ],
  // },

  traditionalEatingHabits: { type: Boolean },

  newEatingHabits: { type: Boolean },

  medicalHistory: [
    {
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
  ],

  medicalHistoryCustom: {
    type: String,
    required: function () {
      return this.medicalHistory === "Other";
    },
  },

  physicalActivity: { type: String, enum: ["yes", "no"] },
});

surveySchema.pre("validate", function (next) {
  if (!this.state) {
    return next(new Error("State is required"));
  }
  if (this.state && !getVillesForState(this.state).includes(this.ville)) {
    return next(
      new Error(`Invalid ville: ${this.ville} for state: ${this.state}`)
    );
  }
  if (this.ville && !getCountriesForVille(this.ville).includes(this.country)) {
    return next(
      new Error(`Invalid country: ${this.country} for ville: ${this.ville}`)
    );
  }
  next();
});

surveySchema.pre("save", function (next) {
  if (this.homeMade.includes("Other") && this.customHomeMade) {
    this.customHomeMade.consumption = this.consumption;
    this.customHomeMade.budget = this.budget;
  }

  if (this.ordered.includes("Other") && this.customOrdered) {
    this.customOrdered.consumption = this.orderedConsumption;
    this.customOrdered.budget = this.orderedBudget;
  }

  next();
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
  homeMade: "text",
  ordered: "text",
  medicalHistory: "text",
  physicalActivity: "text",
});

module.exports = mongoose.model("Survey", surveySchema);
