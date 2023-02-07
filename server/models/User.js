const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "admin"] }
})

module.exports = mongoose.model("user", userSchema)
