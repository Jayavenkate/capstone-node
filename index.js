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
app.use(cors());
app.use("/", pizzaRouter);
app.use("/", usersRourter);
// const pizzalist = [
//     {
//       name: "Pepper Barbecue Chicken",
//       prices: 350,

//       image: "https://www.dominos.co.in//files/items/Pepper_Barbeque_&_Onion.jpg",
//       description: "Pepper Barbecue Chicken I Cheese",
//     },
//     {
//       name: "Non Veg Supreme",

//       prices: 400,

//       image:
//         "https://www.dominos.co.in/theme2/front/images/menu-images/my-nonveg.webp",
//       description:
//         "The supreme pizza is traditionally topped with pepperoni, sausage, meatballs, mushrooms, green bell peppers, and onions. But not all of them are the same and some restaurants make theirs slightly different.",
//     },
//     {
//       name: "Golden Corn Pizza",

//       prices: 350,

//       image: "https://www.dominos.co.in//files/items/Corn_&_Cheese.jpg",
//       description:
//         "Regardless of how you're preparing it, corn adds a fresh, sweet crunch to mealtime that just can't be replicated by anything else. And it's that inimitable burst of crunchy sweetness that makes corn the perfect pizza topping too",
//     },
//     {
//       name: " Red Paprika Pizza",

//       prices: 200,

//       image: "https://www.dominos.co.in//files/items/5_Pepper.jpg",
//       description:
//         "Fresh, tender and deep red color ideal for grilled and roasted cuisines to enhance the extra punch in veg and non veg food. Red paprika is used on pizzas, sandwiches, wraps, etc, it is wonderful on nachos, crackers with cheese and for making chilly cheese toast.",
//     },
//     {
//       name: "Margerita",

//       prices: 400,

//       image:
//         "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza.jpg",
//       description:
//         "Pizza Margherita (pronounced mahr-geh-ree-tah) is basically a Neapolitan pizza, typically made with tomatoes, mozzarella cheese, garlic, fresh basil, and extra-virgin olive oil. I think of it as a sophisticated version of your basic cheese pizza and also a wonderful Caprese salad, but with a crust.",
//     },
//     {
//       name: " Cheese Margerita Pizza ",

//       prices: 350,

//       image:
//         "https://www.dominos.co.in//files/items/Double_Cheese_Margherita.jpg",
//       description:
//         "Our double cheese pizza comes with the goodness of extra cheese. You can see oodles of liquid cheese coming out with every bite, making the pizza all the more delicious.",
//     },
//     {
//       name: " Pepperoni ",

//       prices: 450,

//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTHEEdwoBf83QnlIkJlBLrmqGyOr-yZKobQ&usqp=CAU",
//       description:
//         "Traditional pepperoni pizza is made with pizza sauce, mozzarella cheese, and pepperoni.",
//     },
//     {
//       name: " Hawaiian ",

//       prices: 450,

//       image:
//         "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2020-03/hawaiian-pizza.jpg?itok=a1-_QjRA",
//       description:
//         "Traditional pepperoni pizza is made with pizza sauce, mozzarella cheese, and pepperoni.",
//     },
//     {
//       name: " Meat Lovers ",

//       prices: 450,

//       image:
//         "https://emeals-menubuilder.s3.amazonaws.com/v1/recipes/781180/pictures/large_meat-lovers-pizza.jpeg",
//       description:
//         "Traditional pepperoni pizza is made with pizza sauce, mozzarella cheese, and pepperoni.",
//     },
//     {
//       name: " Vegetarian ",

//       prices: 450,

//       image:
//         "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Whole-Wheat-Veggie-Pizza_EXPS_HCKA19_12558_C10_13_5b.jpg",
//       description:
//         "Traditional pepperoni pizza is made with pizza sauce, mozzarella cheese, and pepperoni.",
//     },
//     {
//       name: " Buffalo Chicken ",

//       prices: 450,

//       image:
//         "https://easychickenrecipes.com/wp-content/uploads/2019/11/buffalo-chicken-pizza-4.jpg",
//       description:
//         "Divide sauced chicken, torn mozzarella, blue cheese, and red onion evenly between the pizzas. Step 5Bake pizzas until crust is golden and cheese is melty, 15 to 17 minutes. Garnish with green onions and a drizzle of hot sauce (if using) and serve immediately",
//     },
//     {
//       name: " Spinach and Feta ",

//       prices: 450,

//       image:
//         "https://thelittlestcrumb.com/wp-content/uploads/spinach-and-feta-pizza-featured-image.jpg",
//       description:
//         "Domino's includes feta cheese on several of its Specialty Pizzas, including the popular Spinach & Feta Pizza, which features spinach and onions topped with feta. The Pacific Veggie features roasted red peppers, onions, spinach, mushrooms, tomatoes, olives, mozzarella, and feta",
//     },
//     {
//       name: " Four Cheese ",

//       prices: 450,

//       image:
//         "https://www.insidetherustickitchen.com/wp-content/uploads/2020/07/Quattro-formaggi-pizza-square-Inside-the-rustic-kitchen.jpg",
//       description:
//         "For the four cheese topping you'll need; tomato sauce, mozzarella, gorgonzola, Parmigiano Reggiano, and goat cheese. You can replace the cheese with any of your favourite cheeses but I'd say that mozzarella is pretty important",
//     },
//   ];
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

//generate hashed password
