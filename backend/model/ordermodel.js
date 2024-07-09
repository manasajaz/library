const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
    order_no: {
        type: String
    },
    tittle: {
        type: String,

    },
    image: {
        type: String
    },
    price: {
        type: String,
    },

});

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;
