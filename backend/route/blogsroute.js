const express = require("express");
const route = express.Router();
const BlogControler = require("../controler/blogscontroler");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


route.get("/blogsget", BlogControler.get);
route.post("/blogspost", upload.single('image'), BlogControler.post);
route.put("/blogspost/:id", upload.single('image'), BlogControler.edit);
route.get("/blogspost/:id", BlogControler.getbyid);
route.delete("/blogspost/:id", BlogControler.del);

module.exports = route;