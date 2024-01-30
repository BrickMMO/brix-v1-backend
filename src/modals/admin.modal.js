const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 200,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 200,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;