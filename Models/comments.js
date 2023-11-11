import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  videoId: { type: String },
  userId: { type: String },
  commentBody: { type: String },
  userCommented: { type: String },
  CommentOn: { type: Date, default: Date.now() },
});
export default mongoose.model("Comments", commentSchema);
