const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://duginisaisharan:Sharan2005@cluster0.h4tlhz1.mongodb.net/Chatbot?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

module.exports = mongoDB;
