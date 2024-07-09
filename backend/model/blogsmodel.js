const mongoose = require("mongoose");


const BlogSchema = mongoose.Schema({
    tittle: {
        type: String,

    },
    image_1: {
        type: String
    },
    image_2: {
        type: String
    },
    image_3: {
        type: String
    },
    feature_image: {
        type: String
    },
    short_description: {
        type: String
    },
    long_description: {
        type: String
    },

});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;
