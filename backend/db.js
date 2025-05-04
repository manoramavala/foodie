const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");

    const db = mongoose.connection.db;

    // Fetch food_items
    const foodItemsData = await db.collection("food_items").find({}).toArray();

    // Fetch foodCategory
    const foodCategoryData = await db
      .collection("foodCategory")
      .find({})
      .toArray();

    // Set to global
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    // Optional: Log to confirm
    console.log("Food Items:", global.food_items);
    console.log("Food Categories:", global.foodCategory);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = mongoDB;
