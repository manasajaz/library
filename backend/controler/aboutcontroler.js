const SendResponse = require("../helper/helper");
const AboutModel = require("../model/aboutmodel");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const BookControler = {

    get: async (req, res) => {
        try {

            let result = await AboutModel.find();
            res.status(200).send(SendResponse(true, "data get succesfully", result));
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    post: async (req, res) => {
        try {
            let { tittle, Short_Description, Description, image_1, image_2, image_3, cover_image } = req.body;
            let obj = { tittle, Short_Description, Description, image_1, image_2, image_3, cover_image };

            if (req.file) {
                const image_1 = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.image_1 = image_1;
            }
            if (req.file) {
                const image_2 = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.image_2 = image_2;
            }
            if (req.file) {
                const image_3 = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.image_3 = image_3;
            }
            if (req.file) {
                const cover_image = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.cover_image = cover_image;
            }


            let errorArray = [];

            if (!obj.tittle) {
                errorArray.push("required tittle");
            }



            if (errorArray.length > 0) {
                res
                    .status(400)
                    .send(SendResponse(false, "validation erroe", errorArray));
            } else {
                let Book = new AboutModel(obj);
                let result = await Book.save();

                res
                    .status(200)
                    .send(SendResponse(true, "book add successfully", result));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    del: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await AboutModel.findByIdAndDelete(id);

            if (result) {
                res
                    .status(200)
                    .send(SendResponse(true, "book deleted successfully", result));
            } else {
                res.status(400).send(SendResponse(true, "no data found", null));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    getbyid: async (req, res) => {
        try {
            let id = req.params.id;
            let user = await AboutModel.findById(id);
            if (user) {
                res.status(200).send(SendResponse(true, "single Book retrieved successfully", user));
            } else {
                res.status(400).send(SendResponse(false, "No Book found with this ID", null));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    edit: async (req, res) => {
        try {
            let id = req.params.id;
            let { tittle, Short_Description, Description, image_1, image_2, image_3, cover_image } = req.body;

            let updateData = {};
            if (tittle) updateData.tittle = tittle;
            if (Short_Description) updateData.Short_Description = Short_Description;
            if (Description) updateData.Description = Description;


            if (req.file) {
                const image_1 = req.file.buffer.toString('base64');
                updateData.image_1 = image_1;
            }
            if (req.file) {
                const image_2 = req.file.buffer.toString('base64');
                updateData.image_2 = image_2;
            }
            if (req.file) {
                const image_3 = req.file.buffer.toString('base64');
                updateData.image_3 = image_3;
            }
            if (req.file) {
                const cover_image = req.file.buffer.toString('base64');
                updateData.cover_image = cover_image;
            }

            let updatedUser = await AboutModel.findByIdAndUpdate(id, updateData, { new: true });

            if (updatedUser) {
                res.status(200).send(SendResponse(true, "Book updated successfully", updatedUser));
            } else {
                res.status(400).send(SendResponse(false, "No book found with this ID", null));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    protected: (req, res, next) => {
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).send(SendResponse(false, "un Authorized"));
            return;
        } else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).send(SendResponse(false, "un Authorized"));
                } else {
                    next();
                    return;
                }
            });
        }
    },



};

module.exports = BookControler;