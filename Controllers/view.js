import mongoose from "mongoose";
import videoFiles from "../Models/videoFiles.js";

export const viewController = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("data is unavailable");

  try {
    const file = await videoFiles.findById(_id);
    const views = file.Views;
    const updateview = await videoFiles.findByIdAndUpdate(_id, {
      $set: { Views: views + 1 },
    });
    res.status(200).json(updateview);
  } catch (error) {
    res.status(400).json("error : ", error);
  }
};
