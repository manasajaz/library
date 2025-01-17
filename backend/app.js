require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authroute = require("./route/authroute");
const bookroute = require("./route/bookroute");
const userroute = require("./route/userroute");
const faqsroute = require('./route/faqsroute');
const testimonialroute = require('./route/testimonialroute');
const aboutroute = require('./route/aboutroute');
const orderroute = require('./route/orderroute');
const blogsroute = require('./route/blogsroute');



const cors = require("cors")
const App = express();


App.use(express.json());
App.use(cors(
// {
  //   origin: ["https://library-frontend-ten-blue.vercel.app"],
  //   methods: ["POST", "GET", "PUT", "DELETE"],
  //   credentials: true
  // }
));

App.use("/auth", authroute);
App.use("/", bookroute);
App.use("/", userroute);
App.use("/", faqsroute);
App.use("/", testimonialroute);
App.use("/", aboutroute);
App.use("/", orderroute);
App.use("/", blogsroute);

App.get("/", (req, res) => {
  res.json("aa")

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    App.listen(process.env.PORT, () => {
      console.log(
        `Database Connected and server is listening http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
