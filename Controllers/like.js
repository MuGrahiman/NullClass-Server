import mongoose from "mongoose";
import videoFiles from "../Models/videoFiles.js";

export const likeController = async (req, res) => {
  const { id: _id } = req.params;
  const { Like } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("data is unavailable");

  try {
    const updateLike = await videoFiles.findByIdAndUpdate(_id, {
      $set: { Like: Like },
    });
    res.status(200).json(updateLike);
  } catch (error) {
    res.status(400).json('error : ',error);
  }
};
