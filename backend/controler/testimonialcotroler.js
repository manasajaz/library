const SendResponse = require("../helper/helper");
const TestimonialModel = require("../model/testimonialmodel");



const TestimonialControler = {

    get: async (req, res) => {
        try {

            let result = await TestimonialModel.find();
            res.status(200).send(SendResponse(true, "data get succesfully", result));
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    post: async (req, res) => {
        try {
            let { tittle, description, image } = req.body;
            let obj = { tittle, description, image };

            if (req.file) {
                const image = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.image = image;
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
                let Book = new TestimonialModel(obj);
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
            let result = await TestimonialModel.findByIdAndDelete(id);

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
            let user = await TestimonialModel.findById(id);
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
            let { tittle, description } = req.body;

            let updateData = {};
            if (tittle) updateData.tittle = tittle;
            if (description) updateData.description = description;

            if (req.file) {
                const image = req.file.buffer.toString('base64');
                updateData.image = image;
            }

            let updatedUser = await TestimonialModel.findByIdAndUpdate(id, updateData, { new: true });

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

module.exports = TestimonialControler;