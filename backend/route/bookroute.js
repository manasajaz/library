const express = require("express");
const route = express.Router();
const BookControler = require("../controler/bookcontroler");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


route.get("/bookget", BookControler.get);
route.post("/bookpost", upload.single('image'), BookControler.post);
route.put("/bookpost/:id", upload.single('image'), BookControler.edit);
route.get("/bookpost/:id", BookControler.getbyid);
route.delete("/bookpost/:id", BookControler.del);

module.exports = route;