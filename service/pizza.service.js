import { client } from "../index.js";

export async function createPizza(data) {
  return await client.db("b42wd2").collection("food").insertMany(data);
}
export async function getPizzas() {
  return await client.db("b42wd2").collection("food").find({}).toArray();
}
export async function createPayment(data) {
  return await client.db("b42wd2").collection("order").insertMany(data);
}