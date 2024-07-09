const SendResponse = require("../helper/helper");
const BlogModel = require("../model/blogsmodel");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const BlogControler = {

    get: async (req, res) => {
        try {

            let result = await BlogModel.find();
            res.status(200).send(SendResponse(true, "data get succesfully", result));
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    post: async (req, res) => {
        try {
            let { tittle, image1, image2, image3, feature_image, short_description, long_description } = req.body;
            let obj = { tittle, image1, image2, image3, feature_image, short_description, long_description };

            if (req.file) {
                const image1 = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.image1 = image1;
            }
            if (req.file) {
                const image2 = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.image2 = image2;
            }
            if (req.file) {
                const image3 = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.image3 = image3;
            }
            if (req.file) {
                const feature_image = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.feature_image = feature_image;
            }


            let errorArray = [];

            if (!obj.tittle) {
                errorArray.push("required tittle");
            }

            if (!obj.short_description) {
                errorArray.push("required description");
            }

            if (errorArray.length > 0) {
                res
                    .status(400)
                    .send(SendResponse(false, "validation erroe", errorArray));
            } else {
                let Book = new BlogModel(obj);
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
            let result = await BlogModel.findByIdAndDelete(id);

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
            let user = await BlogModel.findById(id);
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
            let { tittle, image1, image2, image3, feature_image, short_description, long_description } = req.body;

            let updateData = {};
            if (tittle) updateData.tittle = tittle;
            if (short_description) updateData.short_description = short_description;
            if (long_description) updateData.long_description = long_description;



            if (req.files) {
                if (req.files.image1) {
                    const image1 = req.files.image1[0].buffer.toString('base64');
                    updateData.image1 = image1;
                }
                if (req.files.image2) {
                    const image2 = req.files.image2[0].buffer.toString('base64');
                    updateData.image2 = image2;
                }
                if (req.files.image3) {
                    const image3 = req.files.image3[0].buffer.toString('base64');
                    updateData.image3 = image3;
                }
                if (req.files.feature_image) {
                    const feature_image = req.files.feature_image[0].buffer.toString('base64');
                    updateData.feature_image = feature_image;
                }
            }

            let updatedUser = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });

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

module.exports = BlogControler;