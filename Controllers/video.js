import videoFiles from "../Models/videoFiles.js";

export const uploadVideo = async (req, res, next) => {
  const { body, file } = req;
  if (req.file === undefined)
    res.status(404).json({ message: "please upload the file" });
  else
    try {
      const File = new videoFiles({
        videoTitle: req.body.title,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        videoChannel: req.body.chanel,
        Uploader: req.body.uploader,
      });
      await File.save();
      res.status(201).send("file Uploade successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
}; 
 
export const getALLVideos = async (req, res) => {
  try {
    const files = await videoFiles.find();
    res.status(200).send(files); 
  } catch (error) {
    res.status(400).send(error.message);
  }
};
 