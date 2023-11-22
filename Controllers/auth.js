import Jwt from "jsonwebtoken";
import users from "../Models/auth.js";
import sendEmailNotification from "../Middleware/mailer.js";

export const login = async (req, res) => {
  console.log(req.body);
  const { email, id } = req.body;
  try {
    const existUser = await users.findOne({ email });
    if (!existUser) {
      try {
        const newUser = await users.create({ email, id });
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
      if (existUser && existUser.isBlocked) {
        res.status(404).json({ message: "You are blocked by the server" });
      } else {
        if (existUser && existUser.id === id) {
          existUser.loginAttempts = 0;
          await existUser.save();
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
        } else {
          await handleFailedLogin(existUser);
          res.status(404).json({ message: "Incorrect username or password" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong ..." });
  }
};

const handleFailedLogin = async (existUser) => {
  try {
    if (existUser.loginAttempts >= 5) {
      existUser.isBlocked = true;
      await existUser.save();

      sendEmailNotification(
        existUser.email,
        "Account blocked due to five consecutive  login attempts"
      );

      setTimeout(() => {
        existUser.isBlocked = false;
        existUser.loginAttempts = 0;
        existUser.save();
        sendEmailNotification(
          existUser.email,
          "Account unblocked after one hour"
        );
      }, 60000);
      return;
    } else if (existUser.loginAttempts === 3) {
      existUser.loginAttempts += 1;
      await existUser.save();
      await sendEmailNotification(
        existUser.email,
        "Three consecutive  login attempts"
      );
      return;
    } else {
      existUser.loginAttempts += 1;
      let updateduser = await existUser.save();
      return updateduser;
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong ..." });
  }
};
