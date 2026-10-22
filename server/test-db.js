
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function testConnection() {
  try {
    console.log("Testing MongoDB Atlas connection...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("SUCCESS: MongoDB Atlas connected!");
  } catch (error) {
    console.error("CONNECTION FAILED:");
    console.error(error.message);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

testConnection();
