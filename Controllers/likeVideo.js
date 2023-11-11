import likedVideo from "../Models/likedVideo.js";

export const likeVideoController = async (req, res) => {
  const likedVideoData = req.body;
  const addToLikedVideo = new likedVideo(likedVideoData);
  try {
    await addToLikedVideo.save();
    res.status(200).json("added to liked Video");
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getAllLikeVideoController = async (req, res) => {
  try {
    const files = await likedVideo.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteLikeVideoController = async (req, res) => {
  const { videoId, Viewer } = req.params;
  try {
    
    await likedVideo.findOneAndDelete({
      videoId: videoId,
      Viewer: Viewer,
    });
 
    res.status(200).json({ message: "removed from Liked Videos" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
 