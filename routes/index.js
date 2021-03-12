const express = require('express')
const router = express.Router()
const Entry = require('../models/entry')
var moment = require('moment');

router.get('/', async (req,res) => {
    let entries
    try{
        entries = await Entry.find().sort({createdAt: 'desc'}).limit(10).exec()
    }  catch{
        entries = []
    }
    res.render('index', { entries: entries, moment: moment })
})

module.exports = router