import users from "../Models/auth.js";
import sendEmailNotification from "../Middleware/mailer.js";
import { Bcrypt, Encrypt, tokenCreator } from "../Helpers/authHelpers.js";

export const login = async (req, res) => {
  console.log(req.body);
  const { email, id, gmail } = req.body;
  console.log(gmail);
  if (!email || !id)
    return res.status(404).json({ message: "Invalid Credentials" });

  try {
    const existUser = await users.findOne({ email });
    if (!existUser) {
      try {
        const { newUser, token } = await handleUserCreation(email, id, gmail);
        console.log(newUser, token);
        res.status(200).json({ result: newUser, token });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong ..." });
      }
    } else {
      if (existUser && existUser.isBlocked)
        return res
          .status(404)
          .json({ message: "You are blocked by the server" });
      if (!existUser.gmail) {
        const { newUser, token } = await handleUserCreation(email, id, gmail);
        return res.status(200).json({ result: newUser, token });
      }
      if (!existUser.id) {
        const { newUser, token } = await handleUserCreation(email, id, gmail);
        return res.status(200).json({ result: newUser, token });
      }

      const encryptedID = await handleUserChecking(existUser, id, gmail);
      console.log(encryptedID);
      if (existUser && encryptedID) {
        existUser.loginAttempts = 0;
        await existUser.save();
        const token = await tokenCreator(existUser);

        res.status(200).json({ result: existUser, token });
      } else {
        await handleFailedLogin(existUser);
        res.status(404).json({ message: "Incorrect username or password" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong ..." });
  }
};

const handleUserCreation = async (email, id, gmail) => {
  let newUser;
  try {
    const existUser = await users.findOne({ email });
    const bcryptId = await Bcrypt(id);
    if (!existUser)
      if (gmail) newUser = await users.create({ email, gmail: bcryptId });
      else newUser = await users.create({ email, id: bcryptId });
    else {
      if (!existUser.gmail) existUser.gmail = bcryptId;
      if (!existUser.id) existUser.id = bcryptId;

      newUser = await existUser.save();
    }
    const token = await tokenCreator(newUser);

    return { newUser, token };
  } catch (error) {
    res.status(500).json({ message: "Something went wrong ..." });
  }
};

const handleUserChecking = async (existUser, id, gmail) => {
  let encryptedID;
  try {
    console.log("in the handle user creation", existUser, id, gmail);
    if (gmail) encryptedID = await Encrypt(id, existUser.gmail);
    else encryptedID = await Encrypt(id, existUser.id);
    console.log(encryptedID, "encryptedID");
    return encryptedID;
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
