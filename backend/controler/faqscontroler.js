const SendResponse = require("../helper/helper");
const FaqsModel = require("../model/faqsmodel");



const FaqsControler = {

    get: async (req, res) => {
        try {

            let result = await FaqsModel.find();
            res.status(200).send(SendResponse(true, "data get succesfully", result));
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    post: async (req, res) => {
        try {
            let { question, answer } = req.body;
            let obj = { question, answer };
            let errorArray = [];

            if (!obj.question) {
                errorArray.push("required question");
            }
            if (!obj.answer) {
                errorArray.push("requiredanswer");
            }


            if (errorArray.length > 0) {
                res
                    .status(400)
                    .send(SendResponse(false, "validation erroe", errorArray));
            } else {
                let Book = new FaqsModel(obj);
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
            let result = await FaqsModel.findByIdAndDelete(id);

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
            let user = await FaqsModel.findById(id);
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
            let { question, answer } = req.body;

            let updateData = {};
            if (question) updateData.question = question;
            if (answer) updateData.answer = answer;

            let updatedUser = await FaqsModel.findByIdAndUpdate(id, updateData, { new: true });

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

module.exports = FaqsControler;