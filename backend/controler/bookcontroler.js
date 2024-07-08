const SendResponse = require("../helper/helper");
const BookModel = require("../model/bookmodel");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const BookControler = {

    get: async (req, res) => {
        try {

            let result = await BookModel.find();
            res.status(200).send(SendResponse(true, "data get succesfully", result));
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    post: async (req, res) => {
        try {
            let { tittle, front_image, back_image, short_description, long_description, amazon_url, kindle_url, paper_back_url, audio_book_price, status, price } = req.body;
            let obj = { tittle, front_image, back_image, short_description, long_description, amazon_url, kindle_url, paper_back_url, audio_book_price, status, price };

            if (req.file) {
                const front_image = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.front_image = front_image;
            }
            if (req.file) {
                const back_image = req.file.buffer.toString('base64'); // Convert image to base64 string
                obj.back_image = back_image;
            }


            let errorArray = [];

            if (!obj.tittle) {
                errorArray.push("required tittle");
            }

            // if (!obj.description) {
            //     errorArray.push("required description");
            // }

            if (errorArray.length > 0) {
                res
                    .status(400)
                    .send(SendResponse(false, "validation erroe", errorArray));
            } else {
                let Book = new BookModel(obj);
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
            let result = await BookModel.findByIdAndDelete(id);

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
            let user = await BookModel.findById(id);
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
            let { tittle, front_image, back_image, short_description, long_description, amazon_url, kindle_url, paper_back_url, audio_book_price, status, price } = req.body;

            let updateData = {};
            if (tittle) updateData.tittle = tittle;
            // if (front_image) updateData.front_image = front_image;
            // if (back_image) updateData.back_image = back_image;
            if (short_description) updateData.short_description = short_description;
            if (long_description) updateData.long_description = long_description;
            if (amazon_url) updateData.amazon_url = amazon_url;
            if (kindle_url) updateData.kindle_url = kindle_url;
            if (paper_back_url) updateData.paper_back_url = paper_back_url;
            if (audio_book_price) updateData.audio_book_price = audio_book_price;
            if (status) updateData.status = status;
            if (price) updateData.price = price;

            // if (req.file) {
            //     const front_image = req.file.buffer.toString('base64');
            //     updateData.front_image = front_image;
            // }
            // if (req.file) {
            //     const back_image = req.file.buffer.toString('base64');
            //     updateData.back_image = back_image;
            // }
            if (req.files) {
                if (req.files.front_image) {
                    const front_image = req.files.front_image[0].buffer.toString('base64');
                    updateData.front_image = front_image;
                }
                if (req.files.back_image) {
                    const back_image = req.files.back_image[0].buffer.toString('base64');
                    updateData.back_image = back_image;
                }
            }

            let updatedUser = await BookModel.findByIdAndUpdate(id, updateData, { new: true });

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

    adminProtected: async (req, res, next) => {
        // 'Bearer jdflsdlfsjhlkdfjslkdfjhshfdkjshfdkjshdfkshdfkj'
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).send(SendResponse(false, "Un Authorized"));
            return;
        } else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).send(SendResponse(false, "Un Authorized"));
                    return;
                } else {
                    if (decoded._doc.role == "admin") {
                        next();
                        // return;
                    }
                    else {
                        res.status(401).send(SendResponse(false, "You Have no rights for this action", err));
                    }
                }
            });
        }
    },

};

module.exports = BookControler;