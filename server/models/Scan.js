import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    ingredientAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    nutrition: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    healthScore: {
      type: Number,
      default: null,
    },
    verdict: {
      type: String,
      default: "",
    },
    safetyStatus: {
      type: String,
      default: "",
    },
    safetyReasons: {
      type: [String],
      default: [],
    },
    allergens: {
      type: [String],
      default: [],
    },
    restrictedIngredients: {
      type: [String],
      default: [],
    },
    tips: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Scan = mongoose.model("Scan", scanSchema);

export default Scan;