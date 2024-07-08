const express = require("express");
const route = express.Router();
const AboutControler = require("../controler/aboutcontroler");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


route.get("/aboutget", AboutControler.get);
route.post("/aboutpost", upload.single('image'), AboutControler.post);
route.put("/aboutpost/:id", upload.single('image'), AboutControler.edit);
route.get("/aboutpost/:id", AboutControler.getbyid);
route.delete("/aboutpost/:id", AboutControler.del);

module.exports = route;