import express from "express";
import { createUsers, getUserByName } from "../service/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

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
    // else if (password.length < 8) {
    //     response
    //       .status(400)
    //       .send({ message: "Password must be at least 8 characters" });
    //   }
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

export default router;
