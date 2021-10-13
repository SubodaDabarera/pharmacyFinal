const mongoose = require('mongoose')


const commentReportSchema = new mongoose.Schema({
    _id: String,
    username: String,
    content: String,
    product_id: String,
    rating:{
        type: Number,
        default: 0
    },
    reply: Array

}, {
    timestamps: true
})

module.exports = mongoose.model('commentReport', commentReportSchema)