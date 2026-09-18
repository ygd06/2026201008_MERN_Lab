const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/notes_db")
    .then(() => console.log("✅ MongoDB connected: mongodb://localhost:27017/notes_db"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));
};

module.exports = connectDB;
