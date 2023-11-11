import mongoose from "mongoose";
import users from "../Models/auth.js";

export const updateChanelData = async (req, res) => {
  const { id: _id } = req.params;
  const { name, desc } = req.body;
  console.log(req.params, req.body, name, desc);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Channel UnAvailable...");

  try {
    const updateData = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          desc,
        },
      },
      { new: true }
    );
    console.log(updateData);
    res.status(200).json(updateData);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const getAllChanels = async (req, res) => {
  const allChanelDetails = [];
  try {
    const allChanels = await users.find();
    allChanels.forEach((chanel) => {
      allChanelDetails.push({
        _id: chanel._id,
        name: chanel.name,
        desc: chanel.desc,
        email: chanel.email,
      });
    });
    res.status(200).json(allChanelDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
