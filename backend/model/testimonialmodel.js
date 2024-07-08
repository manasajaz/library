const mongoose = require("mongoose");


const TestimonialSchema = mongoose.Schema({
    tittle: {
        type: String,

    },
    description: {
        type: String,

    },
    image: {
        type: String
    },


});

const TestimonialModel = mongoose.model("testimonial", TestimonialSchema);

module.exports = TestimonialModel;
