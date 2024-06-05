const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const leaveRequestSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = model("LeaveRequest", leaveRequestSchema);
