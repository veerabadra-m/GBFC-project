
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    interest: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Completed"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
