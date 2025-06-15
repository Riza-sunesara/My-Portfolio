import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Certificate title Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  issueDate: {
    type: String,
    required: [true, "Issue Date is Required!"],
  },
  svg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const Certificate = mongoose.model(
  "Certificate",
  certificateSchema
);
