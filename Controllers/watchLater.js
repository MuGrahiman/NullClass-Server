import watchLater from "../Models/watchLater.js";

export const watchLaterController = async (req, res) => {
  const watchLaterData = req.body;
  const addTowatchLater = new watchLater(watchLaterData);
  try {
    await addTowatchLater.save();
    res.status(200).json("added to liked Video");
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getAllwatchLaterController = async (req, res) => {
  try {
    const files = await watchLater.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deletewatchLaterController = async (req, res) => {
  const { videoId, Viewer } = req.params;
  try {
    
    await watchLater.findOneAndDelete({
      videoId: videoId,
      Viewer: Viewer,
    });
 
    res.status(200).json({ message: "removed from watch later" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
