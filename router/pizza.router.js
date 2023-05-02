import express from "express";
import { getPizzas, createPizza } from "../service/pizza.service.js";
import { auth } from "../middleware/auth.js";
import { uuid } from "uuidv4";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51N2wUgSGE96adayZFAUisue5k9qzp6CVmJksFjUdBjqPf0v2aLtl3fciAy411XRIcIi67BSgeAYVke0PP1kQoWsy00ZjzDa0Gg"
);
const router = express.Router();
router.get("/pizzalist", auth, async function (request, response) {
  try {
    const pizzalist = await getPizzas();
    response.send(pizzalist);
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
  try {
    const { item, totalPrice, token } = request.body;
    const transcationKey = uuid();

    const customer = await stripe.customers
      .create({
        email: "token.email",
        source: token.id,
      })
      .then((customer) => {
        chargs.create({
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
