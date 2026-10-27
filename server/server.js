
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import Enquiry from "./models/Enquiry.js";
import { sendOwnerEmail } from "./emailService.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "10kb" }));

// Check that the backend is running
app.get("/", (req, res) => {
  res.json({ message: "GBFC backend is running!" });
});

// Submit a membership enquiry

app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, contact, interest, message } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof contact !== "string" ||
      !contact.trim()
    ) {
      return res.status(400).json({
        message: "Name and contact details are required.",
      });
    }

    // Save the enquiry in MongoDB first
    const enquiry = await Enquiry.create({
      name: name.trim(),
      contact: contact.trim(),
      interest:
        typeof interest === "string" ? interest.trim() : "",
      message:
        typeof message === "string" ? message.trim() : "",
    });

    console.log(
      "Enquiry saved. Attempting to send owner email..."
    );

    // Email failure should not undo the saved enquiry
    try {
      const result = await sendOwnerEmail({
        name: enquiry.name,
        contact: enquiry.contact,
      });

      console.log("Owner email notification sent successfully.");
      console.log("Email message ID:", result.messageId);
    } catch (emailError) {
      console.error(
        "Email notification failed:",
        emailError.message
      );
    }

    return res.status(201).json({
      message: "Enquiry submitted successfully!",
      enquiry: {
        id: enquiry._id,
        name: enquiry.name,
        contact: enquiry.contact,
        message: enquiry.message,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("Enquiry submission failed:", error);

    return res.status(500).json({
      message: "Failed to save enquiry.",
    });
  }
});

// View enquiries during local development

if (process.env.NODE_ENV !== "production") {
  app.get("/api/enquiries", async (req, res) => {
    try {
      const enquiries = await Enquiry.find()
        .sort({ createdAt: -1 })
        .select("-__v");

      return res.json(enquiries);
    } catch (error) {
      console.error("Could not fetch enquiries:", error);

      return res.status(500).json({
        message: "Failed to retrieve enquiries.",
      });
    }
  });
}


// Start only after MongoDB connects
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`GBFC backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
}

startServer();