const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    dateOfIncident: {
        type: Date
    },
    reason: {
        type: String
    },
    amountOwed: {
        type: Number
    },
    location: {
        type: String
    },
    reporter: {
        type: String
    }
})

module.exports = mongoose.model('Entry', entrySchema)