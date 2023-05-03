import express from "express";
import { createUsers, getUserByName,updateOtp ,getOtp,deleteOtp,updatePassword} from "../service/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const router = express.Router();
import { client } from "../index.js";

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

router.post("/signup", async function (request, response) {
  try {
    const { name, email, password } = request.body;
    const userFromDb = await getUserByName(email);
    console.log(userFromDb);
    if (userFromDb) {
      response.status(401).send({ message: "email already exists" });
    }
    else if (password.length < 8) {
        response
          .status(400)
          .send({ message: "Password must be at least 8 characters" });
      }
    else {
      const hashedPassword = await generateHashedPassword(password);
      const result = await createUsers({
        name: name,
        email: email,
        password: hashedPassword,
      });
      response.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async function (request, response) {
  try {
    const { email, password } = request.body;
    const userFromDb = await getUserByName(email);
    console.log(userFromDb);
    if (!userFromDb) {
      response.status(401).send({ message: "Invalid credentials" });
    } else {
      const storedDBPassword = userFromDb.password;
      const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
      console.log(isPasswordCheck);
      if (isPasswordCheck) {
        const token = jwt.sign({ id: userFromDb._id }, process.env.SECRET_KEY);
        response
          .status(200)
          .send({ message: "successful login", token: token });
      } else {
        response.status(401).send({ message: "Invalid credentials" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/login/forgetpassword", async function (request, response) {
  const { email } = request.body;
  console.log(email);
  const userFromDb = await getUserByName(email);
  if (!userFromDb) {
    response.status(401).send({ message: "Invalid credentials" });
  } else {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const setOtp = updateOtp(email, randomNumber);
    const mail = sendMail(email, randomNumber);
  }
  response.status(200).send({ message: "OTP sent successfully" });
});
router.post("/verifyotp",async function (request,response){
  const {OTP} = request.body;
  const otp = parseInt(OTP);
  const otpFromDB = await getOtp(otp);
  if(otpFromDB === null){
    response.status(401).send({ message: "Invalid OTP" });
  }else if(otpFromDB.OTP === otp){
    const deleteOtpDB = await deleteOtp(otp);
    response.status(200).send({ message: " OTP verified successfully" });
  }
})
router.post("/setpassword",express.json(),async function(request,response){
  try{
const{email,password} = request.body;
const userFromDb = await getUserByName(email);
if (!userFromDb) {
  response.status(401).send({ message: "Invalid credentials" });
}
else if (password.length < 8) {
      response
        .status(400)
        .send({ message: "Password must be at least 8 characters" });
    }
else{
  const hashedPassword = await generateHashedPassword(password);
      const result = await updatePassword(email,hashedPassword);
   response.send({message:"password changed successfully"});
}
  }catch(err){
    console.log(err);
  }
})
function sendMail(email, randomNumber) {
  const sender = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
  });
  const composeMail = {
    from: process.env.Email,
    to: email,
    subject: "OTP for Reset Password",
    text: `OTP Number : ${randomNumber}`,
  };
  sender.sendMail(composeMail, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email ${info.response}`);
    }
  });
}
export default router;
