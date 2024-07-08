const express = require("express");
const route = express.Router();
const FaqsControler = require("../controler/faqscontroler");



route.get("/faqsget", FaqsControler.get);
route.post("/faqspost", FaqsControler.post);
route.put("/faqspost/:id", FaqsControler.edit);
route.get("/faqspost/:id", FaqsControler.getbyid);
route.delete("/faqspost/:id", FaqsControler.del);

module.exports = route;