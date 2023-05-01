import express from "express";
import { getPizzas, createPizza } from "../service/pizza.service.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.get("/pizzalist",auth, async function (request, response) {
  try{
    const pizzalist = await getPizzas();
    response.send(pizzalist);
  }catch(err){
    response.status(401).send({message:err});
  }

});
router.post("/createpizza", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await createPizza(data);
  response.send(result);
});
// router.post("/payments", async function (request, response) {
//   try{
//     const {total,token} = request.body;
  
//   response.status(200).send({message:"Order Successfully"});

//   }catch(err){
//     console.log(err.message);
//     response.status(400).send({message:"payment not found"});
//   }
// });
export default router;
