import History from "../Models/History.js";

export const HistoryController = async (req, res) => {
  const HistoryData = req.body;
  const addToHistory = new History(HistoryData);
  try {
    await addToHistory.save();
    res.status(200).json("added to liked Video");
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getAllHistoryController = async (req, res) => {
  try {
    const files = await History.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const deleteHistoryController = async (req, res) => {
  const { videoId, Viewer } = req.params;
  try {
    
    await History.findOneAndDelete({
      videoId: videoId,
      Viewer: Viewer,
    });
 
    res.status(200).json({ message: "removed from History Videos" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteAllHistoryController = async (req, res) => {
  const { userId } = req.params;
  try {
    await History.deleteMany({
      Viewer: userId,
    });

    res.status(200).json({ message: "removed from history" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
