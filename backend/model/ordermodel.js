const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
    tittle: {
        type: String,

    },
    front_image: {
        type: String
    },
    back_image: {
        type: String
    },
    amazon_url: {
        type: String
    },
    price: {
        type: String,
    },

});

const OrderModel = mongoose.model("books", OrderSchema);

module.exports = OrderModel;
