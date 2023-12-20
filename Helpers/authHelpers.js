import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const tokenCreator = async (Data) =>
  await Jwt.sign(
    {
      email: Data.email,
      id: Data._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

export const tokenChecker = async (token) =>
  await Jwt.verify(token, process.env.JWT_SECRET);

export const Bcrypt = async (id) => await bcrypt.hash(id, 10);

export const Encrypt = async (id, mail) => await bcrypt.compare(id, mail);
