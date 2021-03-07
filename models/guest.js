const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Guest', guestSchema)