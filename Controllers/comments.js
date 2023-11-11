import mongoose from "mongoose";
import comment from "../Models/comments.js";

export const getComment = async (req, res) => {
  try {
    const commentList = await comment.find();
    res.status(200).send(commentList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const postComment = async (req, res) => {
  const commentData = req.body;
  const postcomment = new comment(commentData);
  try {
    await postcomment.save();
    res.status(200).json("posted the comment");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const editComment = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("data is unavailable");

  const { commentBody } = req.body;
  try {
    const updateData = await comment.findByIdAndUpdate(_id, {
      $set: {
        commentBody,
      },
    });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("data is unavailable");

  try {
    await comment.findByIdAndRemove(_id);
    res.status(200).json({ message: "deleted comment" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
