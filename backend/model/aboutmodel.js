const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema({
    tittle: {
        type: String,
    },
    Short_Description: {
        type: String
    },
    Description: {
        type: String
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
    cover_image: {
        type: String
    }

});

const AboutModel = mongoose.model("about", AboutSchema);

module.exports = AboutModel;
