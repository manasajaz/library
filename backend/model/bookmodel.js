const mongoose = require("mongoose");


const BookSchema = mongoose.Schema({
    tittle: {
        type: String,

    },
    front_image: {
        type: String
    },
    back_image: {
        type: String
    },
    short_description: {
        type: String
    },
    long_description: {
        type: String
    },
    amazon_url: {
        type: String
    },
    kindle_url: {
        type: String
    },
    paper_back_url: {
        type: String
    },
    audio_book_price: {
        type: String
    },
    status: {
        type: Boolean
    },
    price: {
        type: String,
    },

});

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
