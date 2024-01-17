const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

app.post("/recipes", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error("Error while creating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipeList = await Recipe.find();
    res.json(recipeList);
  } catch (error) {
    console.error("Error while retrieving recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/recipes/:recipeId", async (req, res) => {
  try {
    const id = req.params.recipeId;
    const recipe = await Recipe.findById(id);
    res.json(recipe);
  } catch (error) {
    console.error("Error while retrieving recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/recipes/:recipeId", async (req, res) => {
  try {
    const id = req.params.recipeId;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error while updating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const id = req.params.recipeId;
    await Recipe.findByIdAndDelete(id);
    res.status(200).send();
  } catch (error) {
    console.error("Error while deleting recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("My first app listening on port 3000!"));

module.exports = app;
