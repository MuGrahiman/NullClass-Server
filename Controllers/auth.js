import Jwt from "jsonwebtoken";
import users from "../Models/auth.js";
export const login = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    const existUser = await users.findOne({ email });
    if (!existUser) {
      try {
        const newUser = await users.create({ email });
        const token = Jwt.sign(
          {
            email: newUser.email,
            id: newUser._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ result: newUser, token });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong ..." });
      }
    } else {
      const token = Jwt.sign(
        {
          email: existUser.email,
          id: existUser._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ result: existUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong ..." });
}
}; 
