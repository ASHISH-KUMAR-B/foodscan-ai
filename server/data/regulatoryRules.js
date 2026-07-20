export const REGULATORY_RULES = {
  IN: {
    name: "India (FSSAI)",
    bannedAdditives: [
      { code: "ins 924", name: "Potassium Bromate" },
      { code: "azodicarbonamide", name: "Azodicarbonamide" },
    ],
    restrictedAdditives: [
      { code: "ins 127", name: "Erythrosine", note: "Restricted to specific food categories" },
    ],
    dailyLimits: {
      sodium: 2000, // mg/day
      sugar: 25,    // g/day (free sugar)
      fat: 70,      // g/day
    },
  },
  US: {
    name: "United States (FDA)",
    bannedAdditives: [
      { code: "partially hydrogenated oil", name: "Partially Hydrogenated Oils (Trans Fat)" },
      { code: "red 3", name: "Red Dye No. 3" },
    ],
    restrictedAdditives: [],
    dailyLimits: {
      sodium: 2300,
      sugar: 50,
      fat: 78,
    },
  },
  EU: {
    name: "European Union (EFSA)",
    bannedAdditives: [
      { code: "ins 171", name: "Titanium Dioxide (E171)" },
      { code: "ins 924", name: "Potassium Bromate" },
    ],
    restrictedAdditives: [
      { code: "ins 102", name: "Tartrazine (E102)", note: "Requires child-attention warning label" },
      { code: "ins 104", name: "Quinoline Yellow (E104)", note: "Requires child-attention warning label" },
      { code: "ins 110", name: "Sunset Yellow (E110)", note: "Requires child-attention warning label" },
      { code: "ins 122", name: "Carmoisine (E122)", note: "Requires child-attention warning label" },
      { code: "ins 124", name: "Ponceau 4R (E124)", note: "Requires child-attention warning label" },
      { code: "ins 129", name: "Allura Red (E129)", note: "Requires child-attention warning label" },
    ],
    dailyLimits: {
      sodium: 2000,
      sugar: 30,
      fat: 70,
    },
  },
};