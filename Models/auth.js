import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  gmail: { type: String },
  id: { type: String },
  name: { type: String },
  desc: { type: String },
  joinedOn: {
    type: Date,
    default: Date.now(),
  },
  loginAttempts: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false },
  blockedAt: Date,
});

export default mongoose.model("User", userSchema);
