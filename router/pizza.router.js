import express from "express";
import { getPizzas, createPizza } from "../service/pizza.service.js";
import { uuid } from "uuidv4";
import Stripe from "stripe";
const stripe = new Stripe(process.env.stripe_key);
const router = express.Router();
router.get("/pizzalist", async function (request, response) {
  try {
    const pizzalist = await getPizzas();
    response.send(pizzalist);
    // response.status(200).send({ message: "pizzalist successfully" });
  } catch (err) {
    response.status(401).send({ message: err });
  }
});
router.post("/createpizza", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await createPizza(data);
  response.send(result);
});
router.post("/payments", async function (request, response) {
  // console.log(request.body);
  // response.status(200).send({ message: "payment successfully" });
  try {
    const { item, totalPrice, token } = request.body;
    const transcationKey = uuid();

    const customer = await stripe.customers
      .create({
        email: "token.email",
        source: token.id,
      })
      .then((customer) => {
        charges.create({
          amount: totalPrice,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: item.name,
        });

        response.status(200).send({ message: "payment successfully" });
      });
  } catch (err) {
    console.log(err.message);
    response.status(400).send({ message: "payment not found" });
  }
});

export default router;
