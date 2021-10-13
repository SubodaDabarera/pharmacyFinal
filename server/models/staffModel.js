const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({

    fullName: String,
    contactNo: String,
    address: String,
    email: String,
    password: String,
    role: String,
});

module.exports = mongoose.model("Staff", staffSchema)