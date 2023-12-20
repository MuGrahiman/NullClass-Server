import { tokenChecker } from "../Helpers/authHelpers.js";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = await tokenChecker(token);
    req.userId = decodeData?.id;
    next();
  } catch (error) {
    res.status(400).json("Invalid Creadentials");
  }
};
export default auth;
