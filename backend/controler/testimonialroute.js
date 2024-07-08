const express = require("express");
const route = express.Router();
const TestimonialControler = require("../controler/testimonialcotroler");



route.get("/testimonialget", TestimonialControler.get);
route.post("/testimonialpost", TestimonialControler.post);
route.put("/testimonialpost/:id", TestimonialControler.edit);
route.get("/testimonialpost", TestimonialControler.get);
route.get("/testimonialpost/:id", TestimonialControler.getbyid);
route.delete("/testimonialpost/:id", TestimonialControler.del);

module.exports = route;