const mongoose = require("mongoose");

const gradeSettingSchema = new mongoose.Schema({
  days: { type: Number, required: true },
  grade: { type: String, required: true },
});

module.exports = mongoose.model("GradeSetting", gradeSettingSchema);
