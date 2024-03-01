import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import pizzaRouter from "./router/pizza.router.js";
import usersRourter from "./router/users.router.js";

import { MongoClient } from "mongodb";
const app = express();

const PORT = process.env.PORT;
//
const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected !!!  ");

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "https://capstone-node.vercel.app"
    
  })
);
app.use("/", pizzaRouter);
app.use("/", usersRourter);

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩 pizza app");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
