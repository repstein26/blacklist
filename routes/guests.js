const express = require('express')
const guest = require('../models/guest')
const router = express.Router()
const Guest = require('../models/guest')

//All guests route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const guests = await Guest.find(searchOptions)
        res.render('guests/index', { 
            guests: guests, 
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')
    }
})

//New guest route
router.get('/new', (req,res) => {
    res.render('guests/new', { guest: new Guest() })
})

//Create guest route
router.post('/', async (req,res) => {
    const guest = new Guest({
        name: req.body.name
    })
    try {
        const newGuest = await guest.save()
        // res.redirect(`guests/${newGuest.id}`)
        res.redirect(`guests`)
    } catch {
        res.render('guests/new', {
            guest: guest,
            errorMessage: 'Error adding guest'
        })
    }
})


module.exports = router