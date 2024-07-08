const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,

  },
  contact: {
    type: String,
  },
  role: {
    type: String,
  },
});

const UserModel = mongoose.model("Auth", UserSchema);

module.exports = UserModel;
