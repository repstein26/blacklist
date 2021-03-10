const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    }
})

module.exports = mongoose.model('Guest', guestSchema)