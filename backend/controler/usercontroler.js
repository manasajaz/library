const SendResponse = require("../helper/helper");
const RegisterUserModel = require("../model/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserControler = {
    signup: async (req, res) => {
        try {
            let { userName, email, password, cnic } = req.body;
            let obj = { userName, email, password, cnic };
            let errorArray = [];

            if (!obj.userName) {
                errorArray.push("userName required");
            }

            if (!obj.password) {
                errorArray.push("password required");
            }

            if (errorArray.length > 0) {
                res
                    .status(400)
                    .send(SendResponse(false, "validation error", errorArray));
                return;
            }

            let userExist = await RegisterUserModel.findOne({
                userName: obj.userName,
            });

            if (userExist) {
                res.status(400).send(SendResponse(false, "user already exist"));
                return;
            } else {
                obj.password = await bcrypt.hash(obj.password, 5);

                let User = new RegisterUserModel(obj);
                let result = await User.save();

                if (result) {
                    res
                        .status(200)
                        .send(SendResponse(true, "user create successfully", result));
                }
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internael server error", err));
        }
    },

    login: async (req, res) => {
        try {
            let { userName, password } = req.body;
            // console.log(req.body);
            let obj = { userName, password };

            let existingUser = await RegisterUserModel.findOne({
                userName: obj.userName,
            });

            if (existingUser) {
                let CorrectPasword = await bcrypt.compare(
                    obj.password,
                    existingUser.password
                );

                if (CorrectPasword) {
                    let token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY);

                    res.send(
                        SendResponse(true, "Login Successfully", {
                            token: token,
                            user: existingUser,
                        })
                    );
                } else {
                    res.send(SendResponse(false, "Password Not Match"));
                }
            } else {
                res.send(SendResponse(false, "User Not Found with this User Name"));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internael server error", err));
        }
    },

    del: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await RegisterUserModel.findByIdAndDelete(id);

            if (result) {
                res
                    .status(200)
                    .send(SendResponse(true, "user deleted successfully", result));
            } else {
                res.status(400).send(SendResponse(true, "no data found", null));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    get: async (req, res) => {
        try {
            let users = await RegisterUserModel.find({});
            if (users.length > 0) {
                res.status(200).send(SendResponse(true, "all Users retrieved successfully", users));
            } else {
                res.status(400).send(SendResponse(false, "No users found", null));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    getbyid: async (req, res) => {
        try {
            let id = req.params.id;
            let user = await RegisterUserModel.findById(id);
            if (user) {
                res.status(200).send(SendResponse(true, "single User retrieved successfully", user));
            } else {
                res.status(400).send(SendResponse(false, "No user found with this ID", null));
            }
        } catch (err) {
            res.status(500).send(SendResponse(false, "internal server error", err));
        }
    },

    edit: async (req, res) => {
        try {
            let id = req.params.id;
            let { userName, email, password, cnic } = req.body;

            let updateData = {};
            if (userName) updateData.userName = userName;
            if (email) updateData.email = email;
            if (password) updateData.password = await bcrypt.hash(password, 5);
            if (cnic) updateData.cnic = cnic;


            // if (contact) updateData.contact = contact;

            let updatedUser = await RegisterUserModel.findByIdAndUpdate(id, updateData, { new: true });

            if (updatedUser) {
                res.status(200).send(SendResponse(true, "User updated successfully", updatedUser));
            } else {
                res.status(400).send(SendResponse(false, "No user found with this ID", null));
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

module.exports = UserControler;
