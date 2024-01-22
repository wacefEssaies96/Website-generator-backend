const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Your firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Your lastname is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  googleId: String,
  secret: String,
  role: String
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);