const express = require("express");
const route = express.Router();
const UserControler = require("../controler/usercontroler");



route.post("/login", UserControler.login,);

route.post("/signup", UserControler.signup,);

route.put("/signup/:id", UserControler.edit);

route.get("/signup", UserControler.get);

route.get("/signup/:id", UserControler.getbyid);

route.delete("/signup/:id", UserControler.del);

module.exports = route;