const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  date: { type: mongoose.SchemaTypes.Date },
  status: { type: String, enum: ["active", "passed", "canceled"] },
  time: { type: String },
  course: { type: String, enum: ["Academic English", "SAT", "IELTS"] },
  teacher: { type: String },
  cancelReason: { type: String },
})

module.exports = mongoose.model("booking", bookingSchema)