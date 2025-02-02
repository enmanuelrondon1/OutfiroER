import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Establish connection to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;