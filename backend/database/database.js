import mongoose from "mongoose";
import { config } from "dotenv";

// Load dotenv only if variables are still undefined
if (!process.env.DB_URI) {
  config({ path: "./backend/config/config.env" });
}

const DB_URI = process.env.DB_URI;

const connectToDB = async () => {
  const result = await mongoose.connect(DB_URI);
  console.info(`Connected to DB: ${result.connection.host}`);
};

export default connectToDB;
