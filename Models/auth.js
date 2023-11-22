import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  id: { type: String, required: true },
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
