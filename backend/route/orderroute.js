const express = require("express");
const route = express.Router();
const OrderControler = require("../controler/ordercontroler");



route.get("/orderget", OrderControler.get);
route.post("/orderpost", OrderControler.post);
route.put("/orderpost/:id", OrderControler.edit);
route.get("/orderpost/:id", OrderControler.getbyid);
route.delete("/orderpost/:id", OrderControler.del);

module.exports = route;