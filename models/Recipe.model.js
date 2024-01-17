const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: { type: String, requied: true, unique: true },
  instructions: { type: String, requied: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateru Chef", "Ultra Pro Chef"],
  },
  ingridients: { type: [String] },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },
  isArchived: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
