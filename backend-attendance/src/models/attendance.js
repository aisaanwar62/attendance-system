const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true }, // present, absent, etc.
});

module.exports = mongoose.model("Attendance", attendanceSchema);
