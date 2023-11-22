import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailNotification = async (email, message) => {
  try {
    const mailOption = {
      from: '"youtube" <youtube@gmail.com>',
      to: email,
      subject: "Security Alert",
      text: "Hello world?",
      html: `<b>${message}</b>`,
    };
    const info = await transporter.sendMail(mailOption);
    return info;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmailNotification;
