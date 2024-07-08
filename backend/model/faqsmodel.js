const mongoose = require("mongoose");


const FaqsSchema = mongoose.Schema({
    question: {
        type: String,

    },
    answer: {
        type: String,

    }


});

const FaqsModel = mongoose.model("faqs", FaqsSchema);

module.exports = FaqsModel;
