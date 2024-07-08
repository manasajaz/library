const express = require("express");
const route = express.Router();
const AuthControler = require("../controler/authcontroler");



route.post("/login", AuthControler.login,);

route.post("/signup", AuthControler.signup,);

route.put("/signup/:id", AuthControler.protected, AuthControler.edit);

route.get("/signup", AuthControler.protected, AuthControler.get);

route.get("/signup/:id", AuthControler.protected, AuthControler.getbyid);

route.delete("/signup/:id", AuthControler.protected, AuthControler.del);

module.exports = route;