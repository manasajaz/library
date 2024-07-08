const mongoose = require("mongoose");

const RegisterUserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,

    },

    cnic: {
        type: String,
    },
});

const RegisterUserModel = mongoose.model("users", RegisterUserSchema);

module.exports = RegisterUserModel;
