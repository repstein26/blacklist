const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    location: {
        type: String
    },
    reason: {
        type: String
    },
    description: {
        type: String
    },
    amountOwed: {
        type: Number
    },
    reporter: {
        type: String
    }
})

module.exports = mongoose.model('Entry', entrySchema)