const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: String, // String is shorthand for {type: String}
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, required: true },
  attendance: [
    {
      name: String,
      date: String,
      status: String,
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("user", userSchema);
